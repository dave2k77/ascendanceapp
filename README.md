# Ascendance

> *Guide life from a single cell to a Type III Civilization, balancing exponential growth against existential threats.*

An incremental strategy/simulation game built with React, TypeScript, and Vite. Explore the journey of evolution across multiple eras while managing resources, unlocking technologies, and surviving extinction-level crises.

---

## 🌍 Why I Built This

I wanted to create an educational game that reflects our current reality and how we got here—to give players a visceral feel for the journey of life on Earth, the impacts of pivotal events, the choices civilizations make, and the relentless role of evolutionary pressures that have shaped everything leading up to now.

But I wanted to go further.

With the advent of machine learning and artificial intelligence, the future is certain to progress on a fundamentally different scale. The crises and pressures we will face are unlike anything we have seen throughout history. So I wanted to simulate possible unfoldings of that future—to give players an experience of certain possibilities and let them see the potential impacts of the choices we make *today* in realizing the future.

**I believe this is the direction education should be looking towards—but to date, it has not.**

This game is my attempt to bridge that gap: to make the abstract concrete, to make deep time feel personal, and to let players experience both the fragility and the potential of intelligent life in the universe.

---

## 🎮 Features

### Core Gameplay
- **4 Control Levers**: Balance Metabolism, Aggression, Adaptability, and Intellect
- **Exponential Growth**: Population grows logistically based on resources and carrying capacity
- **Tech Tree**: Unlock evolutionary/technological upgrades using DNA (Era 1) or Knowledge (Era 2)
- **Crisis Events**: Survive Volcanic Winters, Famines, and Plagues that threaten extinction

### Implemented Eras
| Era | Theme | Resources | Key Mechanics |
|-----|-------|-----------|---------------|
| **Era 1** | Primordial Soup | Biomass, DNA | Cell evolution, survival |
| **Era 2** | Civilization | Food, Knowledge, Territory | Society building, expansion |

### Quality of Life
- **Persistence**: Auto-save to localStorage with offline progress calculation
- **Educational Content**: Scientific context for all mechanics (Info buttons)
- **Game Log**: Real-time event feed tracking your civilization's history
- **Narrative Onboarding**: Story intro and tutorial modals

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/dave2k77/ascendanceapp.git
cd ascendanceapp

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview  # Preview production build locally
```

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand (with persist middleware)
- **Styling**: Tailwind CSS
- **Large Number Math**: break_infinity.js

---

## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── App.tsx           # Main app layout
│   ├── Dashboard.tsx     # Resource display header
│   ├── GameLoop.tsx      # RAF-based tick system
│   ├── TechTree.tsx      # Upgrade purchase UI
│   ├── LogPanel.tsx      # Event log display
│   ├── LandingPage.tsx   # Welcome screen
│   └── ...modals         # Info, Crisis, Transition modals
├── store/
│   └── useGameStore.ts   # Zustand state + actions
├── logic/
│   ├── techTree.ts       # Era 1 technologies
│   ├── era2Content.ts    # Era 2 technologies + crises
│   └── crisisManager.ts  # Crisis definitions
└── data/
    └── educationalContent.ts  # Scientific context
```

---

## 🎯 Roadmap

### Upcoming Features
- [ ] **Active Interventions**: Cooldown-based emergency actions
- [ ] **Era 3: Stellar Empire**: Interplanetary expansion, Dyson spheres
- [ ] **Era 4: Galactic Masters**: Type III Civilization, cosmic endgame
- [ ] **Visualization Panel**: Dynamic era-based graphics
- [ ] **Crisis Choices**: Binary narrative decisions with consequences

### The Vision
- [ ] **AI Era**: Machine learning revolution, alignment challenges
- [ ] **The Great Filters**: Existential risk simulation
- [ ] **Multiplayer Scenarios**: Collaborative or competitive civilization building

---

## 🤝 Contributing

This project is open source and welcomes contributions! Whether you're interested in:
- Adding new eras and technologies
- Improving the educational content
- Enhancing the UI/UX
- Balancing gameplay mechanics
- Translating content

Please feel free to open issues, submit pull requests, or reach out with ideas.

---

## 📖 Documentation

- [Game Design Document](Game%20Design%20Document%20Ascendance.md)
- [Development Plan](Development%20Plan%20-%20Ascendance.md)

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

This means you are free to use, modify, and distribute this software for any purpose, including commercial applications.

---

*Built with ❤️ as an educational exploration of evolutionary biology, cosmology, existential risk, and the future of intelligence.*
