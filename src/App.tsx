import React, { useState } from 'react';
import { Header } from './components/Header';
import { SwapView } from './components/swap/SwapView';
import { PerpsView } from './components/perps/PerpsView';
import { BridgeView } from './components/bridge/BridgeView';
import { ComparisonSliderView } from './components/comparison/ComparisonSliderView';
import { MobileFrame } from './components/mobile/MobileFrame';
import { DesignDecisionsDrawer } from './components/DesignDecisionsDrawer';
import { AppTab, ViewportMode } from './types';
import { Sparkles, SplitSquareVertical, Smartphone, Monitor } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('swap');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [designDecisionsOpen, setDesignDecisionsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060a10] text-slate-100 flex flex-col selection:bg-[#00F59B]/20 selection:text-[#00F59B]">
      
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewportMode={viewportMode}
        setViewportMode={setViewportMode}
        onOpenDesignDecisions={() => setDesignDecisionsOpen(true)}
      />

      {/* Main Viewport Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-start">
        
        {/* Render Viewport Mode accordingly */}
        {viewportMode === 'comparison' ? (
          <ComparisonSliderView />
        ) : viewportMode === 'mobile' ? (
          <MobileFrame
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onExitMobile={() => setViewportMode('desktop')}
          >
            {activeTab === 'swap' && <SwapView />}
            {activeTab === 'perps' && <PerpsView />}
            {activeTab === 'bridge' && <BridgeView />}
          </MobileFrame>
        ) : (
          /* Desktop Terminal Mode */
          <div className="w-full">
            {activeTab === 'swap' && <SwapView />}
            {activeTab === 'perps' && <PerpsView />}
            {activeTab === 'bridge' && <BridgeView />}
          </div>
        )}

      </main>

      {/* Floating Bottom Quick-Action Bar for Judges */}
      <aside aria-label="Bounty Evaluator Controls" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center space-x-3 rounded-2xl border border-white/[0.12] bg-[#0c1422]/90 px-4 py-2 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
            <span className="h-2 w-2 rounded-full bg-[#00F59B] animate-ping" />
            <span className="font-bold text-white hidden sm:inline">SUPERTEAM INDIA BOUNTY</span>
          </div>

          <div className="h-4 w-px bg-white/[0.1] hidden sm:block" />

          {/* Quick toggle to Before/After */}
          <button
            onClick={() => setViewportMode(viewportMode === 'comparison' ? 'desktop' : 'comparison')}
            className={`flex items-center space-x-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              viewportMode === 'comparison'
                ? 'bg-[#00F59B] text-slate-950 font-bold'
                : 'bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/[0.1]'
            }`}
          >
            <SplitSquareVertical className="h-3.5 w-3.5" />
            <span>{viewportMode === 'comparison' ? 'Exit Comparison' : 'Before vs After'}</span>
          </button>

          {/* Quick toggle to Mobile */}
          <button
            onClick={() => setViewportMode(viewportMode === 'mobile' ? 'desktop' : 'mobile')}
            className={`flex items-center space-x-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              viewportMode === 'mobile'
                ? 'bg-slate-700 text-white font-bold'
                : 'bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/[0.1]'
            }`}
          >
            {viewportMode === 'mobile' ? <Monitor className="h-3.5 w-3.5" /> : <Smartphone className="h-3.5 w-3.5" />}
            <span>{viewportMode === 'mobile' ? 'Desktop' : 'Mobile View'}</span>
          </button>

          {/* Design Rationale Drawer Trigger */}
          <button
            onClick={() => setDesignDecisionsOpen(true)}
            className="flex items-center space-x-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 px-3 py-1.5 text-xs font-bold text-amber-300 transition-all shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Design Rationale</span>
          </button>
        </div>
      </aside>

      {/* Design Decisions & Product Thinking Drawer */}
      <DesignDecisionsDrawer
        isOpen={designDecisionsOpen}
        onClose={() => setDesignDecisionsOpen(false)}
      />

    </div>
  );
};
export default App;
