function delProTrial() {
    for(let btn of document.querySelectorAll('nav[role=menubar] > div:last-child > div:nth-child(2) button[role=menuitem]')) {
        if(btn) btn.remove();
    }
    for(let element of document.querySelectorAll('div[role=tabpanel] div:has(> div > div > div:nth-child(3) > div:nth-child(1) > p):has(> div > div > div:nth-child(3) > div:nth-child(2) > div > div > div > button[type=button])')) {
        if(element) element.remove();
    }
}
chrome.storage.sync.get({"config-hide-pro-trial": ___cvp.getDefaultConfig()["config-hide-pro-trial"]}, (config) => {
    if(!config["config-hide-pro-trial"]) return;
    document.addEventListener('DOMContentLoaded', (e) => {
        delProTrial();
        setTimeout(delProTrial, 1000);
        setInterval(delProTrial, 2000);
    });
});