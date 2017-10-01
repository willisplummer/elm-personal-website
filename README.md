## HOW TO DEPLOY CHANGES

This website is hosted on github pages, so only the static index.html file is actually rendered.

This means that changes to the elm code will only be reflected if the latest build is pushed to the `gh-pages` branch

If you haven't already, install the [Elm Command Line Tools](https://guide.elm-lang.org/install.html)

Then run `elm-make Main.elm` and commit the new `index.html` file.

The latest should be reflected at [willisplummer.com](http://willisplummer.com)

## PRE-COMMIT HOOK

I wrote a pre-commit hook to remind myself to build index.html and commit that too. When setting up a new local environment, simply run the following command from the top-level directory:

`$ cp hooks/pre-commit .git/hooks/pre-commit`

## TO DO's

- [ ] improve deploy to gh-pages workflow
