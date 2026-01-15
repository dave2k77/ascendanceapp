
export interface TechUpgrade {
    id: string;
    name: string;
    description: string;
    scientificContext?: string; // New educational field
    cost: number; // DNA cost
    era: number;
    trigger?: (state: any) => void; // Optional effect on unlock
}

export const ERA_1_TECHS: TechUpgrade[] = [
    {
        id: 'rna_replication',
        name: 'RNA Replication',
        description: 'Unlocks the ability to reproduce more efficiently. Boosts Growth Rate +10%.',
        scientificContext: "The 'RNA World' hypothesis suggests that early life forms relied solely on RNA to store genetic information and catalyze chemical reactions, before DNA and proteins evolved. Self-replication is the fundamental definition of life.",
        cost: 10,
        era: 1,
    },
    {
        id: 'cell_wall',
        name: 'Cell Wall',
        description: 'Protects against environmental damage. Reduces Bio-Consumption by 20%.',
        scientificContext: "A structural layer surrounding some types of cells, just outside the cell membrane. It provides structural support and protection, acting as a filtering mechanism. It allows cells to withstand osmotic pressure differences.",
        cost: 50,
        era: 1,
    },
    {
        id: 'cilia',
        name: 'Cilia',
        description: 'Movement allows for better scavenging. Increases passive Biomass gain.',
        scientificContext: "Cilia are organelle projections that function like microscopic oars. They grant motility, allowing single-celled organisms to move towards food sources (chemotaxis) and away from toxins.",
        cost: 150,
        era: 1,
    },
    {
        id: 'mitochondria',
        name: 'Mitochondria',
        description: 'The powerhouse of the cell. Energy efficiency doubles.',
        scientificContext: "The result of an ancient endosymbiotic event where a host cell engulfed an aerobic bacterium. Instead of digesting it, they formed a symbiotic relationship. Mitochondria generate most of the cell's supply of adenosine triphosphate (ATP).",
        cost: 500,
        era: 1,
    },
    {
        id: 'multicellularity',
        name: 'Multicellularity',
        description: 'Cells work together. Unlocks Era 2 Pre-requisites.',
        scientificContext: "The major transition from single organisms to colonies. Specialized cells enable complex functions (tissues, organs) that a single cell cannot perform, paving the way for complex macroscopic life.",
        cost: 2000,
        era: 1,
    }
];
