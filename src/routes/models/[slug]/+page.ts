import { models, modelNames } from "$lib/models";
import { error } from "@sveltejs/kit";
import { marked } from "marked";
import type { PageLoad } from "./$types";

export const prerender = true;

export function entries() {
  return modelNames.map((slug) => ({ slug }));
}

// Optional per-model assets, co-located in src/lib/models/<slug>/.
const mdModules = import.meta.glob("../../../lib/models/*/*.md", {
  query: "?raw",
  import: "default",
});
const schemeModules = import.meta.glob("../../../lib/models/*/scheme.svg", {
  query: "?url",
  import: "default",
  eager: true,
}) as Record<string, string>;

function slugOf(path: string): string | undefined {
  return path.match(/\/models\/([^/]+)\//)?.[1];
}

export const load: PageLoad = async ({ params }) => {
  const slug = params.slug;
  const meta = models[slug];
  // models only contains slugs with BOTH meta.ts and model.ts.
  if (!meta) error(404, `Model "${slug}" not found`);

  let schemeUrl: string | null = null;
  for (const [path, url] of Object.entries(schemeModules)) {
    if (slugOf(path) === slug) schemeUrl = url;
  }

  async function renderMd(file: string): Promise<string | null> {
    const key = Object.keys(mdModules).find(
      (p) => slugOf(p) === slug && p.endsWith(`/${file}`),
    );
    if (!key) return null;
    const raw = (await mdModules[key]()) as string;
    return await marked.parse(raw);
  }

  const [descHtml, commentHtml] = await Promise.all([
    renderMd("model.md"),
    renderMd("comment.md"),
  ]);

  return { slug, meta, schemeUrl, descHtml, commentHtml };
};
