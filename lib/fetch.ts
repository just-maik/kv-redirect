/**
 * Fetches the redirect URL based on the PARAM_MODE environment variable.
 * If PARAM_MODE is set to "subdomain", it redirects to the URL obtained from the first subdomain.
 * If PARAM_MODE is set to "path" or not set, it redirects to the URL obtained from the slug parameter.
 * @returns The fetch function that performs the redirect.
 */

import { Hono } from "hono";
import { cors } from "hono/cors";
import { client } from "./client";
import { getFirstSubdomain } from "../util/getSubdomainParameter";
import consola from "consola";


// Read the parameter mode from the environment variable
const parameterMode = process.env.PARAM_MODE ?? "path";
consola.info("Configured parameter mode: " + parameterMode);

// Create a new Hono instance with CORS enabled
const hono = new Hono().use(cors())

// Adding 404 page
hono.get("/404", async (c) => c.text("404 Not Found", 404));

switch (parameterMode) {
    // Redirect route based on the subdomain
    case "subdomain":
        hono.get('/', async (c) => {
            checkIfBasedomainPresent();
            const firstSubdomain = getFirstSubdomain(c.req, process.env.BASE_DOMAIN!);
            if (!!firstSubdomain) {
                return c.redirect(await client.GET(firstSubdomain) ?? "/404", 302);
            } else {
                return c.redirect("/404", 302);
            }
        }).fetch;
        break;
    // Redirect route based on the path
    case "path":
    default:
        hono.get(':slug', async (c) => c.redirect(await client.GET(c.req.param("slug")) ?? "/404", 302)).fetch;
        break;
}

const checkIfBasedomainPresent = () => {
    if (!process.env.BASE_DOMAIN) {
        consola.error("BASE_DOMAIN not provided but mode is subdomain. Exiting.");
        process.exit(0);
    }
}

export default hono.fetch;

