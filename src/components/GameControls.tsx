import { useGameStore } from '../store/useGameStore';

export const GameControls = () => {
    const gameStatus = useGameStore((state) => state.gameStatus);
    const pauseGame = useGameStore((state) => state.pauseGame);
    const resumeGame = useGameStore((state) => state.resumeGame);
    const resetGame = useGameStore((state) => state.resetGame);
    const startGame = useGameStore((state) => state.startGame);

    const handleReset = () => {
        if (confirm("HARD RESET: Are you sure? This will wipe all progress and return to the beginning.")) {
            resetGame();
        }
    };

    return (
        <div className="flex items-center gap-2">
            {gameStatus === 'ready' && (
                <button
                    onClick={startGame}
                    className="px-4 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-sm font-bold animate-pulse shadow-[0_0_10px_rgba(22,163,74,0.6)]"
                >
                    START SIMULATION
                </button>
            )}

            {gameStatus === 'playing' && (
                <button
                    onClick={pauseGame}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs uppercase tracking-wider"
                >
                    Pause
                </button>
            )}

            {gameStatus === 'paused' && (
                <button
                    onClick={resumeGame}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs uppercase tracking-wider"
                >
                    Resume
                </button>
            )}

            <button
                onClick={handleReset}
                className="px-3 py-1 border border-red-900/50 text-red-500 hover:bg-red-900/50 rounded text-xs uppercase tracking-wider transition-colors"
                title="Wipe Save"
            >
                Reset
            </button>
        </div>
    );
};
