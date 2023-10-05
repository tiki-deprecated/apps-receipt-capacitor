.PHONY: vue3 clean

lint:
	npx eslint "./src/**/*.{ts,js}"

fmt:
	npx prettier "./src/**/*.{css,html,ts,js,java}" --write

vue3:
	cp -f ./vue3/main.ts ./src/main.ts
	cp -f ./vue3/package.json ./package.json
	cp -f ./vue3/vite.config.ts ./vite.config.ts
	npm install
	npm run build

vue3-example: vue3
	cd example/vue3 && npm install
	cd example/vue3 && npm run build && npx cap sync

vue3-example-android: vue3-example
	cd example/vue3/android && ./gradlew build
	cd example/vue3 && npx cap run android

vue3-example-ios: vue3-example
	cd example/vue3 && npx cap run ios

clean:
	rm -f ./src/main.ts vite.config.ts package.json
	rm -rf node_modules/
	rm -rf dist/
