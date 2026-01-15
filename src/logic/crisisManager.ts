
// Re-exporting for clarity if needed, or strictly checking naming
export interface Crisis {
    id: string;
    name: string;
    description: string;
    triggerCondition: (state: any) => boolean;
    solveCondition: (state: any) => boolean;
    effect: (state: any) => { biomassMultiplier?: number; popGrowthMultiplier?: number };
}

export const ERA_1_CRISES: Crisis[] = [
    {
        id: 'volcanic_winter',
        name: 'Volcanic Winter',
        description: 'A massive eruption has obscured the sun. Photosynthesis halts. Biomass production is halved. Survive by adapting or stockpiling food.',
        triggerCondition: (state) => {
            // Trigger if Pop > 500 AND Adaptability < 30
            // This punishes rapid expansion without investing in resilience
            return state.population.gte(500) && state.adaptability < 30;
        },
        solveCondition: (state) => {
            // Solved if Adaptability >= 30
            return state.adaptability >= 30;
        },
        effect: (_state) => {
            return {
                biomassMultiplier: 0.5 // 50% reduction in food
            };
        }
    },
    {
        id: 'famine',
        name: 'Great Famine',
        description: 'The population has outgrown the ecosystem\'s carrying capacity. Starvation is imminent.',
        triggerCondition: (state) => {
            // Trigger if Biomass hits 0 and Population > 10
            return state.biomass.lte(0) && state.population.gt(10);
        },
        solveCondition: (state) => {
            // Solved if Biomass > 100
            return state.biomass.gt(100);
        },
        effect: (_state) => {
            return {
                popGrowthMultiplier: -0.5 // Negative growth (dying)
            };
        }
    }
];
