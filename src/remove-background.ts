import { getDefaultConfig } from "./config.js";

export function init(): void {
    chrome.storage.sync.get({"config-remove-background": getDefaultConfig()["config-remove-background"]}, (config) => {
        if(!config["config-remove-background"]) return;

        // TODO
    });
}