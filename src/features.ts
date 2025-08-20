(async () => {
    for(const url of ["src/config.js", "src/overlay.js"]) {
        const src = chrome.runtime.getURL(url);
        await import(src);
    }
    
    for(const url of ["src/hide-pro-trial.js", "src/premium-elements.js"]) {
        const src = chrome.runtime.getURL(url);
        const contentScript = await import(src);
        contentScript.init();
    }
})();