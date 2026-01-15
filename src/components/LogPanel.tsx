import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';

export const LogPanel = () => {
    const logs = useGameStore((state) => state.logs);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new log
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    return (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 h-full flex flex-col overflow-hidden">
            <h2 className="text-sm font-bold text-gray-500 mb-2 uppercase flex justify-between items-center">
                <span>Mission Log</span>
                <span className="text-[10px] bg-gray-700 px-2 py-0.5 rounded text-gray-400">{logs.length}</span>
            </h2>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar text-xs font-mono">
                {logs.length === 0 && (
                    <p className="text-gray-600 italic">Listening for signals...</p>
                )}

                {logs.slice().reverse().map((log) => (
                    <div
                        key={log.id}
                        className={`p-2 rounded border-l-2 animate-fadeIn ${log.type === 'alert' ? 'bg-red-900/20 border-red-500 text-red-200' :
                                log.type === 'success' ? 'bg-blue-900/20 border-blue-500 text-blue-200' :
                                    log.type === 'info' ? 'bg-gray-700/30 border-gray-500 text-gray-300' :
                                        'bg-gray-800/30 border-gray-600 text-gray-400'
                            }`}
                    >
                        <span className="opacity-50 text-[10px] block mb-0.5">
                            {new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}
                        </span>
                        {log.message}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
    );
};
