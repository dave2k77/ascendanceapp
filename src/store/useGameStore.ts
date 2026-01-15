import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Decimal from 'break_infinity.js';
import { ERA_1_CRISES } from '../logic/crisisManager';
import { ERA_2_CRISES } from '../logic/era2Content';
import type { Crisis } from '../logic/crisisManager';

export interface LogEntry {
    id: string;
    message: string;
    timestamp: number;
    type: 'default' | 'alert' | 'success' | 'info';
}

interface GameState {
    // Global
    era: number; // 0=Landing, 1=Primordial, 2=Civilization

    // Resources
    population: Decimal;

    // Era 1 Resources
    biomass: Decimal;
    dna: Decimal;

    // Era 2 Resources
    knowledge: Decimal;
    territory: Decimal;

    // Game Flow
    gameStatus: 'landing' | 'ready' | 'playing' | 'paused';
    lastSaveTime: number;
    offlineGains: { biomass: Decimal; dna: Decimal; knowledge: Decimal; time: number } | null;

    // Progression
    unlockedTechs: string[];

    // Sliders (0-100)
    metabolism: number;
    intellect: number;
    aggression: number;
    adaptability: number;

    // Crisis System
    activeCrises: Crisis[];
    resolvedCrises: string[];
    dismissedCrises: string[];

    // Actions
    setSlider: (slider: 'metabolism' | 'intellect' | 'aggression' | 'adaptability', value: number) => void;
    buyUpgrade: (techId: string, cost: number, currency: 'dna' | 'knowledge') => void;
    tick: (deltaTime: number) => void;

    initializeGame: () => void;
    startGame: () => void;
    pauseGame: () => void;
    resumeGame: () => void;
    resetGame: () => void;
    advanceEra: () => void;

    // Log System
    logs: LogEntry[];
    addLog: (message: string, type?: 'default' | 'alert' | 'success' | 'info') => void;

    // UI State
    activeModal: { title: string; scientificContext: string; gameSignificance?: string } | null;
    openModal: (data: { title: string; scientificContext: string; gameSignificance?: string }) => void;
    closeModal: () => void;
    dismissCrisisModal: (crisisId: string) => void;
    clearOfflineResults: () => void;
}

// Helper to revive state from JSON (converting strings back to Decimals)
const mergeState = (persistedState: any, currentState: GameState): GameState => {
    const revivedState = { ...currentState, ...persistedState };

    // Revive Decimals
    if (revivedState.population) revivedState.population = new Decimal(revivedState.population);
    if (revivedState.biomass) revivedState.biomass = new Decimal(revivedState.biomass);
    if (revivedState.dna) revivedState.dna = new Decimal(revivedState.dna);
    if (revivedState.knowledge) revivedState.knowledge = new Decimal(revivedState.knowledge || 0);
    if (revivedState.territory) revivedState.territory = new Decimal(revivedState.territory || 100);

    // Revive OfflineGains
    if (revivedState.offlineGains) {
        revivedState.offlineGains = {
            biomass: new Decimal(revivedState.offlineGains.biomass),
            dna: new Decimal(revivedState.offlineGains.dna),
            knowledge: new Decimal(revivedState.offlineGains.knowledge || 0),
            time: revivedState.offlineGains.time
        };
    }

    // CALCULATE OFFLINE PROGRESS
    if (revivedState.lastSaveTime) {
        const now = Date.now();
        const secondsOffline = (now - revivedState.lastSaveTime) / 1000;

        if (secondsOffline > 10 && revivedState.gameStatus === 'playing') {
            const dt = secondsOffline;
            let gainedBiomass = new Decimal(0);
            let gainedDNA = new Decimal(0);
            let gainedKnowledge = new Decimal(0);

            if (revivedState.era === 1 || !revivedState.era) {
                const inflow = new Decimal(10);
                gainedBiomass = inflow.times(dt);
                gainedDNA = revivedState.population.times(0.01).times(dt);
            } else if (revivedState.era === 2) {
                gainedKnowledge = revivedState.population.times(0.05).times(dt);
                gainedBiomass = new Decimal(10).times(dt);
            }

            revivedState.biomass = revivedState.biomass.plus(gainedBiomass);
            revivedState.dna = revivedState.dna.plus(gainedDNA);
            revivedState.knowledge = (revivedState.knowledge || new Decimal(0)).plus(gainedKnowledge);

            revivedState.offlineGains = {
                biomass: gainedBiomass,
                dna: gainedDNA,
                knowledge: gainedKnowledge,
                time: secondsOffline
            };
        }
    }

    if (revivedState.activeCrises && Array.isArray(revivedState.activeCrises)) {
        const activeIds = revivedState.activeCrises.map((c: any) => c.id);
        const allCrises = [...ERA_1_CRISES, ...ERA_2_CRISES];
        revivedState.activeCrises = allCrises.filter(c => activeIds.includes(c.id));
    }

    return revivedState;
};

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            era: 1,
            logs: [],
            gameStatus: 'landing',

            population: new Decimal(1),
            biomass: new Decimal(10),
            dna: new Decimal(0),
            knowledge: new Decimal(0),
            territory: new Decimal(100),

            unlockedTechs: [],

            activeModal: null,
            openModal: (data) => set({ activeModal: data }),
            closeModal: () => set({ activeModal: null }),

            activeCrises: [],
            resolvedCrises: [],
            dismissedCrises: [],

            metabolism: 50,
            intellect: 50,
            aggression: 50,
            adaptability: 50,

            lastSaveTime: Date.now(),
            offlineGains: null,

            initializeGame: () => {
                const addLog = get().addLog;
                addLog('Simulation initialized. The primordial soup awaits.', 'info');
                set({ gameStatus: 'ready' });
            },
            startGame: () => {
                const addLog = get().addLog;
                addLog('Evolutionary process started.', 'success');
                set({ gameStatus: 'playing' });
            },
            addLog: (message, type = 'default') => {
                const newLog: LogEntry = {
                    id: Math.random().toString(36).substr(2, 9),
                    message,
                    timestamp: Date.now(),
                    type
                };
                set((state) => ({ logs: [newLog, ...state.logs].slice(0, 50) })); // Keep last 50
            },
            pauseGame: () => set({ gameStatus: 'paused' }),
            resumeGame: () => set({ gameStatus: 'playing' }),

            resetGame: () => {
                // Clear persisted state first
                localStorage.removeItem('ascendance-storage');

                set({
                    era: 1,
                    gameStatus: 'landing',
                    population: new Decimal(1),
                    biomass: new Decimal(10),
                    dna: new Decimal(0),
                    knowledge: new Decimal(0),
                    territory: new Decimal(100),
                    unlockedTechs: [],
                    metabolism: 50,
                    intellect: 50,
                    aggression: 50,
                    adaptability: 50,
                    activeCrises: [],
                    resolvedCrises: [],
                    dismissedCrises: [],
                    offlineGains: null,
                    lastSaveTime: Date.now(),
                    logs: []
                });
            },

            advanceEra: () => {
                const state = get();
                if (state.era === 1) {
                    set({
                        era: 2,
                        knowledge: state.dna.div(10),
                        population: state.population.div(100).max(10),
                        territory: new Decimal(1000)
                    });
                    get().addLog('The Dawn of Civilization. Your species has conquered the land.', 'success');
                }
            },

            setSlider: (slider, value) => {
                const clampedValue = Math.max(0, Math.min(100, value));
                set({ [slider]: clampedValue });
            },

            buyUpgrade: (techId, cost, currency) => {
                const state = get();
                const currentAmount = currency === 'knowledge' ? state.knowledge : state.dna;

                if (currentAmount.gte(cost) && !state.unlockedTechs.includes(techId)) {
                    const newState: Partial<GameState> = {
                        unlockedTechs: [...state.unlockedTechs, techId]
                    };
                    if (currency === 'knowledge') {
                        newState.knowledge = state.knowledge.minus(cost);
                    } else {
                        newState.dna = state.dna.minus(cost);
                    }
                    get().addLog(`Evolved: ${techId}`, 'success');
                    set(newState);
                }
            },

            dismissCrisisModal: (crisisId) => {
                const state = get();
                if (!state.dismissedCrises.includes(crisisId)) {
                    set({ dismissedCrises: [...state.dismissedCrises, crisisId] });
                }
            },

            clearOfflineResults: () => set({ offlineGains: null }),

            tick: (dt) => {
                const state = get();
                if (state.gameStatus !== 'playing') return;

                // ERA 1 LOGIC (Primordial)
                if (state.era === 1) {
                    // --- CRISIS CHECK ---
                    let currentCrises = [...state.activeCrises];
                    ERA_1_CRISES.forEach(crisis => {
                        const isActive = currentCrises.some(c => c.id === crisis.id);
                        if (!isActive) {
                            if (crisis.triggerCondition(state)) {
                                currentCrises.push(crisis);
                                set((prev) => ({
                                    dismissedCrises: prev.dismissedCrises.filter(id => id !== crisis.id)
                                }));
                                get().addLog(`CRISIS: ${crisis.name}`, 'alert');
                            }
                        } else {
                            if (crisis.solveCondition(state)) {
                                currentCrises = currentCrises.filter(c => c.id !== crisis.id);
                            }
                        }
                    });

                    // Modifiers
                    let biomassMult = new Decimal(1);
                    let growthMultLimit = new Decimal(1);

                    currentCrises.forEach(crisis => {
                        const effects = crisis.effect(state);
                        if (effects.biomassMultiplier) biomassMult = biomassMult.times(effects.biomassMultiplier);
                        if (effects.popGrowthMultiplier) growthMultLimit = growthMultLimit.times(effects.popGrowthMultiplier);
                    });

                    if (currentCrises.length !== state.activeCrises.length || currentCrises.some((c, i) => c.id !== state.activeCrises[i]?.id)) {
                        set({ activeCrises: currentCrises });
                    }

                    // --- CORE LOGIC ---
                    const baseGrowthRate = new Decimal(0.1).times(state.metabolism / 50);

                    let finalGrowthRate = baseGrowthRate;
                    if (growthMultLimit.lt(0)) {
                        finalGrowthRate = baseGrowthRate.times(growthMultLimit);
                    }

                    const consumptionRate = new Decimal(0.05).times(state.metabolism / 50);

                    let growthTechMult = new Decimal(1);
                    let efficiencyTechMult = new Decimal(1);
                    let passiveBiomass = new Decimal(0);

                    if (state.unlockedTechs.includes('rna_replication')) growthTechMult = growthTechMult.times(1.1);
                    if (state.unlockedTechs.includes('cilia')) passiveBiomass = passiveBiomass.plus(0.5);
                    if (state.unlockedTechs.includes('mitochondria')) efficiencyTechMult = efficiencyTechMult.times(2);

                    let adjustedConsumption = consumptionRate.div(efficiencyTechMult);
                    if (state.unlockedTechs.includes('cell_wall')) adjustedConsumption = adjustedConsumption.times(0.8);

                    let adjustedGrowth = finalGrowthRate.times(growthTechMult);

                    const environmentalInflow = new Decimal(10).times(biomassMult);

                    const totalConsumption = state.population.times(adjustedConsumption);
                    const netBiomass = environmentalInflow.plus(passiveBiomass).minus(totalConsumption);

                    let newBiomass = state.biomass.plus(netBiomass.times(dt));

                    if (newBiomass.lte(0)) {
                        newBiomass = new Decimal(0);
                        adjustedGrowth = new Decimal(-0.5);
                    }

                    const dnaProduction = state.population.times(state.intellect / 1000).times(dt);

                    const baseCap = 100;
                    const aggressionBonus = state.aggression * 5;
                    const carryingCapacity = new Decimal(baseCap + aggressionBonus);

                    let newPop = state.population;

                    if (adjustedGrowth.gt(0)) {
                        const growthAmount = adjustedGrowth.times(state.population).times(
                            new Decimal(1).minus(state.population.div(carryingCapacity))
                        ).times(dt);
                        newPop = newPop.plus(growthAmount);
                    } else {
                        const decayAmount = adjustedGrowth.times(state.population).times(dt);
                        newPop = newPop.plus(decayAmount);
                    }

                    // Apply
                    set({
                        population: newPop.lt(1) && state.gameStatus === 'playing' ? new Decimal(1) : newPop,
                        biomass: newBiomass,
                        dna: state.dna.plus(dnaProduction),
                        lastSaveTime: Date.now()
                    });
                }
                // ERA 2 LOGIC (Civilization)
                else if (state.era === 2) {
                    // ERA 2 CRISES CHECK
                    let currentCrises = [...state.activeCrises];
                    ERA_2_CRISES.forEach(crisis => {
                        const isActive = currentCrises.some(c => c.id === crisis.id);
                        if (!isActive && crisis.triggerCondition(state)) {
                            currentCrises.push(crisis);
                            set((prev) => ({ dismissedCrises: prev.dismissedCrises.filter(id => id !== crisis.id) }));
                        } else if (isActive && crisis.solveCondition(state)) {
                            currentCrises = currentCrises.filter(c => c.id !== crisis.id);
                        }
                    });
                    if (currentCrises.length !== state.activeCrises.length || currentCrises.some((c, i) => c.id !== state.activeCrises[i]?.id)) {
                        set({ activeCrises: currentCrises });
                    }

                    // Logic: Food (Biomass)
                    let foodBase = new Decimal(100);
                    if (state.unlockedTechs.includes('agriculture')) foodBase = foodBase.times(2);

                    const popConsumption = state.population.times(0.1);
                    let newBiomass = state.biomass.plus(foodBase.minus(popConsumption).times(dt));

                    if (newBiomass.lte(0)) newBiomass = new Decimal(0);

                    // Knowledge
                    let knowledgeBase = state.population.times(state.intellect / 500);
                    if (state.unlockedTechs.includes('writing')) knowledgeBase = knowledgeBase.times(1.2);

                    let newKnowledge = state.knowledge.plus(knowledgeBase.times(dt));

                    // Territory Cap
                    let landCap = new Decimal(1000).plus(state.aggression * 10);
                    if (state.unlockedTechs.includes('bronze_working')) landCap = landCap.times(1.1);
                    if (state.unlockedTechs.includes('masonry')) landCap = landCap.plus(50);

                    // Growth
                    let growthRate = new Decimal(0);
                    if (newBiomass.gt(10)) {
                        growthRate = new Decimal(0.05).times(state.metabolism / 50);
                    } else {
                        growthRate = new Decimal(-0.1);
                    }

                    let newPop = state.population;
                    if (growthRate.gt(0)) {
                        const growthAmount = growthRate.times(state.population).times(new Decimal(1).minus(state.population.div(landCap))).times(dt);
                        newPop = newPop.plus(growthAmount);
                    } else {
                        newPop = newPop.plus(growthRate.times(state.population).times(dt));
                    }

                    set({
                        population: newPop.lt(10) ? new Decimal(10) : newPop,
                        biomass: newBiomass,
                        knowledge: newKnowledge,
                        territory: landCap,
                        lastSaveTime: Date.now()
                    });
                }
            }
        }),
        {
            name: 'ascendance-storage',
            storage: createJSONStorage(() => localStorage),
            merge: (persistedState, currentState) => mergeState(persistedState, currentState as GameState),
        }
    )
);
