import { client } from '../lib/client';
import ora from 'ora';
import { terminal } from 'terminal-kit';
import seeds from "./seeds.json";

// Create a spinner to show the seeding progress
const spinner = ora('Seeding...').start();

// Use Promise.allSettled to asynchronously set all the key-value pairs in the seeds array
const results = await Promise.allSettled(seeds.map(e => client.SET(e.key, e.value)))

// Stop the spinner once the seeding is complete
spinner.stop();

// Display a message indicating that the seeding is complete
terminal.wrap("Seeding complete 🥳\n");

// Display a table showing the results of the seeding process
terminal.table([
    ['Slug', 'URL', 'Success'],
    ...seeds.map((e, i) => [e.key, e.value, results[i].status === 'fulfilled' ? '✅' : '❌'])
],
    {
        hasBorder: true,
        contentHasMarkup: true,
        borderChars: 'lightRounded',
        fit: true
    });

// Exit the process with a status code of 0
process.exit(0)
