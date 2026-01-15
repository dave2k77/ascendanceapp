
import type { Crisis } from './crisisManager';

export const ERA_2_TECHS = [
    {
        id: 'agriculture',
        name: 'Agriculture',
        cost: 1000,
        description: 'Shift from foraging to farming. Doubles Food (Biomass) production base.',
        era: 2,
        scientificContext: 'The domestication of plants allowed for stable food surpluses, enabling larger populations and settlement.',
    },
    {
        id: 'writing',
        name: 'Writing',
        cost: 2500,
        description: 'Record keeping enhances knowledge transfer. +20% Knowledge generation.',
        era: 2,
        scientificContext: 'Writing systems allowed information to be stored externally, transcending oral tradition and enabling complex administration.',
    },
    {
        id: 'masonry',
        name: 'Masonry',
        cost: 5000,
        description: 'Stone structures allow verticality. +50 Territory Capacity.',
        era: 2,
        scientificContext: 'The use of stone and mortar allowed for permanent, defensible structures and larger urban densities.',
    },
    {
        id: 'bronze_working',
        name: 'Bronze Working',
        cost: 10000,
        description: 'Better tools and weapons. +10% Territory Capacity (Expansion).',
        era: 2,
        scientificContext: 'Alloying copper and tin created bronze, a harder metal that revolutionized tools, weapons, and armor.',
    }
];

export const ERA_2_CRISES: Crisis[] = [
    {
        id: 'plague',
        name: 'The Great Plague',
        description: 'High population density has bred a deadly pathogen.',
        triggerCondition: (state: any) => {
            // Trigger if Population > 5000 and Era is 2
            return state.era === 2 && state.population.gt(5000); // && !state.unlockedTechs.includes('medicine')
        },
        solveCondition: (state: any) => {
            // Solve if Population drops enough or Adaptability is high
            return state.population.lt(2000) || state.adaptability > 80;
        },
        effect: (_state: any) => {
            return {
                popGrowthMultiplier: -0.8 // Massive dying
            };
        }
    }
];
