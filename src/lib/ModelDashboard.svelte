<!--
 @component
 Interactive-lite analysis dashboard: auto-runs a short time course (WASM
 RADAU5) on mount and exposes sliders for any parameter/variable that declares
 one in its model.ts. Client-only (runs a Web Worker).
-->
<script lang="ts">
  import { browser } from "$app/environment";
  import { Slider2 as Slider } from "@computational-biology-aachen/design";
  import type { ModelBuilder } from "@computational-biology-aachen/mxlweb-core";
  import { backends } from "./stores/backends";
  import TimeCourse from "./TimeCourse.svelte";

  let {
    model,
    tEnd,
    nTimePoints = 500,
    variables = undefined,
  }: {
    model: ModelBuilder;
    tEnd: number;
    nTimePoints?: number;
    /** Variables to plot; omitted → all. */
    variables?: string[];
  } = $props();

  let timeCourse = $state<TimeCourse | undefined>();

  type SliderDef = {
    key: string;
    id: string;
    kind: "parameter" | "variable";
    name: string;
    initial: number;
    min: string;
    max: string;
    step: string;
    desc?: string;
  };

  // Static slider config for params/vars that declare a slider in model.ts.
  const sliderDefs = $derived.by<SliderDef[]>(() => {
    const out: SliderDef[] = [];
    for (const [id, par] of model.parameters) {
      if (par.slider) {
        out.push({
          key: `p:${id}`,
          id,
          kind: "parameter",
          name: par.displayName ?? id,
          initial: par.value,
          ...par.slider,
        });
      }
    }
    for (const [id, vari] of model.variables) {
      if (vari.slider && typeof vari.value === "number") {
        out.push({
          key: `v:${id}`,
          id,
          kind: "variable",
          name: vari.displayName ?? id,
          initial: vari.value,
          ...vari.slider,
        });
      }
    }
    return out;
  });

  // Current slider values, seeded from the defs.
  let values = $state<Record<string, number>>({});
  $effect(() => {
    for (const def of sliderDefs) {
      if (!(def.key in values)) values[def.key] = def.initial;
    }
  });

  function onSlide(def: SliderDef) {
    const value = values[def.key];
    if (def.kind === "parameter") {
      const par = model.parameters.get(def.id);
      if (par) model.updateParameter(def.id, { ...par, value });
    } else {
      const vari = model.variables.get(def.id);
      if (vari) model.updateVariable(def.id, { ...vari, value });
    }
    timeCourse?.runSimulation(model);
  }
</script>

{#if browser}
  <div class="dashboard">
    <TimeCourse
      bind:this={timeCourse}
      {model}
      {tEnd}
      {nTimePoints}
      backend={backends.wasmRadau5}
      selectedKeys={variables}
      timeoutInSeconds={30}
      lineDisplay="last"
    />

    {#if sliderDefs.length > 0}
      <div class="sliders">
        {#each sliderDefs as def (def.key)}
          <Slider
            name={def.name}
            desc={def.desc ?? ""}
            min={def.min}
            max={def.max}
            step={def.step}
            bind:val={values[def.key]}
            callback={() => onSlide(def)}
          />
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .dashboard {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    width: 100%;
  }

  .sliders {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--space-3);
  }
</style>
