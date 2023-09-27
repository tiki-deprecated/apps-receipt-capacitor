<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->
  <script setup lang="ts">
  import HeaderBack from "@/components/header/header-back.vue";
  import ButtonText from "@/components/button/button-text.vue";
  import { ButtonTextState } from "@/components/button/button-text-state";
  
  defineEmits(["close", "back"]);
  </script>
  
  <template>
    <header-back
      text="Scanning Emails"
      @back="$emit('back')"
      @close="$emit('close')"
    />
    <div class="alert-text">
      <p class="alert-text-bold">
        Scanning may take up to a minute to complete. 
        Please keep the app open in the background. We will notify you when complete.
      </p>
    </div>
    <button-text
      text="Okay, Got it!"
      @click="$emit('back')"
      :state="ButtonTextState.STANDARD"
    />
  </template>
  
<style>
  .alert-text {
    text-align: center;
    font-family: var(--tiki-font-family);
    font-size: var(--tiki-font-size);
    line-height: var(--tiki-line-height);
    color: var(--tiki-secondary-text-color);
    margin: 0 1em 1.5em 1em;
    font-weight: bold;
  }
</style>
  