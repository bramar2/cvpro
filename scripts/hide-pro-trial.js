function delBtn() {
    for(let btn of document.querySelectorAll('nav[role=menubar] > div:last-child > div:nth-child(2) button[role=menuitem]')) {
        if(btn) btn.remove();
    }
}
chrome.storage.sync.get({"config-hide-pro-trial": ___cvp.getDefaultConfig()["config-hide-pro-trial"]}, (config) => {
    document.addEventListener('DOMContentLoaded', (e) => {
        delBtn();
        setTimeout(delBtn, 1000);
        setTimeout(delBtn, 2000);
        setTimeout(delBtn, 4000);
        setInterval(delBtn, 20000);
    });
});