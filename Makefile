#!/usr/bin/env make

all: build

.PHONY: install
install:
	npm install
	npm dedupe

.PHONY: build
build:
	rm -rf dist
	mkdir dist{,/js,/css}
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
