<script lang="ts">
  import cpblLogo from "$lib/assets/cpbl-logo.svg";
  import {
    H1,
    H2,
    H3,
    Section,
    SectionHeader,
    Text,
  } from "@computational-biology-aachen/design";
</script>

<SectionHeader>
  <div class="header-row">
    <H1 color="light">Impressum</H1>
    <a
      href="https://www.cpbl.rwth-aachen.de/go/id/sazuq/?lidx=1"
      target="_blank"
    >
      <img
        src={cpblLogo}
        alt="RWTH Computational Life Science"
        class="rwth-logo"
      />
    </a>
  </div>
</SectionHeader>

<Section
  variant="light"
  width="narrow"
>
  <H2>Legal Notice</H2>

  <H3>Operator of the Website</H3>
  <Text>Computational Life Science Group, Matuszyńska Lab, RWTH Aachen</Text>

  <H3>Registered Address</H3>
  <Text>
    Worringerweg 1<br />
    52074 Aachen<br />
    Germany
  </Text>

  <H3>Contact</H3>
  <Text>
    Elouen Corvest: <a href="mailto:elouen.corvest@rwth-aachen.de"
      >elouen.corvest@rwth-aachen.de</a
    ><br />
    Anna Matuszyńska:
    <a href="mailto:anna.matuszynska@cpbl.rwth-aachen.de"
      >anna.matuszynska@cpbl.rwth-aachen.de</a
    >
  </Text>
</Section>

<style>
  .header-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-6);
  }

  .rwth-logo {
    filter: brightness(0) invert(1);
    height: 3rem;
  }
</style>
