import { getDefaultConfig } from "./config.js";
function delProTrial(): void {
    for(const btn of document.querySelectorAll('nav[role=menubar] > div:last-child > div:nth-child(2) button[role=menuitem]')) {
        if(btn) {
            btn.remove();
        }
    }
    for(const element of document.querySelectorAll('div[role=tabpanel] div:has(> div > div > div:nth-child(3) > div:nth-child(1) > p):has(> div > div > div:nth-child(3) > div:nth-child(2) > div > div > div > button[type=button])')) {
        if(element) {
            element.remove();
        }
    }
}
export function init(): void {
    chrome.storage.sync.get({"config-hide-pro-trial": getDefaultConfig()["config-hide-pro-trial"]}, (config: Record<string, boolean>) => {
        if(!config["config-hide-pro-trial"]) return;
        document.addEventListener('DOMContentLoaded', (e: Event) => {
            delProTrial();
            setTimeout(delProTrial, 1000);
            setInterval(delProTrial, 2000);
        });
    });
}