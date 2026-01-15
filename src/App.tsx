
import { GameLoop } from './components/GameLoop';
import { TechTree } from './components/TechTree';
import { LandingPage } from './components/LandingPage';
import { GameControls } from './components/GameControls';
import { InfoModal } from './components/InfoModal';
import { OfflineModal } from './components/OfflineModal';
import { CrisisModal } from './components/CrisisModal';
import { useGameStore } from './store/useGameStore';
import { LEVER_INFO } from './data/educationalContent';
import './index.css';
import { LogPanel } from './components/LogPanel';

// Helper for Info Button
import { Dashboard } from './components/Dashboard';
import { EvolutionButton } from './components/TransitionModal';

const InfoBtn = ({ id }: { id: string }) => {
  const openModal = useGameStore((state) => state.openModal);
  return (
    <button
      onClick={() => openModal(LEVER_INFO[id])}
      className="ml-2 w-4 h-4 rounded-full border border-blue-500/50 text-[10px] text-blue-400 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors z-10 relative"
      title="Learn More"
    >
      ?
    </button>
  );
};

function App() {
  const gameStatus = useGameStore((state) => state.gameStatus);

  const metabolism = useGameStore((state) => state.metabolism);
  const intellect = useGameStore((state) => state.intellect);
  const aggression = useGameStore((state) => state.aggression);
  const adaptability = useGameStore((state) => state.adaptability);

  const setSlider = useGameStore((state) => state.setSlider);

  const activeModal = useGameStore((state) => state.activeModal);
  const closeModal = useGameStore((state) => state.closeModal);
  // openModal removed from here as it is used in InfoBtn

  const activeCrises = useGameStore((state) => state.activeCrises);
  const dismissedCrises = useGameStore((state) => state.dismissedCrises);
  const dismissCrisisModal = useGameStore((state) => state.dismissCrisisModal);

  // Find the first nondismissed crisis to show
  const currentAlert = activeCrises.find(c => !dismissedCrises.includes(c.id)) || null;

  if (gameStatus === 'landing') {
    return <LandingPage />;
  }

  return (
    <div className={`min-h-screen bg-gray-900 text-white font-sans flex flex-col transition-colors duration-1000 ${activeCrises.length > 0 ? 'shadow-[inset_0_0_100px_rgba(220,38,38,0.2)]' : ''}`}>
      <GameLoop />
      <InfoModal
        isOpen={!!activeModal}
        onClose={closeModal}
        title={activeModal?.title || ''}
        scientificContext={activeModal?.scientificContext || ''}
        gameSignificance={activeModal?.gameSignificance}
      />
      <CrisisModal
        crisis={currentAlert}
        onDismiss={dismissCrisisModal}
      />
      <OfflineModal />



      {/* Top Bar */}
      <header className="bg-gray-800 p-4 shadow-lg border-b border-gray-700 flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-wider text-blue-400">ASCENDANCE</h1>
          {activeCrises.length > 0 && (
            <span className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold uppercase rounded animate-pulse">
              Crisis Active
            </span>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <GameControls />
          <div className="h-6 w-px bg-gray-600 mx-2"></div>
          <Dashboard />
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 overflow-hidden">

        {/* Left Panel: Log */}
        <div className="h-[200px] md:h-auto">
          <LogPanel />
        </div>

        {/* Center Panel: Visualization */}
        <div className="col-span-1 md:col-span-2 bg-black rounded-lg border border-gray-700 relative overflow-hidden flex items-center justify-center">
          {/* Placeholder Visuals */}
          <div className="text-center opacity-50">
            <div className="w-32 h-32 rounded-full bg-blue-500 blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            <p className="relative z-10 font-mono text-xs">Era 1: Primordial Soup</p>
            {gameStatus === 'paused' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
                <span className="text-3xl font-black text-yellow-500 tracking-widest uppercase border-4 border-yellow-500 px-6 py-2 rounded">Paused</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Controls */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 overflow-y-auto">
          <h2 className="text-sm font-bold text-gray-500 mb-4 uppercase">Control Levers</h2>

          <div className="mb-6">
            <div className="flex justify-between mb-1 items-center">
              <div className="flex items-center">
                <label className="text-xs text-blue-300">Metabolism</label>
                <InfoBtn id="metabolism" />
              </div>
              <span className="text-xs font-mono">{Math.round(metabolism)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={metabolism}
              onChange={(e) => setSlider('metabolism', Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-colors"
            />
            <p className="text-[10px] text-gray-400 mt-1">Growth vs Consumption</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-1 items-center">
              <div className="flex items-center">
                <label className="text-xs text-red-300">Aggression</label>
                <InfoBtn id="aggression" />
              </div>
              <span className="text-xs font-mono">{Math.round(aggression)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={aggression}
              onChange={(e) => setSlider('aggression', Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500 hover:accent-red-400 transition-colors"
            />
            <p className="text-[10px] text-gray-400 mt-1">Capacity vs Risk</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-1 items-center">
              <div className="flex items-center">
                <label className="text-xs text-green-300">Adaptability</label>
                <InfoBtn id="adaptability" />
              </div>
              <span className="text-xs font-mono">{Math.round(adaptability)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={adaptability}
              onChange={(e) => setSlider('adaptability', Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition-colors"
            />
            <p className="text-[10px] text-gray-400 mt-1">Resilience</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-1 items-center">
              <div className="flex items-center">
                <label className="text-xs text-purple-300">Intellect</label>
                <InfoBtn id="intellect" />
              </div>
              <span className="text-xs font-mono">{Math.round(intellect)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={intellect}
              onChange={(e) => setSlider('intellect', Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-colors"
            />
            <p className="text-[10px] text-gray-400 mt-1">Research vs Danger</p>
          </div>

          <TechTree />

        </div>

      </main>
      <EvolutionButton />
    </div>
  )
}

export default App
