<template>
  <header class="main-header">
    <div>
      <router-link to="/" aria-label="Back to home">Fellow</router-link>
      <button>Workspaces</button>
      <button>Recent</button>
      <button>Starred</button>
      <button>Templates</button>
      <button>Create</button>
    </div>
    <div class="container">
      <div class="input-container">
        <i class="fas fa-search search-icon"></i>
        <input
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          type="search"
          placeholder="Search"
          value=""
        />
      </div>
      <button>!</button>
      <button>BELL</button>
      <span>USER</span>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style></style>
