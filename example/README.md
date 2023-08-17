# Example App
On launch, the example app generates a new random user id, with a single button called start. Just click start to try out the library for yourself.

_Note, if you press start before the initialization is complete, a warning will hit your console logs._

## Run the App

1. Clone this repository
```shell
git clone https://github.com/tiki-bar/tiki-receipt-capacitor
```

2. Build the App
```shell
cd example/ && npm install && npm run build-only && npx cap sync
```

3. Run the App
```shell
npx cap run android
```

## Overview

- Check out `example/src/main.ts` to view an example configuration of the library.
- In `example/src/app.vue` you'll find Vue template showcasing initialization, logout, and using a button to open the pre-built UI.
- In `example/src/assets/*` there are samples for program and reward images plus markdown template files for legal terms and the learn more page. Feel free to copy, use, and modify any of these assets.
