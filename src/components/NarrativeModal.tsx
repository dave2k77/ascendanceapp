import { useEffect } from 'react';

interface NarrativeModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: React.ReactNode;
}

export const NarrativeModal = ({ isOpen, onClose, title, content }: NarrativeModalProps) => {
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
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-gray-900 border-y-2 md:border-2 border-blue-500/50 md:rounded-2xl shadow-[0_0_100px_rgba(37,99,235,0.2)] max-w-4xl w-full h-[90vh] md:h-auto md:max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">

                <div className="bg-gray-800/80 p-6 md:p-8 flex justify-between items-center border-b border-gray-700">
                    <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 tracking-tight">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors text-xl p-2"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 text-gray-300 leading-relaxed font-light text-lg custom-scrollbar">
                    {content}
                </div>

                <div className="bg-gray-900 p-6 border-t border-gray-800 text-center">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-blue-900/30 hover:bg-blue-800/50 text-blue-200 border border-blue-800/50 rounded-full font-bold uppercase tracking-widest transition-all hover:scale-105"
                    >
                        Acknowledge
                    </button>
                </div>

            </div>
        </div>
    );
};
