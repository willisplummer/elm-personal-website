# willisplummer.com

A static personal website written in [Elm](https://elm-lang.org/). It's a plain
HTML + JS + data-file project — no npm/node_modules install step:

- `index.html` — the page shell; loads the compiled `elm.min.js` and fetches `reading-list.yml`
- `Main.elm` / `src/` — the Elm source
- `reading-list.yml` — content rendered by the app at runtime
- `elm.js` / `elm.min.js` — the compiled output, committed so GitHub Pages can serve it

## DEV ENVIRONMENT

Tooling (elm, elm-test, elm-live, elm-format, uglify-js) is provided by a Nix
flake — there is no `yarn install` / `npm install`.

With [Nix](https://nixos.org/download) (flakes enabled) and
[direnv](https://direnv.net/) installed, the environment loads automatically:

```
$ direnv allow    # one-time, on first checkout
```

After that, `cd`-ing into the directory puts all the tools on your `PATH`.
Without direnv, run commands inside `nix develop`:

```
$ nix develop
```

## DEVELOP LOCALLY

Live-reloading dev server:

```
$ elm-live Main.elm -- --output=elm.js
```

Or just open the current build in a browser:

```
$ open index.html
```

Run the tests:

```
$ elm-test
```

## BUILD

`build.sh` compiles `Main.elm` with `--optimize` and minifies it to `elm.min.js`
(the file `index.html` loads):

```
$ ./build.sh
```

## HOW TO DEPLOY CHANGES

This website is hosted on GitHub Pages off the `gh-pages` branch, which serves
the static files directly.

Changes to the Elm code are only reflected once the rebuilt output is committed,
so after editing:

1. Run `./build.sh`
2. Commit the updated `elm.js` / `elm.min.js` alongside your source changes
3. Push to `gh-pages`

The latest is served at [willisplummer.com](http://willisplummer.com).

## PRE-COMMIT HOOK

There's a pre-commit hook that reminds you to rebuild before committing to
`gh-pages`. When setting up a new local checkout, install it with:

```
$ cp hooks/pre-commit .git/hooks/pre-commit
```

## TO DO's

- [ ] improve deploy to gh-pages workflow
