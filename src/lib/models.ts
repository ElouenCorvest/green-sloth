import type { ModelMeta } from "./types";

// Auto-discover models from their co-located files. A model is only listed when
// it has BOTH a meta.ts and a model.ts — drop a new `models/<slug>/` folder with
// both and it registers itself; no edit needed here.
const metaModules = import.meta.glob<{ meta: ModelMeta }>(
  "./models/*/meta.ts",
  { eager: true },
);
const modelModules = import.meta.glob("./models/*/model.ts");

// Folder name (slug) of every model.ts present.
const folderRe = /\.\/models\/([^/]+)\/model\.ts$/;
const buildableSlugs = new Set(
  Object.keys(modelModules)
    .map((path) => path.match(folderRe)?.[1])
    .filter((slug): slug is string => Boolean(slug)),
);

export const models: Record<string, ModelMeta> = Object.fromEntries(
  Object.values(metaModules)
    .map((m) => m.meta)
    .filter((meta) => buildableSlugs.has(meta.slug))
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((meta) => [meta.slug, meta]),
);

export const modelNames = Object.keys(models);
