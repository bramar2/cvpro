(async () => {
    for(const url of ["src/config.js", "src/loading.js"]) {
        const src = chrome.runtime.getURL(url);
        await import(src);
    }
    
    for(const url of ["src/hide-pro-trial.js", "src/premium-elements.js", "src/remove-background.js"]) {
        const src = chrome.runtime.getURL(url);
        const contentScript = await import(src);
        contentScript.init();
    }
})();