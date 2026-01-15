import { useGameStore } from '../store/useGameStore';
import { LEVER_INFO } from '../data/educationalContent';

const formatNumber = (num: any) => {
    return num.toString().split('.')[0];
};

const InfoBtn = ({ id }: { id: string }) => {
    const openModal = useGameStore((state) => state.openModal);
    return (
        <button
            onClick={() => openModal(LEVER_INFO[id])}
            className="ml-2 w-4 h-4 rounded-full border border-gray-600 text-[10px] text-gray-400 flex items-center justify-center hover:bg-gray-700 hover:text-white transition-colors z-10"
            title="Info"
        >
            ?
        </button>
    );
};

export const Dashboard = () => {
    const era = useGameStore((state) => state.era);
    const population = useGameStore((state) => state.population);
    const biomass = useGameStore((state) => state.biomass);
    const dna = useGameStore((state) => state.dna);
    const knowledge = useGameStore((state) => state.knowledge);
    const territory = useGameStore((state) => state.territory);

    const activeCrises = useGameStore((state) => state.activeCrises);
    const dismissedCrises = useGameStore((state) => state.dismissedCrises);
    const currentAlert = activeCrises.some(c => !dismissedCrises.includes(c.id));

    // Dynamic Labels based on Era
    const biomassLabel = era === 1 ? "Biomass" : "Food";
    const biologyLabel = era === 1 ? "DNA" : "Knowledge";
    const biologyValue = era === 1 ? dna : knowledge;

    return (
        <div className="flex gap-4 items-center">
            {/* Population */}
            <div className={`bg-gray-700 px-3 py-1 rounded border-l-2 ${currentAlert ? 'border-red-500' : 'border-blue-500'}`}>
                <div className="flex items-center">
                    <span className="text-xs text-gray-400 uppercase mr-1">
                        {era === 1 ? "Population" : "Citizens"}
                    </span>
                    <InfoBtn id="population" />
                </div>
                <span className={`text-lg font-mono ${activeCrises.length > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {formatNumber(population)}
                </span>
            </div>

            {/* Biomass/Food */}
            <div className={`bg-gray-700 px-3 py-1 rounded border-l-2 border-green-500`}>
                <div className="flex items-center">
                    <span className="text-xs text-gray-400 uppercase mr-1">{biomassLabel}</span>
                    <InfoBtn id="biomass" />
                </div>
                <span className={`text-lg font-mono ${biomass.lt(10) ? 'text-red-500 animate-pulse' : 'text-yellow-400'}`}>
                    {formatNumber(biomass)}
                </span>
            </div>

            {/* DNA/Knowledge */}
            <div className="bg-gray-700 px-3 py-1 rounded border-l-2 border-purple-500">
                <div className="flex items-center">
                    <span className="text-xs text-gray-400 uppercase mr-1">{biologyLabel}</span>
                    <InfoBtn id="dna" />
                </div>
                <span className="text-lg font-mono text-purple-400">
                    {formatNumber(biologyValue)}
                </span>
            </div>

            {/* Territory (Era 2 only) */}
            {era === 2 && (
                <div className="bg-gray-700 px-3 py-1 rounded border-l-2 border-slate-500">
                    <span className="text-xs text-gray-400 uppercase mr-1">Territory</span>
                    <span className="text-lg font-mono text-white">
                        {formatNumber(territory)}
                    </span>
                </div>
            )}
        </div>
    );
};
