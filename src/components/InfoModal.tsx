import { useEffect } from 'react';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    scientificContext: string;
    gameSignificance?: string;
}

export const InfoModal = ({ isOpen, onClose, title, scientificContext, gameSignificance }: InfoModalProps) => {
    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-gray-900 border border-blue-500/30 rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.2)] max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="bg-gray-800/50 p-6 border-b border-gray-700 flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">

                    {/* Scientific Context */}
                    <div>
                        <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span className="text-lg">🧬</span> Scientific Concept
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            {scientificContext}
                        </p>
                    </div>

                    {/* Game Significance */}
                    {gameSignificance && (
                        <div className="bg-blue-900/10 rounded-lg p-4 border border-blue-800/30">
                            <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="text-lg">🎮</span> Game Effect
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-sm">
                                {gameSignificance}
                            </p>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="bg-gray-900 p-4 border-t border-gray-800 text-center">
                    <button
                        onClick={onClose}
                        className="text-xs text-gray-500 hover:text-blue-400 transition-colors uppercase tracking-widest"
                    >
                        Close Database Entry
                    </button>
                </div>

            </div>
        </div>
    );
};
