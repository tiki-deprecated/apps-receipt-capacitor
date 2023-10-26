# TIKI Receipt (Capacitor + Vue.js)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="https://receipt-capacitor.mytiki.com" alt="Reference Docs"><img src="https://img.shields.io/static/v1?logo=readme&label=&message=reference%20docs&color=018EF5&logoColor=white&style=flat-square"></a>
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

The TIKI Receipt library adds to your Vue.js + Capacitor **mobile app** a Data Reward program for your users to share their receipts in-exchange for **cash from Tiki inc**. 

![app-screen-highlights](https://cdn.mytiki.com/assets/receipt-screen-highlights.png)

Reward users with cash for linking their Gmail inbox and connecting one of [58 supported retailer](https://ereceipts.blinkreceipt.com/account-linking) accounts. All program participation data is zero-party, powered by [TIKI's](https://mytiki.com) data licensing technology, meaning it is data legally owned by an end-user and licensed to yours and other businesses in-exchange for fair-compensation. 

Raw receipt data is pooled in a hosted [Iceberg](http://iceberg.apache.org) cleanroom, that you can query, etl, and train models against. Find a sample cleanroom in our [purchase repo](https://github.com/tiki/purchase).

Receipt parsing is handled on-device (secure, privacy-centric, and App Store/Play Store compliant), by the closed-source, licensed SDK [Microblink](https://microblink.com). For new customers, we offer a **free Microblink license**. Schedule a meeting at [mytiki.com](https://mytiki.com) to get a license key.


## Installation

#### Required Dependencies
- [@mytiki/capture-receipt-capacitor](https://www.npmjs.com/package/@mytiki/capture-receipt-capacitor) - Receipt parsing library and Capacitor wrapper for Microblink.
- [@mytiki/tiki-sdk-capacitor](https://www.npmjs.com/package/@mytiki/capture-receipt-capacitor) - Tiki's zero-party data licensing library
- [@capacitor/preferences](https://www.npmjs.com/package/@capacitor/preferences) - Persist user state across app sessions.

```shell
npm i @mytiki/tiki-sdk-capacitor @mytiki/capture-receipt-capacitor @capacitor/preferences
```

#### With Vue >=3.0.0
```shell
npm i @mytiki/receipt-capacitor
```

#### With Vue 2.7.14
```shell
npm i @mytiki/receipt-capacitor-vue2
```

Next, if you don't already have a `publishingId` from TIKI, **create a free account** and make a project at [console.mytiki.com](https://console.mytiki.com).

#### Android

**Requires:**
 - `compileSdkVersion` >= 33 
 - `targetSdkVersion` >=  33

Microblink is closed source, and subsequently it's AARs are hosted by Microblink's Maven repository, not Maven Central. You need to add the maven endpoint to your `android/build.gradle` file in your project's android folder.

```groovy
allprojects {
  repositories {
    // other repositories
    maven { url  "https://maven.microblink.com" }
  }
}
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

#### iOS
To build for iOS using Cocoapods, add the closed source Microblink PodspecRepo to your `ios/App/Podfile`. Then include the Tiki and Microblink dependencies.

1. Add the BlinkReceipt repository at the top of the Podfile.

```
source 'https://github.com/BlinkReceipt/PodSpecRepo.git'
source 'https://cdn.cocoapods.org/'
```

2. Add the TikiSdk and BlinkReceipt dependencies in the target pods:

```
target <TARGET> do
  # ... current pods

  pod 'BlinkReceipt', '~> 1.39'
  pod 'BlinkEReceipt', '~> 2.31'
  pod 'TikiSdkRelease', '3.0.0', :configurations => 'Release'
  pod 'TikiSdkDebug', '3.0.0', :configurations => 'Debug'
end
```

NOTE: If Cocoapods fails to locate the dependencies automatically, run `pod install --repo-update`.

## Getting Started

1. Register the plugin with your Vue app

#### With Vue >=3.0.0

```ts
import { createApp } from "vue";
import App from "@/app.vue";

import Tiki from "@mytiki/receipt-capacitor";

createApp(App)
    .use(Tiki, {
      company: {
        name: "Company Inc.",
        jurisdiction: "Tennessee, USA",
        privacy: "https://your-co.com/privacy",
        terms: "https://your-co.com/terms",
      },
      key: {
        publishingId: "YOUR TIKI PUBLISHING ID",
        android: "YOUR MICROBLINK ANDROID LICENSE KEY",
        ios: "YOUR MICROBLINK IOS LICENSE KEY",
        product: "YOUR MICROBLINK PRODUCT INTELLIGENCE KEY",
      }
    }) 
    .mount("#app");
```

#### With Vue 2.7.15

```ts
import Vue from "vue";
import App from "./app.vue";

import Tiki from "@mytiki/receipt-capacitor-vue2";

Vue.use(Tiki, {
  company: {
    name: "Company Inc.",
    jurisdiction: "Tennessee, USA",
    privacy: "https://your-co.com/privacy",
    terms: "https://your-co.com/terms",
  },
  key: {
    publishingId: "YOUR TIKI PUBLISHING ID",
    android: "YOUR MICROBLINK ANDROID LICENSE KEY",
    ios: "YOUR MICROBLINK IOS LICENSE KEY",
    product: "YOUR MICROBLINK PRODUCT INTELLIGENCE KEY",
  }
});

new Vue({ render: (h) => h(App) }).$mount("#app");
```

_This registers the Vue Component as `TikiReceipt` and provides the service `TikiService` as an injectable object name `Tiki`._

2. Add the stylesheet for the component to your primary stylesheet (e.g. `main.css`)

#### With Vue >=3.0.0

```css
@import "@mytiki/receipt-capacitor/dist/receipt-capacitor.css";
```

#### With Vue 2.7.15

```css
@import "@mytiki/receipt-capacitor-vue2/dist/receipt-capacitor.css";
```

### Initialization
To initialize just inject the `TikiService` and pass in your systems unique identifier for the user. If you use emails (you shouldn't 😝), we recommend hashing it first.

[Initialize function reference →](https://receipt-capacitor.mytiki.com/classes/TikiService.html#initialize)

#### With Vue >=3.0.0

```vue
<script setup lang="ts">
  import { inject } from "vue";
  import { type TikiService } from "@mytiki/receipt-capacitor";
  
  const tiki: TikiService | undefined = inject("Tiki");
  tiki?.initialize(id).then(() => console.log("Tiki Initialized"));
</script>
```

#### With Vue 2.7.15

```vue
<script setup lang="ts">
  import { inject } from "vue";
  import { type TikiService } from "@mytiki/receipt-capacitor-vue2";
  
  const tiki: TikiService | undefined = inject("Tiki");
  tiki?.initialize(id).then(() => console.log("Tiki Initialized"));
</script>
```

_We recommend initializing as early as possible in your application. We scrape accounts (which can take a few seconds) in the background. If you initialize early, by the time the user launches the UI, all of their receipt data will be up-to-date. No worries if not, the UI will just update as data comes in._

### Open UI
Add the `TikiReceipt` component to your template and a boolean Ref (e.g. present). Now just set `present.value = true` to open the UI.

#### With Vue >=3.0.0

```vue
<script setup lang="ts">
  import { inject, ref } from "vue";
  import { type TikiService } from "@mytiki/receipt-capacitor";
  
  const tiki: TikiService | undefined = inject("Tiki");
  tiki?.initialize(id).then(() => console.log("Tiki Initialized"));
  const present = ref(false);
</script>

<template>
  <tiki-receipt v-model:present="present" />
</template>
```

#### With Vue 2.7.15

```vue
<script setup lang="ts">
  import { inject, ref } from "vue";
  import { type TikiService } from "@mytiki/receipt-capacitor-vue2";
  
  const tiki: TikiService | undefined = inject("Tiki");
  tiki?.initialize(id).then(() => console.log("Tiki Initialized"));
  const present = ref(false);
</script>

<template>
  <tiki-receipt :present="present" @update:present="(val) => (present = val)"/>
</template>
```

### Logout
When a user logs out of your application, you'll want to unlink connected accounts, delete cached credentials, and other user state
data.

#### With Vue >=3.0.0

```ts
import { inject, ref } from "vue";
import { type TikiService } from "@mytiki/receipt-capacitor";

const tiki: TikiService | undefined = inject("Tiki");
await tiki?.logout();
```

#### With Vue 2.7.15

```ts
import { inject, ref } from "vue";
import { type TikiService } from "@mytiki/receipt-capacitor-vue2";

const tiki: TikiService | undefined = inject("Tiki");
await tiki?.logout();
```

_Don't worry, license records and rewards issued are backed up to TIKI's immutable, hosted storage for free. After the user logs back in, call `.initialize` and the library will rebuild their balance for you._

### [Reference Docs ⇢](https://receipt-capacitor.mytiki.com)

## Example

While this README is helpful, it's always easier to just see it in action. In `/example` there is simple demo app. On launch, it generates a new random user id, with a button called start. 

_Note, if you press start before the initialization is complete, a warning will hit your console logs._

- Check out `example/src/main.ts` to view an example configuration of the library.
- In `example/src/app.vue` you'll find Vue template showcasing initialization, logout, and using a button to open the pre-built UI.
- To run the example app call `make vue[2,3]-example-[ios,android].` e.g. `make vue3-example-android`

## Open Issues
You can find active issues here in GitHub under [Issues](https://github.com/tiki/tiki-receipt-capacitor/issues). If you run into a bug or have a question, just create a new Issue or reach out to a team member on 👾 [Discord](https://discord.gg/tiki).

### Next Release: [0.5.3](https://github.com/tiki/apps/issues/14)

# Contributing

- Use [GitHub Issues](https://github.com/tiki/tiki-receipt-capacitor/issues) to report any bugs you find or to request enhancements.
- If you'd like to get in touch with our team or other active contributors, pop in our 👾 [Discord](https://discord.gg/tiki).
- Please use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) if you intend to add code to this project.

## Project Structure
- `/src`: The primary library source files
  - `/service`: The implementation of TikiService
  - `/components`: The implementation of TikiReceipt
  - `/assets`: The bundled UI assets (images, icons, stylesheets)
  - `/config`: The configuration interface(s)
  - `/utils`: Reusable helper functions
- `/example`: A simple example project using the plugin
  - `/vue2`: The example project in a Vue 2.7 configuration
  - `/vue3`: The example project in a Vue 3.0 configuration
- `vue2`: Build files for vue2 configuration
- `vue3`: Build files for vue3 configuration

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
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sfaria27"><img src="https://avatars.githubusercontent.com/u/81697281?v=4" width="100px;" alt="Tim O'Guin"/><br /><sub><b>Shane</b></sub></a><br /><a href="#doc-sfaria27" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome! 
