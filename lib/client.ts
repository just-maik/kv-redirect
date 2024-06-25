import { createClient } from '@redis/client';
import consola from 'consola';

async function getClient() {
    try {
        return await createClient({
            url: process.env.KV_URL ?? "redis://localhost:6379",
        }).connect();
    } catch (e) {
        if (process.env.KV_URL) {
            consola.error(`Can't connect to your KV_URL '${process.env.KV_URL}'`);
        } else {
            consola.error(`KV_URL not provided. Can't connect to 'redis://localhost:6379'`);
        }
        process.exit(0)
    }
}

export const client = await getClient();