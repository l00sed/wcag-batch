# WACG Batch Processor

This repo uses the `wacg-batch.js` script to run `pa11y` (a CLI accessibility-testing tool) against a `.csv` of URLs.

## Instructions

First install the required node packages using `npm i`
This script uses `csv`, `pa11y`, `fs`, and `async` packages.
Once installed, execute `npm run batch`. This is an alias read from the `package.json` file.
You should adjust the alias in `package.json` to fit your needs.
The alias runs the command `node wacg-batch.js gwpa/short.csv gwpa/results.csv` where `gwpa/short.csv` should be substituted for any `<subfolder/list_of_urls.csv>` and `gwpa/results.csv` should be substituted for any `<subfolder/results.csv>`.
