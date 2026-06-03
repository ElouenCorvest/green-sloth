/** Default time-course configuration for a model's analysis dashboard. */
export interface ModelSim {
  /** Simulation end time (model time units). */
  tEnd: number;
  /** Number of output time points. */
  nTimePoints?: number;
  /** Variables to plot by default; omitted → all variables. */
  variables?: string[];
}

export interface ModelMeta {
  slug: string;
  title: string;
  DOI: string;
  tags: Record<string, string[]>;
  /** Per-model time-course defaults; falls back to a global default when omitted. */
  sim?: ModelSim;
}
