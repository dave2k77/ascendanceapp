import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';

export const TransitionModal = () => {
    // This component is not currently used directly in App as a standalone, 
    // but we can export the logic or sub-components. 
    // For simplicity, let's keep EvolutionButton as the main entry point 
    // and have IT render the modal when clicked.
    return null;
};

export const EvolutionButton = () => {
    const era = useGameStore((state) => state.era);
    const population = useGameStore((state) => state.population);
    const advanceEra = useGameStore((state) => state.advanceEra);

    const [showConfirm, setShowConfirm] = useState(false);

    // Logic: Era 1 -> 2 condition: Population > 100
    const canEvolve = era === 1 && population.gte(100);

    if (!canEvolve) return null;

    const handleConfirm = () => {
        advanceEra();
        setShowConfirm(false);
    };

    return (
        <>
            <button
                onClick={() => setShowConfirm(true)}
                className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform animate-bounce z-40 border-2 border-white/20"
            >
                EVOLVE TO ERA 2
            </button>

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-gray-900 border border-purple-500/50 rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative animate-fadeIn">
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>

                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
                            The Dawn of Civilization
                        </h2>

                        <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
                            <p>
                                Your species has thrived in the primordial soup. Survival is no longer a daily struggle; it is a guarantee.
                                The population has swollen, and the environment can no longer contain your potential.
                            </p>
                            <p>
                                It is time to leave the waters, to build, to settle, and to claim the world.
                                <span className="text-purple-400 block mt-2 font-bold">
                                    Effect: DNA becomes KNOWLEDGE. BIOMASS becomes FOOD. Territory Expansion begins.
                                </span>
                            </p>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-6 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
                            >
                                Not Yet
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-purple-500/20 transition transform hover:-translate-y-1"
                            >
                                Begin Civilization
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
