import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { NarrativeModal } from './NarrativeModal';

export const LandingPage = () => {
    const initializeGame = useGameStore((state) => state.initializeGame);
    const [modalType, setModalType] = useState<'story' | 'tutorial' | null>(null);

    const StoryContent = (
        <div className="space-y-6">
            <p><strong className="text-blue-400">The Spark.</strong> Roughly 4 billion years ago, in the chaotic chemistry of a primordial ocean, something changed. A molecule found a way to copy itself. It was not alive, not yet—but it was the first step.</p>
            <p>From that spark comes <strong className="text-purple-400">The Struggle</strong>. Life is an engine that effectively maximizes entropy, chewing through energy to create order within itself. To survive, you must consume. To adapt, you must change.</p>
            <p>You are the architect of this rise. You will guide your species through the eons:</p>
            <ul className="list-disc pl-5 space-y-2 text-base">
                <li><span className="text-gray-100">Era 1: Primordial Soup</span> - Master the single cell.</li>
                <li><span className="text-gray-100">Era 2: Awakening</span> - Conquer the land and develop society.</li>
                <li><span className="text-gray-100">Era 3: Civilization</span> - Build cities, industry, and networks.</li>
                <li><span className="text-gray-100">Era 4: Ascension</span> - Reach for the stars and become a Type III Civilization.</li>
            </ul>
            <p>But beware <strong className="text-red-400">The Great Filters</strong>. The universe acts as a sieve, weeding out civilizations that cannot sustain their own growth. Climate collapse, nuclear annihilation, AI alignment failure... the path is narrow.</p>
            <p className="italic text-gray-400 border-l-2 border-blue-500 pl-4">"The goal is not just to survive, but to ascend."</p>
        </div>
    );

    const TutorialContent = (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase border-b border-gray-700 pb-2">The 4 Levers of Existence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-900/10 p-4 rounded border border-blue-500/20">
                    <h4 className="font-bold text-blue-400">Metabolism</h4>
                    <p className="text-sm mt-1">Controls growth speed. Higher metabolism means faster population growth but drastically higher food consumption.</p>
                </div>
                <div className="bg-red-900/10 p-4 rounded border border-red-500/20">
                    <h4 className="font-bold text-red-400">Aggression</h4>
                    <p className="text-sm mt-1">Determines capacity. Aggressive species conquer more territory (higher max population) but risk internal strife.</p>
                </div>
                <div className="bg-green-900/10 p-4 rounded border border-green-500/20">
                    <h4 className="font-bold text-green-400">Adaptability</h4>
                    <p className="text-sm mt-1">Resilience vs Specialization. High adaptability protects against extinction events (Ice Ages, etc).</p>
                </div>
                <div className="bg-purple-900/10 p-4 rounded border border-purple-500/20">
                    <h4 className="font-bold text-purple-400">Intellect</h4>
                    <p className="text-sm mt-1">Generates DNA (Research). Used to buy upgrades. Essential for leaving the primordial soup.</p>
                </div>
            </div>

            <h3 className="text-xl font-bold text-white uppercase border-b border-gray-700 pb-2 mt-4">Resources</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-green-400">Population:</strong> Your score and workforce.</li>
                <li><strong className="text-yellow-400">Biomass:</strong> Food. If this hits 0, you starve and die.</li>
                <li><strong className="text-purple-400">DNA:</strong> Currency for evolution.</li>
            </ul>
        </div>
    );

    return (
        <div className="h-screen w-screen bg-black flex items-center justify-center relative overflow-hidden font-sans">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            <NarrativeModal
                isOpen={modalType === 'story'}
                onClose={() => setModalType(null)}
                title="THE COSMIC IMPERATIVE"
                content={StoryContent}
            />
            <NarrativeModal
                isOpen={modalType === 'tutorial'}
                onClose={() => setModalType(null)}
                title="SURVIVAL GUIDE"
                content={TutorialContent}
            />

            <div className="relative z-10 max-w-2xl px-6 text-center">
                <div className="mb-8">
                    <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 tracking-tighter drop-shadow-2xl animate-pulse">
                        ASCENDANCE
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-blue-200 font-light tracking-widest uppercase opacity-80">
                        The Great Filter Awaits
                    </p>
                </div>

                <div className="flex justify-center gap-4 mb-10">
                    <button
                        onClick={() => setModalType('story')}
                        className="px-6 py-2 border border-blue-500/30 text-blue-300 rounded hover:bg-blue-900/20 transition-all font-mono text-sm uppercase tracking-wider"
                    >
                        Introduction
                    </button>
                    <button
                        onClick={() => setModalType('tutorial')}
                        className="px-6 py-2 border border-purple-500/30 text-purple-300 rounded hover:bg-purple-900/20 transition-all font-mono text-sm uppercase tracking-wider"
                    >
                        How to Play
                    </button>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-8 rounded-2xl shadow-2xl mb-10">
                    <p className="text-gray-300 leading-relaxed mb-6 font-mono text-sm md:text-base">
                        You are the Evolutionary Imperative. <br />
                        Guide a species from a single cell to a Type III Galactic Civilization.
                    </p>
                </div>

                <button
                    onClick={initializeGame}
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-blue-600 px-8 font-medium text-white transition-all duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    <span className="mr-2 text-lg">Enter Simulation</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>

                <p className="mt-6 text-[10px] text-gray-600 uppercase tracking-widest">
                    v0.1.0 • Pre-Alpha Build
                </p>
            </div>
        </div>
    );
};
