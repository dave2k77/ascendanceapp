------

# Development Plan: The Great Filter - Ascendance

Target Platform: Web Browser (Desktop/Mobile)

Architecture: Client-Side Single Page Application (SPA)

Repository Structure: Monorepo (recommended) or standard React structure.

------

## 1. The Technology Stack

We are choosing a "Modern Frontend" stack optimized for high-frequency UI updates and large number calculations.

| **Component**        | **Technology**        | **Reasoning**                                                |
| -------------------- | --------------------- | ------------------------------------------------------------ |
| **Framework**        | **React 18+**         | Component-based UI is essential for the complex dashboard.   |
| **Language**         | **TypeScript**        | Strict typing is required to manage complex game state and math. |
| **Build Tool**       | **Vite**              | Instant server starts and hot module replacement (HMR).      |
| **State Management** | **Zustand**           | Lightweight, fast, and allows state access outside of React components (crucial for the Game Loop). |
| **Math Library**     | **break_infinity.js** | Handles numbers larger than $1.79 \times 10^{308}$ (JavaScript's limit). Essential for Era 3 & 4. |
| **Styling**          | **Tailwind CSS**      | Utility-first CSS for rapid UI prototyping and "Dark Mode" sci-fi aesthetic. |
| **Persistence**      | **localStorage**      | Simple browser-based saving. (Can upgrade to Cloud/Firebase later). |
| **Visualization**    | **Recharts**          | For rendering the "Population vs. Pollution" graphs.         |

------

## 2. Technical Architecture

The application is split into three distinct layers to separate logic from visuals.

### Layer A: The Data Store (The Brain)

- **Role:** Holds the "Single Source of Truth."
- **Contents:**
	- Resources (Population, Biomass, Energy).
	- Configuration (Slider positions).
	- Unlocks (Tech tree status).
- **Tech:** `useGameStore` (Zustand).

### Layer B: The Game Loop (The Heart)

- **Role:** The engine that drives time forward.
- **Mechanism:** Uses `requestAnimationFrame`. It runs independent of user interaction.
- **Logic:**
	1. Calculate `deltaTime` (time passed since last frame).
	2. Calculate Production: `(Rate * deltaTime)`.
	3. Update the Store.
	4. Check for "Triggers" (Crisis events/Unlocks).

### Layer C: The View (The Face)

- **Role:** Displays data to the user.
- **Mechanism:** React Components subscribe to specific slices of the Store.
- **Logic:** They *read* data and *dispatch* actions (e.g., "User moved slider"). They do **not** calculate game logic.
- ![Image of software architecture diagram model view controller](https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSiYA2j0Dz2UuVvVGTois66hoBXyBaoWlYPdw4tZBFwckBsajhyTXtlQDFBuDujUVB_LJzDIE0n3mkfwayW6dRfXqBNxoHm9f7XOpBDgdWYcr9MT4A)Shutterstock

------

## 3. Core Logic Implementation

Here is the boilerplate code to get the engine running.

### 3.1 The Store (`store.ts`)

This setup uses `break_infinity.js` (imported as `Decimal`) to handle large numbers safely.

TypeScript

```
import { create } from 'zustand';
import Decimal from 'break_infinity.js';

interface GameState {
  // Resources
  population: Decimal;
  biomass: Decimal;
  
  // Sliders (0-100)
  metabolism: number;
  intellect: number;

  // Actions
  setSlider: (slider: 'metabolism' | 'intellect', value: number) => void;
  tick: (deltaTime: number) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  population: new Decimal(1), // Start with 1 cell
  biomass: new Decimal(0),
  metabolism: 50, // Default 50%
  intellect: 50,

  setSlider: (slider, value) => set({ [slider]: value }),

  // THE CORE MATH LOGIC
  tick: (dt) => {
    const state = get();
    
    // 1. Calculate Multipliers based on Sliders
    // (Example: Higher metabolism = faster growth but higher cost)
    const growthRate = new Decimal(0.1).times(state.metabolism / 50); 
    const consumption = new Decimal(0.05).times(state.metabolism / 50);

    // 2. Calculate Gains/Losses per second
    const popGain = state.population.times(growthRate).times(dt);
    const biomassLoss = state.population.times(consumption).times(dt);

    // 3. Apply changes (Prevent negatives)
    set({
      population: state.population.plus(popGain),
      biomass: state.biomass.minus(biomassLoss).max(0)
    });
  }
}));
```

### 3.2 The Game Loop Component (`GameLoop.tsx`)

This component is invisible. It simply mounts and starts the timer.

TypeScript

```
import { useEffect, useRef } from 'react';
import { useGameStore } from './store';

export const GameLoop = () => {
  const tick = useGameStore((state) => state.tick);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      // Calculate delta time in seconds (e.g., 0.016 for 60fps)
      const deltaTime = (time - previousTimeRef.current) / 1000;
      
      // Execute the game logic
      tick(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  return null; // Renders nothing visibly
};
```

------

## 4. Phased Development Roadmap

### Phase 1: The Engine (Week 1)

- **Goal:** A number on the screen that goes up when the app is open.
- **Tasks:**
	1. Initialize Vite + React + TS project.
	2. Install `zustand` and `break_infinity.js`.
	3. Implement the `GameLoop` and `Store` code above.
	4. Create a debug UI to view `Population` count.

### Phase 2: The Core Loop - Era 1 (Week 2)

- **Goal:** The player can balance Growth vs. Starvation.
- **Tasks:**
	1. **UI:** Build the Dashboard (Left: Log, Center: Stats, Right: Sliders).
	2. **Logic:** Implement the 4 Sliders (Metabolism, Aggression, Adaptability, Intellect).
	3. **Logic:** Implement the "Death" mechanic (If Biomass < 0, Population decays).
	4. **Content:** Add the first 3 Tech Upgrades (RNA, Cell Wall, Mitochondria).

### Phase 3: The Threat System (Week 3)

- **Goal:** The game fights back.
- **Tasks:**
	1. **Rival System:** Create a background check that spawns "Predator Biomass" if Aggression is too low.
	2. **Event System:** Create a `CrisisManager` in the store.
	3. **UI:** Create the "Modal/Pop-up" component for choices (e.g., "Ice Age Detected").

### Phase 4: Save & Persistence (Week 4)

- **Goal:** Player can close the tab and return.
- **Tasks:**
	1. Implement `persist` middleware from Zustand.
	2. Create a "Offline Progress" calculator (Calculate how much time passed since last login and simulate that time).

### Phase 5: Visual Polish (Week 5)

- **Goal:** It looks like a game, not a spreadsheet.
- **Tasks:**
	1. Implement Tailwind CSS styling (Dark mode, neon accents).
	2. Add `Recharts` to show Population history.
	3. Add basic sound effects (UI clicks, alerts).

------

## 5. Folder Structure Recommendation

Plaintext

```
/src
  /assets        (Images, Icons)
  /components
    /ui          (Buttons, Sliders, Modals)
    /dashboard   (The main game view)
    /charts      (Recharts wrappers)
  /logic
    constants.ts (Game balance numbers, costs)
    eras.ts      (Data for Era 1, 2, 3)
    techTree.ts  (Upgrade definitions)
  /store
    useGameStore.ts
  App.tsx
  GameLoop.tsx
```

------

## 6. Immediate Next Steps for You

1. **Environment:** Ensure you have Node.js installed.

2. **Terminal:** Run the following commands to create the skeleton:

	Bash

	```
	npm create vite@latest great-filter -- --template react-ts
	cd great-filter
	npm install zustand break_infinity.js classnames tailwindcss postcss autoprefixer
	npx tailwindcss init -p
	```

3. **Code:** Copy the boilerplate form Section 3 into your project.

This plan moves you from "Concept" to "Coding" immediately. Good luck, Architect.