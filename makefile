.PHONY: vue3 vue2 clean

lint:
	npx eslint "./src/**/*.{ts,js}"

fmt:
	npx prettier "./src/**/*.{css,html,ts,js,java}" --write

vue3: clean
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

vue2: clean
	cp -f ./vue2/main.ts ./src/main.ts
	cp -f ./vue2/package.json ./package.json
	cp -f ./vue2/vite.config.ts ./vite.config.ts
	npm install
	npm run build

vue2-example: vue2
	cd example/vue2 && npm install
	cd example/vue2 && npm run build && npx cap sync

vue2-example-android: vue2-example
	cd example/vue2/android && ./gradlew build
	cd example/vue2 && npx cap run android

vue2-example-ios: vue2-example
	cd example/vue2 && npx cap run ios

clean:
	rm -f ./src/main.ts vite.config.ts package.json package-lock.json
	rm -rf node_modules/ dist/ example/vue2/dist/ example/vue3/dist/
