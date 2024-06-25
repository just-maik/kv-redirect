import consola from "consola"

export const debugLog = (message: any, ...data: any[]) => {
    process.env.DEBUG === "true" ? consola.info(message, ...data) : () => { }
}