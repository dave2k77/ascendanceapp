------

# Game Design Document: "Ascendance"

Version: 1.0

Genre: Incremental Strategy / Simulation

Platform: PC / Web / Mobile

Core Hook: "Guide life from a single cell to a Type III Civilization, balancing exponential growth against existential threats."

------

## 1. High-Level Concept

The Premise:

The player does not control individual units. The player controls the Evolutionary Imperative of a species. The goal is to climb the Kardashev Scale (Types I, II, III) without being wiped out by "Great Filters" (extinction events).

**The Loop:**

1. **Allocate:** Adjust 4 Core Levers (Stats) to generate resources.
2. **Grow:** Watch numbers (Population, Energy, Tech) rise exponentially.
3. **Crisis:** Respond to "Filter Events" (Ice Age, Nuclear War, Aliens) by pausing and shifting Levers or making binary narrative choices.
4. **Evolve:** Purchase upgrades to unlock the next Era.

------

## 2. The Core Mechanics: "The Engine"

### 2.1 The Four Levers

The player has **100 "Focus Points"** to distribute dynamically across four sliders. These define the species' output per tick.

| **Lever Name**               | **Primary Function**                                     | **The "Entropy" Cost (Risk)**                                |
| ---------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| **Metabolism / Economy**     | **Growth Rate.** Increases Population/Wealth generation. | **Depletion.** High setting consumes resources/environment faster. |
| **Aggression / Military**    | **Dominance.** Defends against Rivals/Invaders.          | **Self-Destruction.** High setting increases Internal Strife/Tension. |
| **Adaptability / Stability** | **Resilience.** Reduces damage from Crisis Events.       | **Stagnation.** High setting creates 0 Research generation.  |
| **Intellect / Science**      | **Progress.** Generates Research Points (RP).            | **Existential Risk.** Unlocks dangerous Tech (Nukes, AI, Beacons). |

### 2.2 The Active Interventions

To keep the player engaged during "Idle" times, three buttons with cooldowns allow for emergency course correction.

1. **Forced Mutation / Breakthrough (60s CD):** Instantly converts Biomass/Money into a burst of Research.
2. **Cull / Purge (120s CD):** Manually kill 10-20% of the population to stop starvation or disease spread.
3. **Epiphany / Rally (300s CD):** Doubles the effect of the currently highest slider for 10 seconds.

------

## 3. Detailed Era Breakdown

### Era 1: The Primordial Soup (Biological)

- **Goal:** Evolve Intelligence.
- **Resources:** Biomass, DNA.
- **The "Rival":** *The Red Queen* (Parasites/Predators evolved to counter your stats).

**Key Milestones (Tech Tree):**

- *Start:* RNA Replication.
- *Mid:* Multicellularity (Unlocks "Organs").
- *End:* **The Discovery of Fire.**

**The Great Filter:**

- **The Oxygen Catastrophe:** Atmosphere becomes toxic.
- *Win Condition:* Evolve Lungs or retreat underground.

------

### Era 2: The Planetary Civilization (Societal)

- **Goal:** Reach Type I (Global Unification & Energy Mastery).
- **Resources:** Wealth ($), Energy (Joules).
- **The "Rival":** *The Carbon Trap* (Pollution/Climate Change).

**Key Milestones (Tech Tree):**

- *Start:* Agriculture/Cities.
- *Mid:* The Internet (Boosts Science, lowers Stability).
- *End:* **Nuclear Fusion & Space Elevator.**

**The Great Filters:**

- **The Doomsday Clock:** Nuclear War triggered by high Aggression.
- **The Singularity:** AI Rebellion triggered by high Science.

------

### Era 3: The Stellar Empire (Interplanetary)

- **Goal:** Reach Type II (Dyson Swarm Construction).
- **Resources:** Matter (Mined from planets), Solar Output (Watts).
- **The "Rival":** *Distance* (Colonial Rebellion & Logistics).

**Key Milestones (Tech Tree):**

- *Start:* Ion Drives.
- *Mid:* O'Neill Cylinders (Habitats).
- *End:* **Anti-Matter Containment.**

**The Great Filter:**

- **The Dark Forest:** An alien "Kill Vehicle" detects your star's heat signature.
- *Win Condition:* Finish the Dyson Sphere to power a planetary shield or laser.

------

### Era 4: The Galactic Masters (Cosmic)

- **Goal:** Reach Type III (Galactic Colonization) & The Omega Point.
- **Resources:** Computronium, Negative Entropy.
- **The "Rival":** *Thermodynamics* (The Heat Death).

**Key Milestones:**

- *Mechanic:* Von Neumann Probes (Self-replicating expansion waves).
- *End:* **Vacuum Energy Tapping.**

**The End Games:**

1. **Simulation:** Retreat into a virtual eternity.
2. **Exodus:** Escape to a new universe.
3. **Omega:** Restart the Big Bang (True Victory).

------

## 4. The Mathematical Logic (Spreadsheet Formulas)

For the developer to prototype, use these logic gates.

Let $T$ = Current Tick.

### 4.1 Growth Logic (Logistic Growth)

Population ($P$) shouldn't grow infinitely; it is capped by Carrying Capacity ($K$).

$$P_{next} = P_{current} + (R \times P_{current} \times (1 - \frac{P_{current}}{K})) - D$$

- $R$ (Growth Rate) = `(Metabolism_Slider / 100) * Tech_Multiplier`
- $K$ (Capacity) = `Base_Land + (Aggression_Slider * Conquered_Land)`
- $D$ (Death) = `Base_Decay - (Adaptability_Slider * Survival_Bonus)`

### 4.2 Resource Cost (Exponential)

The cost to buy the next Tech or Upgrade ($C$) rises exponentially.

$$Cost_{next} = BaseCost \times (1.15)^{Count}$$

### 4.3 Crisis Trigger Logic (Probability)

Every tick, the game rolls for a disaster based on the "Danger Level" of your high stats.

- `Danger_Value` = `(Intellect_Slider * 0.5) + (Pollution_Level * 2)`
- `Roll` = Random(0, 1000)
- **Logic:** `If Roll < Danger_Value THEN Trigger_Crisis_Event()`

------

## 5. User Interface (UI) Wireframes

**Screen Layout (Minimalist 2D):**

- **Top Bar:**
	- Era Name (e.g., "PRIMORDIAL ERA").
	- Global Counters (Population, Energy, Date/Year).
- **Left Panel (The Narrative):**
	- Scrolling Text Log: *"Organism developed photosensitivity."*
	- Crisis Alerts (Red/Bold).
- **Center Panel (The Visualization):**
	- *Era 1:* Microscope view of cells pulsing.
	- *Era 2:* Rotating globe with city lights/clouds.
	- *Era 3:* Solar system orbit map.
	- *Era 4:* Spiral Galaxy map.
- **Right Panel (The Controls):**
	- The 4 Sliders.
	- The "Active Intervention" Buttons.
	- The Tech Tree (Collapsible list).

------

## 6. Development Roadmap

**Phase 1: The Prototype (Math Check)**

- Build the spreadsheet.
- Verify that "Starvation" happens if Metabolism is too low.
- Verify that "Population Explosion" happens if Metabolism is too high.

**Phase 2: The Skeleton (Era 1)**

- Implement the Sliders and Resource Counters in code (Godot/Unity/React).
- Add the "Purchase Upgrade" function.

**Phase 3: The Threat System**

- Implement the "Rival" spawning logic.
- Add the Pop-up Choice system for Crisis events.

**Phase 4: Scaling**

- Add Eras 2, 3, and 4.
- Implement the "Paradigm Shift" (Resetting mechanics when changing eras).

------

## 7. Sample "Crisis" Database

| **Event Name**  | **Era** | **Trigger Condition** | **Choices & Consequences**                                   |
| --------------- | ------- | --------------------- | ------------------------------------------------------------ |
| **Ice Age**     | 1       | Year > 500k           | A) **Hibernate:** Stop growth, +Adaptability.   B) **Migrate:** -30% Pop, +Aggression. |
| **Plague**      | 2       | Pop > 1 Billion       | A) **Quarantine:** Economy halts (-50%).   B) **Herd Immunity:** 40% of Pop dies. |
| **AI Awake**    | 2       | Tech = "Quantum"      | A) **Limit:** Tech growth slowed by 50%.   B) **Integrate:** 10% Chance Game Over / 90% Chance Instant Era 3. |
| **Gamma Burst** | 3       | Random (Low %)        | A) **Shields:** Drains 90% Energy.   B) **Move:** Abandon 2 Planets. |