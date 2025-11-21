import React, { useState, useEffect } from 'react';
import { DreamType, SeriesTerm } from '../types';
import { calculateSeries, EXACT_VALUES } from '../utils/math';
import { Play, FastForward, RefreshCcw } from 'lucide-react';

interface SeriesSimulatorProps {
  type: DreamType;
}

const SeriesSimulator: React.FC<SeriesSimulatorProps> = ({ type }) => {
  const [termsCount, setTermsCount] = useState<number>(5);
  const [history, setHistory] = useState<SeriesTerm[]>([]);
  const [target, setTarget] = useState<number>(0);
  
  useEffect(() => {
    setTarget(EXACT_VALUES[type]);
    setHistory(calculateSeries(type, termsCount));
  }, [type, termsCount]);

  const lastSum = history.length > 0 ? history[history.length - 1].sum : 0;
  const error = Math.abs(target - lastSum);

  const handleAddTerm = (amount: number) => {
    setTermsCount(prev => Math.min(prev + amount, 50)); // Cap at 50 for demo
  };

  const reset = () => setTermsCount(1);

  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 backdrop-blur-sm flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-200">Numerical Verification</h3>
        <div className="flex space-x-2">
          <button onClick={reset} className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400" title="Reset">
            <RefreshCcw size={18} />
          </button>
          <button onClick={() => handleAddTerm(1)} className="flex items-center px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors text-white">
            <Play size={14} className="mr-1" /> +1 Term
          </button>
          <button onClick={() => handleAddTerm(5)} className="flex items-center px-3 py-1.5 bg-brand-600 hover:bg-brand-500 rounded-lg text-sm transition-colors text-white shadow-lg shadow-brand-900/20">
            <FastForward size={14} className="mr-1" /> +5 Terms
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
          <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Integral Exact Value</div>
          <div className="text-2xl font-mono text-slate-200">{target.toFixed(9)}...</div>
        </div>
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
          <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Series Sum (N={termsCount})</div>
          <div className="text-2xl font-mono text-brand-400">{lastSum.toFixed(9)}</div>
          <div className="text-xs text-red-400 mt-1 font-mono">Diff: {error.toExponential(4)}</div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
        <div className="overflow-y-auto max-h-[300px] scrollbar-thin">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900 sticky top-0">
              <tr>
                <th className="p-3 text-xs font-medium text-slate-400">n</th>
                <th className="p-3 text-xs font-medium text-slate-400">Term Value (n⁻ⁿ)</th>
                <th className="p-3 text-xs font-medium text-slate-400 text-right">Partial Sum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {history.map((item) => (
                <tr key={item.n} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-3 text-sm text-slate-400 font-mono">{item.n}</td>
                  <td className="p-3 text-sm text-slate-300 font-mono">{item.termValue.toExponential(5)}</td>
                  <td className="p-3 text-sm text-brand-300 font-mono text-right">{item.sum.toFixed(8)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeriesSimulator;
