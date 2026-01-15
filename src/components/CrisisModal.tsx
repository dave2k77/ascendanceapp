import { useEffect, useState } from 'react';
import type { Crisis } from '../logic/crisisManager';

interface CrisisModalProps {
    crisis: Crisis | null;
    onDismiss: (id: string) => void;
}

export const CrisisModal = ({ crisis, onDismiss }: CrisisModalProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (crisis) {
            setIsVisible(true);
        }
    }, [crisis]);

    if (!crisis || !isVisible) return null;

    const handleClose = () => {
        setIsVisible(false);
        onDismiss(crisis.id);
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="pointer-events-auto bg-red-950/90 border-2 border-red-500 rounded-lg shadow-[0_0_50px_rgba(239,68,68,0.5)] max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                <div className="bg-red-900/50 p-6 border-b border-red-800/50 flex items-center gap-4">
                    <span className="text-4xl animate-pulse">⚠️</span>
                    <div>
                        <h2 className="text-2xl font-black text-red-100 tracking-wider uppercase">CRISIS DETECTED</h2>
                        <h3 className="text-lg font-bold text-red-500">{crisis.name}</h3>
                    </div>
                </div>

                <div className="p-6">
                    <p className="text-red-200 text-lg leading-relaxed font-medium">
                        {crisis.description}
                    </p>
                    <div className="mt-4 p-3 bg-black/40 rounded border border-red-900/50">
                        <p className="text-xs text-red-400 font-mono uppercase">
                            IMMEDIATE EFFECT:
                        </p>
                        {/* We could introspect the effect here or just hardcode description */}
                        <p className="text-sm text-red-300">
                            Game rules have been temporarily altered. Adapt immediately to survive.
                        </p>
                    </div>
                </div>

                <div className="bg-red-950 p-4 border-t border-red-900 text-center">
                    <button
                        onClick={handleClose}
                        className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded uppercase tracking-wider transition-colors shadow-lg"
                    >
                        ACKNOWLEDGE & ADAPT
                    </button>
                </div>

            </div>
        </div>
    );
};
