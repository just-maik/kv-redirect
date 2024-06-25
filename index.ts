import consola from 'consola';
import fetch from './lib/fetch';

const port = process.env.PORT ?? 3000

consola.success(`KV-Redirect listening on port ${port}`)

export default {
    port,
    fetch,
}
