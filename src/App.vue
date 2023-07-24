<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
const start = async () => {
  console.log("launch tiki flow.");
};
</script>

<template>
  <header>
    <img
      alt="TIKI Icon"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />
  </header>

  <main>
    <div class="greetings">
      <h1>Oh, Hi!</h1>
      <h3>Just click &ldquo;start&rdquo; to well...</h3>
    </div>
    <button class="start" @click="start">start</button>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.start {
  width: fit-content;
  margin: 2em auto;
  display: block;
  padding: 0.5em 2em;
  border: var(--tiki-accent-color) solid 1px;
  border-radius: 0.5em;
  background: var(--tiki-accent-color);
  color: var(--tiki-primary-background-color);
  font-size: var(--tiki-font-size);
  font-weight: 500;
}

.start:active {
  opacity: 66%;
}

.greetings h1 {
  font-weight: 500;
  font-size: var(--tiki-font-size-xl);
  line-height: var(--tiki-line-height-xl);
  color: var(--tiki-accent-color);
}

.greetings h3 {
  font-size: var(--tiki-font-size-lg);
  line-height: var(--tiki-line-height-lg);
  font-weight: normal;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
</style>
