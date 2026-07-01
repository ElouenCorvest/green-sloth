<script lang="ts">
  import placeholder from "$lib/assets/contributor-placeholder.svg";
  import type { Contributor } from "$lib/types";
  import { Link, Text } from "@computational-biology-aachen/design";
  import ImageRound from "@computational-biology-aachen/design/ImageRound.svelte";
  import {
    faGithub,
    faGitlab,
    faOrcid,
  } from "@fortawesome/free-brands-svg-icons";
  import { faHome } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";

  let { contributor }: { contributor: Contributor } = $props();
</script>

<div
  id={contributor.key}
  class="card"
>
  <ImageRound
    path={placeholder}
    alt={contributor.name}
    styleVars={{ size: "72px" }}
  />
  <div class="info">
    <Text><strong>{contributor.name}</strong></Text>
    <div class="links">
      {#if contributor.homepage}
        <Link href={contributor.homepage}><Fa icon={faHome} /></Link>
      {/if}
      {#if contributor.github}
        <Link href="https://github.com/{contributor.github}"
          ><Fa icon={faGithub} /></Link
        >
      {/if}
      {#if contributor.gitlab}
        <Link href="https://gitlab.com/{contributor.gitlab}"
          ><Fa icon={faGitlab} /></Link
        >
      {/if}
      {#if contributor.orcid}
        <Link href="https://orcid.org/{contributor.orcid}"
          ><Fa icon={faOrcid} /></Link
        >
      {/if}
    </div>
  </div>
</div>

<style>
  .card {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    padding: var(--space-4);
    scroll-margin-top: var(--space-8);
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .links {
    display: flex;
    gap: var(--space-3);
  }
</style>
