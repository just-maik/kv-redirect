import consola from "consola";
import fetch from "./lib/fetch";
import { seed } from "./util/seed";

const port = process.env.PORT ?? 3000;

// If the INITAL_SEEDING environment variable is set to true, seed the database
if (process.env.INITIAL_SEEDING === "true") await seed();

consola.success(`KV-Redirect listening on port ${port}`);

export default {
	port,
	fetch,
};
