# TIKI Receipt (Capacitor + Vue.js)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The TIKI Receipt library adds to your Vue.js + Capacitor **mobile app** a Data Reward program for your users to share their receipts in-exchange for loyalty points. 

Reward users with points for scanning physical receipts, linking their inbox, or connecting one of [58 supported retailer](https://ereceipts.blinkreceipt.com/account-linking) accounts. All program participation data is zero-party, powered by [TIKI's](https://mytiki.com) data licensing technology, meaning it is data legally owned by an end-user and licensed to yours and other businesses in-exchange for fair-compensation (redeemable loyalty points). Raw receipt data is pooled in a hosted, siloed [HUDI](https://hudi.apache.org) data lake, that you can search, query, and train models against. Opt-in to leverage TIKI's data-buyer network to create compensation and cashback rewards for you and your users.

## Includes
- Single Vue Component (TikiReceipt) to launch a configurable pre-built UI.
- TypeScript Service Class (TikiService) to interact directly with headless functionality or to build a custom UI.
- [TIKI's](https://mytiki.com) data licensing SDK (tiki-sdk-capacitor) to create and utilize immutable zero-party data license records.

_Microblink is a closed-source, licensed SDK. For new customers, we offer a **free Microblink license**. Schedule a meeting at [mytiki.com](https://mytiki.com) to get your license keys._

![app-screen-highlights](https://github.com/tiki/tiki-receipt-capacitor/assets/3769672/f167490e-bac7-4d9c-a0de-71fa4d89cc3e)

## Installation
```shell
npm i @mytiki/tiki-receipt-capacitor @mytiki/tiki-sdk-capacitor @mytiki/tiki-capture-receipt-capacitor

npx cap sync
```

Next, if you don't already have a `publishingId` from TIKI, **create a free account** and make a project at [console.mytiki.com](https://console.mytiki.com).

### Android
Microblink is closed source, and subsequently it's AARs are hosted by Microblink's Maven repository, not Maven Central. You need to add the maven endpoint to your `android/build.gradle` file in your project's android folder.

```groovy
maven { url  "https://maven.microblink.com" }
```

Depending on your project's configuration you may also need to add the following `packagingOptions` to your `android/app/build.gradle` file.

```groovy
android {
    //... your other android build configs
    
    packagingOptions {
        exclude("META-INF/LICENSE-notice.md")
        exclude("META-INF/LICENSE.md")
        exclude("META-INF/NOTICE.md")
    }
}
```

#### Notifications

It's necessary to install and setup the local notifications API from Capacitor to be able to send notifications to the user:

```shell
npm install @capacitor/local-notifications
npx cap sync
```

You also need to update the `AndroidManifest.xml` to enable the appropriate permissions:

```
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

## Getting Started

1. Register the plugin with your Vue app

```ts
import { createApp } from "vue";
import App from "@/app.vue";

import Tiki from "@mytiki/tiki-receipt-capacitor";

createApp(App)
    .use(Tiki, {}) 
    .mount("#app");
```

_This registers the Vue Component as `TikiReceipt` and provides Typescript service `TikiService` as an injectable object name `Tiki`._

2. If you're going to use the pre-built UI, add the stylesheet to your main stylesheet (e.g. `main.css`)
```css
@import "@mytiki/tiki-receipt-capacitor/dist/tiki-receipt-capacitor.css";
```

#### Android
For IMAP email account linking, the authorization UI uses the material bottom sheet. This requires your theme parent to extend Theme.MaterialComponents.*

```xml
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.MaterialComponents.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

</resources>

```

### Initialization
To initialize just inject the `TikiService` and pass in your systems unique identifier for the user. If you use emails (you shouldn't 😝), we recommend hashing it first.

[Initialize function reference →](https://tiki-receipt-capacitor.mytiki.com/classes/TikiService.html#initialize)

```vue
<script setup lang="ts">
  import { inject } from "vue";
  import { type TikiService } from "@mytiki/tiki-receipt-capacitor";
  const tiki: TikiService | undefined = inject("Tiki");
  tiki?.initialize(id).then(() => console.log("Tiki Initialized"));
</script>
```

_We recommend initializing as early as possible in your application, you'll want to initialize the library. We scrape accounts (which can take a few seconds) and load the user's history in the background. If you initialize early, by the time the user launches the UI, all of their receipt data will be up-to-date. No worries if not, the UI will just update as data comes in._

### Open UI
Add the `TikiReceipt` component to your template and a boolean ref

```vue
<script setup lang="ts">
  import { inject, ref } from "vue";
  import { type TikiService } from "@mytiki/tiki-receipt-capacitor";
  const tiki: TikiService | undefined = inject("Tiki");
  tiki?.initialize(id).then(() => console.log("Tiki Initialized"));
  const present = ref(false);
</script>

<template>
  <tiki-receipt v-model:present="present" />
</template>
```

Now just set `present.value = true` to open the UI.

### Logout
When a user logs out of your application, you'll want to delete any in-mem history, reward balances, and cached account credentials. 

```ts
import { inject, ref } from "vue";
import { type TikiService } from "@mytiki/tiki-receipt-capacitor";
const tiki: TikiService | undefined = inject("Tiki");
await tiki?.logout();
```

_Don't worry, license records are backed up to TIKI's immutable, hosted storage for free. After the user logs back in, call `.initialize` and the library will rebuild their history and reward balance for you._

## Example

While this README is helpful, it's always easier to just see it in action. In `/example` there is simple demo app. On launch, it generates a new random user id, with a single button called start. 

_Note, if you press start before the initialization is complete, a warning will hit your console logs._

- See `example/README.md` on how to build and run the example
- Check out `example/src/main.ts` to view an example configuration of the library.
- In `example/src/app.vue` you'll find Vue template showcasing initialization, logout, and using a button to open the pre-built UI.
- In `example/src/assets/*` there are samples for program and reward images plus markdown template files for legal terms and the learn more page. Feel free to copy, use, and modify any of these assets.

## More Docs and Links

#### @mytiki/tiki-receipt-capacitor
[🤖 NPM](https://www.npmjs.com/package/@mytiki/tiki-receipt-capacitor)  
[📚 TSDoc](https://tiki-receipt-capacitor.mytiki.com)

#### @mytiki/tiki-sdk-capacitor
[🤖 NPM](https://www.npmjs.com/package/@mytiki/tiki-sdk-capacitor)  
[👀 Source](https://github.com/tiki/tiki-sdk-capacitor)  
[📚 TSDoc](https://tiki-sdk-capacitor.mytiki.com)  

#### @mytiki/tiki-sdk-capacitor
[🤖 NPM](https://www.npmjs.com/package/@mytiki/tiki-capture-receipt-capacitor)  
[👀 Source](https://github.com/tiki/tiki-capture-receipt-capacitor)  
[📚 TSDoc](https://tiki-capture-receipt-capacitor.mytiki.com)

#### Other TIKI Links
[🍍 Website](https://mytiki.com)  
[🍍 Console](https://console.mytiki.com)  
[👾 Discord](https://discord.gg/tiki)  
[🤖 Main GitHub](https://github.com/tiki)  

#### Microblink
[🌐 Website](https://microblink.com)  
[👽 BlinkReceipt - Android](https://microblink.com)  
[🍎 BlinkReceipt - iOS](https://microblink.com)  

## Open Issues
You can find active issues here in GitHub under [Issues](https://github.com/tiki/tiki-receipt-capacitor/issues). If you run into a bug or have a question, just create a new Issue or reach out to a team member on 👾 [Discord](https://discord.gg/tiki).

### Key open issues to take note of:
1. OAuth is not yet functional (required for Outlook). Gmail is using IMAP.
# Contributing

- Use [GitHub Issues](https://github.com/tiki/tiki-receipt-capacitor/issues) to report any bugs you find or to request enhancements.
- If you'd like to get in touch with our team or other active contributors, pop in our 👾 [Discord](https://discord.gg/tiki).
- Please use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) if you intend to add code to this project.

## Project Structure
- `/src`: The primary Service and Component src files
  - `/service`: The implementation of TikiService
  - `/components`: The implementation of TikiReceipt
  - `/assets`: The bundled UI assets (images, icons, stylesheets)
- `/example`: A simple example project using the plugin

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://mytiki.com"><img src="https://avatars.githubusercontent.com/u/3769672?v=4?s=100" width="100px;" alt="Mike Audi"/><br /><sub><b>Mike Audi</b></sub></a><br /><a href="https://github.com/tiki/tiki-receipt-capacitor/commits?author=mike-audi" title="Code">💻</a> <a href="https://github.com/tiki/tiki-receipt-capacitor/pulls?q=is%3Apr+reviewed-by%3Amike-audi" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/tiki/tiki-receipt-capacitor/commits?author=mike-audi" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/ricardolg/"><img src="https://avatars.githubusercontent.com/u/8357343?v=4?s=100" width="100px;" alt="Ricardo Gonçalves"/><br /><sub><b>Ricardo Gonçalves</b></sub></a><br /><a href="https://github.com/tiki/tiki-receipt-capacitor/commits?author=ricardobrg" title="Code">💻</a> <a href="https://github.com/tiki/tiki-receipt-capacitor/pulls?q=is%3Apr+reviewed-by%3Aricardobrg" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/MiroBenicio"><img src="https://avatars.githubusercontent.com/u/96149507?v=4?s=100" width="100px;" alt="Miro Benício"/><br /><sub><b>Miro Benício</b></sub></a><br /><a href="https://github.com/tiki/tiki-receipt-capacitor/commits?author=MiroBenicio" title="Code">💻</a> <a href="#maintenance-MiroBenicio" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Schuler-Gabriel"><img src="https://avatars.githubusercontent.com/u/85256777?v=4?s=100" width="100px;" alt="Gabriel Schuler Barros"/><br /><sub><b>Gabriel Schuler Barros</b></sub></a><br /><a href="https://github.com/tiki/tiki-receipt-capacitor/commits?author=Schuler-Gabriel" title="Code">💻</a> <a href="#maintenance-Schuler-Gabriel" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.jessemonteiro.com"><img src="https://avatars.githubusercontent.com/u/8730443?v=4?s=100" width="100px;" alt="Jessé Monteiro"/><br /><sub><b>Jessé Monteiro</b></sub></a><br /><a href="https://github.com/tiki/tiki-receipt-capacitor/commits?author=JesseMonteiro" title="Code">💻</a> <a href="#maintenance-JesseMonteiro" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/timoguin"><img src="https://avatars.githubusercontent.com/u/671968?v=4?s=100" width="100px;" alt="Tim O'Guin"/><br /><sub><b>Tim O'Guin</b></sub></a><br /><a href="#projectManagement-timoguin" title="Project Management">📆</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
