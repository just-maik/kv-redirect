import type { HonoRequest } from "hono";
import { debugLog } from "./log";

// get subdomains from hono request url
export function getFirstSubdomain(req: HonoRequest, baseDomain: string) {
    const domainParameter = req.url.replaceAll(/^https?:\/\//gm, "").replaceAll(baseDomain, "").split("/")[0].trim().split(".");
    let parameter = "";
    if (domainParameter.length > 1) {
        parameter = domainParameter.join(".");
    } else {
        parameter = domainParameter[0];
    }
    parameter = parameter.slice(0, -1);
    debugLog("Subdomain Parameter: ", parameter === '' ? 'No subdomain found.' : parameter);
    return parameter;
}