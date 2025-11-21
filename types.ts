export enum DreamType {
  FIRST = 'FIRST',   // Integral x^-x
  SECOND = 'SECOND', // Integral x^x
}

export interface DataPoint {
  x: number;
  y: number;
  label?: string;
}

export interface SeriesTerm {
  n: number;
  termValue: number;
  sum: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface SimulationState {
  terms: number;
  currentSum: number;
  targetValue: number;
  history: SeriesTerm[];
}
