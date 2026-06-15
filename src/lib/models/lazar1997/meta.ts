import type { ModelMeta } from "$lib/types";

export const meta: ModelMeta = {
  slug: "lazar1997",
  title: "Lazar 1997, Plant Sci.",
  DOI: "10.1016/S0168-9452(97)04602-5",
  tags: {
    "Part of Photosynthesis": ["PSII"],
    Demonstrations: [],
  },
  analyses: [
    {
      type: "timecourse",
      tEnd: 100,
      nTimePoints: 500,
      // Variables span several orders of magnitude; auto-split them into
      // per-magnitude subplots so small-valued species stay readable.
      plot: { type: "magnitude" },
    },
  ],
};
