import { getDefaultConfig } from "./config.js";
function sanitize(cfgName: string): string {
    // sanitize key, only allow a-zA-Z0-9-_
    let key: string = "";
    for(let ch of cfgName) {
        if(/^[a-zA-Z0-9-_]$/i.test(ch)) key += ch;
    }
    return key;
}
function saveSettings(): void {
    let config: Record<string, boolean> = {};
    const DEFAULT_CONFIG: Record<string, boolean> = getDefaultConfig();
    for(const objKey of Object.keys(DEFAULT_CONFIG)) {
        const element: HTMLInputElement = document.getElementById(sanitize(objKey)) as HTMLInputElement;
        if(element) {
            config[objKey] = element.checked;   
        }
    }
    chrome.storage.sync.set(config);
}

function loadSettings(): void {
    const DEFAULT_CONFIG: Record<string, boolean> = getDefaultConfig();
    for(const objKey of Object.keys(DEFAULT_CONFIG)) {
        let key: string = sanitize(objKey);
        document.body.innerHTML += `<div class="option"><input type="checkbox" id="${key}"/><span>${key}</span></div>`;
    }
    const height: number = 25 * Object.keys(DEFAULT_CONFIG).length;
    document.body.style.height = height + "px";
    chrome.storage.sync.get(DEFAULT_CONFIG, (config: Record<string, boolean>) => {
        for(const [objKey, value] of Object.entries(config)) {
            const element: HTMLInputElement = document.getElementById(sanitize(objKey)) as HTMLInputElement;
            element.checked = value;
            element.addEventListener('change', saveSettings);
        }
    });
}

document.addEventListener('DOMContentLoaded', loadSettings);