# willisplummer.com — common tasks.
# Tooling (elm, elm-live, elm-test, elm-format, uglifyjs) comes from the Nix
# dev shell; see flake.nix / README.md.

.DEFAULT_GOAL := help
.PHONY: dev build test format clean help

## dev: live-reloading dev server (serves dev.html + the unminified elm.js)
dev:
	elm-live Main.elm --start-page=dev.html --pushstate -- --output=elm.js

## build: optimized production build -> elm.js + minified elm.min.js
build:
	./build.sh

## test: run the elm-test suite
test:
	elm-test

## format: elm-format all sources in place
format:
	elm-format Main.elm src/ tests/ --yes

## clean: remove the elm build cache (leaves committed elm.js/elm.min.js)
clean:
	rm -rf elm-stuff

## help: list available targets
help:
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/^## /  make /'
