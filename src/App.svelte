<script lang="ts">
  export let name: string;
  import { Router, Link, Route } from "svelte-routing";
  import About from "./About.svelte";
  import Home from "./Home.svelte";
  export const url = "";
</script>

<main>
  <Router {url}>
    <nav>
      <Link to="/">Home</Link>
      <Link to="about">About</Link>
    </nav>
    <div>
      <Route path="about" component={About} />
      <Route path="/"><Home {name} /></Route>
    </div>
  </Router>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
