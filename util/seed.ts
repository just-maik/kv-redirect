import { client } from "../lib/client";
import ora from "ora";
import { readFile, exists } from "fs/promises";
import consola from "consola";

export async function seed() {
	if (!exists("seeds.json")) {
		consola.warn("No seeds.json file found. Exiting...");
		return;
	}
	const file = await readFile("seeds.json", "utf-8");
	const seeds = JSON.parse(file) as { key: string; url: string }[];
	// Create a spinner to show the seeding progress
	const spinner = ora("Seeding...").start();

	// Use Promise.allSettled to asynchronously set all the key-value pairs in the seeds array
	const results = await Promise.allSettled(
		seeds.map((e) => client.SET(e.key, e.url))
	);

	// Stop the spinner once the seeding is complete
	spinner.stop();

	// Display a message indicating that the seeding is complete
    consola.log("");
	consola.success("Seeding complete 🥳");
	consola.info("Seeds: \n" + seeds
        .map(
            (e, i) =>
                [
                    e.key,
                    e.url,
                    results[i].status === "fulfilled" ? "✅" : "❌",
                ].join(" | ")
        ).join("\n")
        .toString());
    consola.log("");
}
