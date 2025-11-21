import React, { useState } from 'react';
import { DreamType } from './types';
import Visualizer from './components/Visualizer';
import SeriesSimulator from './components/SeriesSimulator';
import GeminiTutor from './components/GeminiTutor';
import { Sigma, TrendingUp, BookOpen, GraduationCap } from 'lucide-react';

const App: React.FC = () => {
  const [activeType, setActiveType] = useState<DreamType>(DreamType.FIRST);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-brand-500/30">
      {/* Hero Section */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-600 p-2 rounded-lg shadow-lg shadow-brand-500/20">
              <GraduationCap className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
              Sophomore's Dream Explorer
            </h1>
          </div>
          
          <div className="flex gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveType(DreamType.FIRST)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeType === DreamType.FIRST 
                  ? 'bg-slate-800 text-brand-400 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Identity I (x⁻ˣ)
            </button>
            <button
              onClick={() => setActiveType(DreamType.SECOND)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeType === DreamType.SECOND 
                  ? 'bg-slate-800 text-indigo-400 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Identity II (xˣ)
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Intro Card */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-brand-500/5 blur-[100px] rounded-full group-hover:bg-brand-500/10 transition-all duration-1000"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                {activeType === DreamType.FIRST ? "The First Dream" : "The Second Dream"}
              </h2>
              <div className="text-4xl md:text-5xl font-mono font-light text-brand-300 mb-6 tracking-tight">
                {activeType === DreamType.FIRST ? (
                  <span>∫₀¹ x⁻ˣ dx = <span className="text-brand-400">∑ n⁻ⁿ</span></span>
                ) : (
                  <span>∫₀¹ xˣ dx = <span className="text-indigo-400">∑ (-1)ⁿ⁺¹ n⁻ⁿ</span></span>
                )}
              </div>
              <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                Discovered by Johann Bernoulli in 1697. It is called "Sophomore's Dream" because it seems "too good to be true"—as if a sophomore student simply assumed that ∫ x⁻ˣ dx equals ∑ n⁻ⁿ without rigorous proof, yet miraculously, the result holds.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
            <div className="mb-4 p-4 bg-slate-950 rounded-full border border-slate-800">
               {activeType === DreamType.FIRST ? <TrendingUp size={32} className="text-brand-500"/> : <Sigma size={32} className="text-indigo-500"/>}
            </div>
            <h3 className="text-slate-200 font-semibold mb-2">Key Characteristic</h3>
            <p className="text-sm text-slate-400">
              {activeType === DreamType.FIRST 
                ? "The function x⁻ˣ reaches a maximum at x = 1/e. The series converges very rapidly."
                : "The function xˣ reaches a minimum at x = 1/e. The series is alternating and converges slightly slower."}
            </p>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column: Visuals & Simulation */}
          <div className="xl:col-span-2 space-y-8">
            <section>
              <Visualizer type={activeType} />
            </section>
            <section>
              <SeriesSimulator type={activeType} />
            </section>
          </div>

          {/* Right Column: AI Tutor */}
          <div className="xl:col-span-1">
            <div className="sticky top-24">
              <GeminiTutor type={activeType} />
            </div>
          </div>

        </div>
      </main>
      
      <footer className="border-t border-slate-800 mt-12 py-8 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-sm">
          <p>Explore the elegance of mathematical constants. Built with React, Tailwind, and Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
