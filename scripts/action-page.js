function sanitize(cfgName) {
    // sanitize key, only allow a-zA-Z0-9-_
    let key = "";
    for(let ch of cfgName) {
        if(/^[a-zA-Z0-9-_]$/i.test(ch)) key += ch;
    }
    return key;
}
function saveSettings() {
    let config = {};
    const DEFAULT_CONFIG = ___cvp.getDefaultConfig();
    for(const objKey of Object.keys(DEFAULT_CONFIG)) {
        const element = document.getElementById(sanitize(objKey));
        if(element === undefined) continue;

        config[objKey] = element.checked;
    }
    console.log(config);
    chrome.storage.sync.set(config);
}

function loadSettings() {
    const DEFAULT_CONFIG = ___cvp.getDefaultConfig();
    for(const objKey of Object.keys(DEFAULT_CONFIG)) {
        let key = sanitize(objKey);
        document.body.innerHTML += `<div class="option"><input type="checkbox" id="${key}"/><span>${key}</span></div>`;
    }
    chrome.storage.sync.get(DEFAULT_CONFIG, (config) => {
        for(const objKey of Object.keys(DEFAULT_CONFIG)) {
            const key = sanitize(objKey);
            const element = document.getElementById(key);
            element.checked = config[objKey];
            element.addEventListener('change', saveSettings);
        }
    });
}

document.addEventListener('DOMContentLoaded', loadSettings);