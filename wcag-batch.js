// Example of running Pa11y in parallel using `async`.

'use strict';

const createQueue = require('async').queue;
const pa11y = require('pa11y');
const fs = require('fs');
const { stringify } = require('csv-stringify');

// Setup column header values
const columns = [
    "pageUrl",
    "documentTitle",
    "code",
    "type",
    "typeCode",
    "message",
    "context",
    "selector",
    "runner",
    "runnerExtras"
];
// Setup stringifier to "stringify" arrays
const stringifier = stringify({ header: true, columns: columns });
// Get file input/output names
const urls_filename = process.argv.slice(2)[0].toString();
const output_filename = process.argv.slice(2)[1].toString();

// Get file of URLs from FileSystem
const urls = fs.readFileSync(urls_filename)
    .toString() // convert buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) //remove white spaces for each lines
const total = urls.length;

/* Create a Pa11y test runner
 * ----------------------------------------- */
const concurrency = 4; // Change the concurrency here to run more tests in parallel
const queue = createQueue(processUrl, concurrency); // Create our queue
queue.push(urls); // push all URLs to the queue

// Store results to build csv
let all_results = [];

// Process a URL that was passed into the queue
function processUrl(url, done) {
    pa11y(url, (error, results) => {
        // FYI ignoring errors for now, you might want to log these somewhere
        if (!error) {
            let errorCount = 0;
            if (results.issues) {
                // Set error count based on pa11y runner results
                errorCount = results.issues.filter(result => result.type === 'error').length;
                const issues = results.issues; // Get issues
                let local_array = [];
                issues.forEach(issue => { // Build array from results
                    let row_array = [];
                    row_array.push(results.pageUrl);
                    row_array.push(results.documentTitle);
                    row_array.push(issue.code);
                    row_array.push(issue.type);
                    row_array.push(issue.typeCode);
                    row_array.push(issue.message);
                    row_array.push(issue.context);
                    row_array.push(issue.selector);
                    row_array.push(issue.runner);
                    row_array.push(issue.runnerExtras);
                    local_array.push(row_array);
                });
                all_results.push(local_array);
                console.log(local_array.length);
            }
            console.log(`Finished testing ${url}: ${errorCount} errors`);
        }
        const remaining = queue.length(); // Get remaining queue
        console.log( remaining + ' remaining tasks (' + total + ' total)' ); // Log it out
        done( null, { url, remaining });
        if (remaining == 0) {
            queueDrained(all_results);
        }
    });

}

// Called when everything's finished
function queueDrained(pa11y_results) {
    console.log('Finished processing all URLs!');
    pa11y_results.forEach((result) => {
        result.forEach((row) => {
            stringifier.write(row);
        });
    });
    stringifier.pipe(fs.createWriteStream(output_filename));
}

