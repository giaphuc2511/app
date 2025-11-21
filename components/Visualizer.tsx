import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { DreamType, DataPoint } from '../types';
import { generateCurveData } from '../utils/math';

interface VisualizerProps {
  type: DreamType;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded shadow-xl">
        <p className="text-slate-300 text-sm font-mono">x = {label}</p>
        <p className="text-brand-400 font-bold font-mono">
          y = {payload[0].value.toFixed(5)}
        </p>
      </div>
    );
  }
  return null;
};

const Visualizer: React.FC<VisualizerProps> = ({ type }) => {
  const data = useMemo(() => generateCurveData(type, 150), [type]);

  const gradientId = `colorGradient-${type}`;
  const color = type === DreamType.FIRST ? "#4ade80" : "#818cf8"; // Green vs Indigo

  return (
    <div className="w-full h-[400px] bg-slate-900/50 rounded-xl border border-slate-800 p-4 backdrop-blur-sm">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-200">
          Function Plot: {type === DreamType.FIRST ? 'y = x⁻ˣ' : 'y = xˣ'}
        </h3>
        <div className="text-xs text-slate-500 font-mono">Domain: [0, 1]</div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
          <XAxis 
            dataKey="x" 
            stroke="#94a3b8" 
            tick={{fill: '#94a3b8', fontSize: 12}}
            tickFormatter={(val) => val === 0 || val === 1 ? val : ''}
          />
          <YAxis 
            stroke="#94a3b8" 
            tick={{fill: '#94a3b8', fontSize: 12}}
            domain={[0, type === DreamType.FIRST ? 1.6 : 1.1]} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="y" 
            stroke={color} 
            fill={`url(#${gradientId})`} 
            strokeWidth={3}
            animationDuration={1500}
          />
          {/* Highlight 1/e approx 0.368 */}
          <ReferenceLine x={0.368} stroke="#ef4444" strokeDasharray="3 3" label={{ value: '1/e', position: 'top', fill: '#ef4444', fontSize: 10 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Visualizer;
