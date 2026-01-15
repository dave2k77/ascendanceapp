import { useGameStore } from '../store/useGameStore';


export const OfflineModal = () => {
    const offlineGains = useGameStore((state) => state.offlineGains);
    const clearOfflineResults = useGameStore((state) => state.clearOfflineResults);

    if (!offlineGains) return null;

    const formatTime = (seconds: number) => {
        if (seconds < 60) return `${Math.floor(seconds)}s`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.floor(seconds % 60)}s`;
        return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-gray-900 border border-blue-500 rounded-lg shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
                <h2 className="text-2xl font-bold text-blue-400 mb-4 tracking-wider">WELCOME BACK</h2>

                <p className="text-gray-300 mb-4">
                    The simulation continued for <span className="text-white font-mono">{formatTime(offlineGains.time)}</span> while you were away.
                </p>

                <div className="bg-gray-800 p-4 rounded border border-gray-700 space-y-2 mb-6">
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Biomass Scavenged</span>
                        <span className="text-yellow-400 font-mono">+{offlineGains.biomass.toString().split('.')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-400">DNA Evolved</span>
                        <span className="text-purple-400 font-mono">+{offlineGains.dna.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={clearOfflineResults}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded uppercase tracking-wider transition-colors"
                >
                    Resume Evolution
                </button>
            </div>
        </div>
    );
};
