#!/usr/bin/env make

all: build
server: serve

.PHONY: install
install:
	npm install
	npm dedupe

.PHONY: serve
serve:
	-node server/web.js

.PHONY: build
build:
	rm -rf dist
	mkdir -p dist/js
	mkdir -p dist/css
	cp app/index.html dist
	$(MAKE) build-js
	$(MAKE) build-css

.PHONY: build-js
build-js:
	node_modules/browserify/bin/cmd.js app/js/main.js -d -o dist/js/bundle.js 

.PHONY: build-css
build-css:
	cat app/css/* | node_modules/clean-css/bin/cleancss --s0 -o dist/css/core.css

.PHONY: clean
clean:
	rm -rf dist node_modules
