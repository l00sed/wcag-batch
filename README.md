# WCAG Batch Processor

This repo uses the `wcag-batch.js` script to run `pa11y` (a CLI accessibility-testing tool) against a `.csv` of URLs.

## Instructions

1. First install the required node packages using `npm i`
   This script uses `csv`, `pa11y`, `fs`, and `async` packages.
2. Once everything is finished installing, execute `npm run batch`.
   This is an alias read from the `package.json` file.
   You should adjust the alias in `package.json` to fit your needs.
   The alias runs the command `node wcag-batch.js gwpa/short.csv gwpa/results.csv`

   In `package.json`:
     - Substitute `gwpa/short.csv` for your own input file (.csv of URLs to process):
     - I.e., `subfolder/list_of_urls.csv`
     - Substitute `gwpa/results.csv` for your own output filename (.csv of results):
     - I.e.,`subfolder/results.csv`
