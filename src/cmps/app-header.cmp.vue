<template>
  <header class="main-header">
    <div id="nav">
      <router-link to="/" aria-label="Back to home">Fellow</router-link>
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <div>
      <button>Workspaces</button>
      <button>Recent</button>
      <button>Starred</button>
      <button>Templates</button>

      <input
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        type="search"
        placeholder="Search…"
        value=""
      />
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style></style>
