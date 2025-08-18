import { getDefaultConfig } from "./config.js";
function delProTrial(): void {
    document.querySelector('nav[role=menubar] > div:last-child > div:nth-child(2) button[role=menuitem]')?.remove();
    document.querySelector('div[role=tabpanel] div:has(> div > div > div:nth-child(3) > div:nth-child(1) > p):has(> div > div > div:nth-child(3) > div:nth-child(2) > div > div > div > button[type=button])')?.remove();
}

let observer: MutationObserver;
export function init(): void {
    chrome.storage.sync.get({"config-hide-pro-trial": getDefaultConfig()["config-hide-pro-trial"]}, (config: Record<string, boolean>) => {
        if(!config["config-hide-pro-trial"]) return;

        observer = new MutationObserver(delProTrial);
        observer.observe(document.body, { childList: true, subtree: true});
    });
}