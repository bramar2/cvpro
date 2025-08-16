function premiumImg(parent) {
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
    if(imgCnt !== 1) return undefined;
    if(!isPremium) return undefined;
    return img;
}

function pasteImg(img) {
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
}

chrome.storage.sync.get({"config-premium-elements": ___cvp.getDefaultConfig()["config-premium-elements"]}, (config) => {
    if(!config["config-premium-elements"]) return;
    document.addEventListener("dragstart", (e) => {
        const target = e.target;
        const img = premiumImg(target.children[0]);
        if(img === undefined) return;
        ___cvp.dragged = img;
    });
    document.addEventListener("drop", (e) => {
        const img = ___cvp.dragged;
        if(img === undefined) return;
        
        e.stopImmediatePropagation();
        e.stopPropagation();

        pasteImg(img);
    });
    document.addEventListener("dragend", (e) => {
        ___cvp.dragged = undefined;
    });
    document.addEventListener("click", (e) => {
        const target = e.target;

        if(target.tagName.toLowerCase() !== "div") return;
        if(target.role !== "button") return;
        if(target.draggable !== true) return;

        const parent = target.parentElement;
        const img = premiumImg(parent);
        if(img === undefined) return;
        

        e.stopImmediatePropagation();
        e.stopPropagation();

        pasteImg(img);
    }, true);
});