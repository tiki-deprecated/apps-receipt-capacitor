<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->
  
  <script setup lang="ts">
  import HeaderBack from "@/components/header/header-back.vue";
  
  defineEmits(["remove", "close", "back"]);
  </script>
  
  <template>
    <header-back
      text="Gmail Scan Error"
      @back="$emit('back')"
      @close="$emit('close')"
    />
    <div class="error-text">
      <p class="alert-text-bold">
        To Allow us to scan emails, you must enable IMAP on your Gmail Account
      </p>
      <div class="title">
      <div>How to Enable Imap</div>
      </div>
      <ol class="instructions">
        <li>In your computer, <b>open Gmail</b></li>
        <li>In the top right, click settings > <b>See all settings</b></li>
        <li>Click the <b>Forwading and POP/IMAP</b> tab</li>
        <li>In the ”Imap Acess” section, select <b>Enable Imap</b></li>
        <li>Click <b>save changes</b></li>
      </ol>
    </div>
  </template>
  
<style>
.error-text {
    font-family: var(--tiki-font-family);
    font-size: var(--tiki-font-size);
    line-height: var(--tiki-line-height);
    color: var(--tiki-secondary-text-color);
    margin: 0 1em 1.5em 1em;
  }
  
.alert-text-bold {
    font-weight: bold;
    text-align: center;
  }

.instructions {
  margin: 0.75em 0;
  font-weight: 500;
}


.title {
  text-transform: uppercase;
  text-align: center;
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  color: var(--tiki-primary-text-color);
  font-weight: bold;
}
</style>
  