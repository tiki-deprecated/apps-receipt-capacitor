#!/usr/bin/env bash

cd ../tiki-capture-receipt-capacitor
npm install
npm run build
npm run verify:ios
cd example
npm install
npm run build-only
cd ../../tiki-receipt-capacitor
npm install ../tiki-capture-receipt-capacitor
cd example
npm install ../../tiki-capture-receipt-capacitor
npm install ../
cd ..
npm run example:ios