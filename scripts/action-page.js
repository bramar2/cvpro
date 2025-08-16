function saveSettings() {
    let config = {};
    for(const input of document.querySelectorAll('.option > input')) {
        config[input.id] = input.checked;
    }
    chrome.storage.sync.set(config);
}

function loadSettings() {
    const DEFAULT_CONFIG = {
        "config-premium-elements": true
    };
    chrome.storage.sync.get(DEFAULT_CONFIG, (config) => {
        for(const key of Object.keys(DEFAULT_CONFIG)) {
            const element = document.getElementById(key);
            element.checked = config[key];
            element.addEventListener('change', saveSettings);
        }
    });
}

document.addEventListener('DOMContentLoaded', loadSettings);