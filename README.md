## HOW TO DEPLOY CHANGES

This website is hosted on github pages, so only the static index.html file is actually rendered.

This means that changes to the elm code will only be reflected if the latest build is pushed to the `gh-pages` branch

run `elm-make Main.elm` and then commit the new `index.html` file and the latest should be reflected at willisplummer.com

## TO DO's

- [ ] improve deploy to gh-pages workflow
