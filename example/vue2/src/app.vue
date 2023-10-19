<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { Preferences } from "@capacitor/preferences";
import { inject, ref } from "vue";
import { TikiReceipt, type TikiService } from "@mytiki/receipt-capacitor-vue2";
import { v4 as uuidv4 } from "uuid";

const userKey = "tiki-receipt-capacitor-example.id";
const tiki: TikiService | undefined = inject("Tiki");

const loadUser = async (): Promise<string> => {
  const { value } = await Preferences.get({ key: userKey });
  if (!value) {
    const id = uuidv4();
    await Preferences.set({ key: userKey, value: id });
    return id;
  } else {
    return value;
  }
};

const id = ref<string>("");
loadUser().then((user) => {
  id.value = user;
  tiki
    ?.initialize(id.value)
    .then(() => console.log("Initialization complete."));
});
const present = ref<boolean>(false);

const cycle = async () => {
  await tiki!.logout().then(async () => {
    await Preferences.remove({ key: userKey });
    id.value = await loadUser();
    tiki
      ?.initialize(id.value)
      .then(() => console.log("Initialization complete."));
  });
};

const update = (val: boolean) => (present.value = val);
</script>

<template>
  <main>
    <img
      alt="TIKI Icon"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />
    <div class="greetings">
      <h1>Oh, Hi!</h1>
      <h3>Just click &ldquo;start&rdquo; to well...</h3>
    </div>
    <button class="start" @click="present = !present">start</button>
    <div class="cycle">
      <p><b>ID: </b>{{ id }}</p>
      <button class="newUser" @click="cycle">new user</button>
    </div>
    <tiki-receipt :present="present" @update:present="update"/>
  </main>
</template>

<style scoped>
.header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.start {
  margin: 2em auto;
}

button {
  width: fit-content;
  display: block;
  padding: 0.5em 2em;
  border: #00b272 solid 1px;
  border-radius: 0.5em;
  background: #00b272;
  color: #ffffff;
  font-size: var(--tiki-font-size);
  font-weight: 500;
}

.start:active {
  opacity: 66%;
}

.greetings h1 {
  font-weight: 500;
  font-size: 1.25em;
  line-height: 1.75em;
  color: #00b272;
}

.greetings h3 {
  font-size: 1.25em;
  line-height: 1.75em;
  font-weight: normal;
}

.greetings h1,
.greetings h3,
.greetings p {
  text-align: center;
}

.cycle {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.newUser {
  margin: auto;
}
</style>
