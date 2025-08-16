chrome.storage.sync.get({"config-premium-elements": DEFAULT_CONFIG["config-premium-elements"]}, (config) => {
    document.addEventListener("click", (e) => {
        const target = e.target;
        const parent = target.parentElement;

        if(target.tagName.toLowerCase() !== "div") return;
        if(target.role !== "button") return;
        if(target.draggable !== true) return;

        
        let imgCnt = 0;
        let isPremium = false;
        let img = undefined;
        for(const child of parent.children) {
            if(child.tagName.toLowerCase() === "img") {
                img = child;
                imgCnt++;
            }
            if(child.tagName.toLowerCase() !== "span") continue;
            if(child.classList.length > 1) continue;
            if(child.children.length !== 1) continue;
            if(child.children[0].children.length > 0) {
                isPremium = true;
                break;
            }
        }
        if(imgCnt !== 1) return;
        if(!isPremium) return;

        e.stopImmediatePropagation();
        e.stopPropagation();

        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const name = img.alt;
        let filename = "";
        for(let ch of name) {
            if(/^[a-zA-Z0-9\. ]$/i.test(ch)) {
                filename += ch;
            }
        }
        filename += ".png";
        console.log(filename);
        canvas.toBlob((blob) => {
            const file = new File([blob], filename, {type: 'image/png'});
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);

            const pasteEvent = new ClipboardEvent('paste', {
                bubbles: true,
                cancelable: true,
                clipboardData: dataTransfer,
            });
            document.dispatchEvent(pasteEvent);
        }, "image/png", 1);
    }, true);
});