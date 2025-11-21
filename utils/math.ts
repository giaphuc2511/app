import { DreamType, DataPoint, SeriesTerm } from '../types';

// Identity 1: Integral from 0 to 1 of x^(-x) dx = sum(n^(-n))
// Identity 2: Integral from 0 to 1 of x^x dx = sum((-1)^(n+1) * n^(-n))

export const generateCurveData = (type: DreamType, resolution: number = 100): DataPoint[] => {
  const data: DataPoint[] = [];
  const step = 1 / resolution;

  for (let i = 0; i <= resolution; i++) {
    const x = i * step;
    let y = 0;

    // Handle 0^0 limit which is 1 for both functions
    if (x === 0) {
      y = 1;
    } else {
      if (type === DreamType.FIRST) {
        y = Math.pow(x, -x);
      } else {
        y = Math.pow(x, x);
      }
    }

    data.push({ x: Number(x.toFixed(3)), y });
  }
  return data;
};

export const calculateSeries = (type: DreamType, maxN: number): SeriesTerm[] => {
  const history: SeriesTerm[] = [];
  let currentSum = 0;

  for (let n = 1; n <= maxN; n++) {
    let term = Math.pow(n, -n);
    
    if (type === DreamType.SECOND) {
      // Alternating series: (-1)^(n+1) * n^(-n)
      // n=1: (-1)^2 * 1^-1 = 1
      // n=2: (-1)^3 * 2^-2 = -0.25
      const sign = Math.pow(-1, n + 1);
      term = sign * term;
    }

    currentSum += term;
    history.push({
      n,
      termValue: term,
      sum: currentSum,
    });
  }

  return history;
};

export const EXACT_VALUES = {
  [DreamType.FIRST]: 1.2912859970626635404072825905956,
  [DreamType.SECOND]: 0.7834305107121344070592643865269,
};
