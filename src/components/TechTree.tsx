import { useGameStore } from '../store/useGameStore';
import { ERA_1_TECHS } from '../logic/techTree';
import { ERA_2_TECHS } from '../logic/era2Content';

export const TechTree = () => {
    const era = useGameStore((state) => state.era);
    const dna = useGameStore((state) => state.dna);
    const knowledge = useGameStore((state) => state.knowledge);
    const unlockedTechs = useGameStore((state) => state.unlockedTechs);
    const buyUpgrade = useGameStore((state) => state.buyUpgrade);
    const openModal = useGameStore((state) => state.openModal);

    const availableTechs = era === 1 ? ERA_1_TECHS : ERA_2_TECHS;
    const currency = era === 1 ? 'dna' : 'knowledge';
    const currencyName = era === 1 ? 'DNA' : 'Knowledge';
    const currencyAmount = era === 1 ? dna : knowledge;

    return (
        <div className="mt-8">
            <h2 className="text-sm font-bold text-gray-500 mb-4 uppercase flex justify-between items-center">
                <span>{era === 1 ? 'Evolutionary Tree' : 'Technology Tree'}</span>
                <span className="text-xs font-normal text-purple-400">Era {era}</span>
            </h2>

            <div className="space-y-4">
                {availableTechs.map((tech) => {
                    const isUnlocked = unlockedTechs.includes(tech.id);
                    const canAfford = currencyAmount.gte(tech.cost);

                    return (
                        <div
                            key={tech.id}
                            onClick={() => !isUnlocked && canAfford && buyUpgrade(tech.id, tech.cost, currency)}
                            className={`p-3 rounded-lg border transition-all relative group cursor-pointer
                ${isUnlocked
                                    ? 'bg-blue-900/20 border-blue-500/50'
                                    : canAfford
                                        ? 'bg-gray-800 border-gray-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/20'
                                        : 'bg-gray-800/50 border-gray-700 opacity-75'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                    <h3 className={`font-bold text-sm ${isUnlocked ? 'text-blue-400' : 'text-gray-200'}`}>
                                        {tech.name}
                                    </h3>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal({
                                                title: tech.name,
                                                scientificContext: tech.scientificContext || "Context unavailable.",
                                                gameSignificance: tech.description
                                            });
                                        }}
                                        className="w-4 h-4 rounded-full border border-gray-600 text-[10px] text-gray-400 flex items-center justify-center hover:border-blue-500 hover:text-blue-400 hover:bg-blue-900/50 transition-colors z-20"
                                        title="Scientific Context"
                                    >
                                        ?
                                    </button>
                                </div>
                                {!isUnlocked && (
                                    <span className={`text-xs font-mono ${canAfford ? 'text-purple-400' : 'text-gray-500'} group-hover:text-purple-300`}>
                                        {tech.cost} {currencyName}
                                    </span>
                                )}
                                {isUnlocked && (
                                    <span className="text-[10px] text-blue-500 font-mono">
                                        {era === 1 ? 'EVOLVED' : 'RESEARCHED'}
                                    </span>
                                )}
                            </div>

                            <p className="text-xs text-gray-400 leading-tight">
                                {tech.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
