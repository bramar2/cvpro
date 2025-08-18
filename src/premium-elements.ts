import { getDefaultConfig } from "./config.js";
import { startLoading, stopLoading } from "./loading.js";
function premiumImg(parent: HTMLElement): (HTMLImageElement | undefined) {
    let imgCnt: number = 0;
    let isPremium: boolean = false;
    let img: (HTMLImageElement | undefined) = undefined;
    for(const child of parent.children) {
        if(child.tagName.toLowerCase() === "img") {
            img = child as HTMLImageElement;
            imgCnt++;
        }
        if(child.tagName.toLowerCase() !== "span") continue;
        if(child.classList.length > 1) continue;
        if(child.children.length !== 1) continue;

        if(child.children[0]?.children.length) { // if has children
            isPremium = true;
            break;
        }
    }
    if(imgCnt !== 1) return undefined;
    if(!isPremium) return undefined;
    return img;
}

type PasteImgCallback = (e: ClipboardEvent) => void;
function pasteImg(img: HTMLImageElement, callback: PasteImgCallback): void {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    const name: string = img.alt;
    let filename = "";
    for(let ch of name) {
        if(/^[a-zA-Z0-9\. ]$/i.test(ch)) {
            filename += ch;
        }
    }
    filename += ".png";
    canvas.toBlob((blob: (Blob | null)) => {
        if(!blob) return;
        const file: File = new File([blob], filename, {type: 'image/png'});
        const dataTransfer: DataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        const pasteEvent: ClipboardEvent = new ClipboardEvent('paste', {
            bubbles: true,
            cancelable: true,
            clipboardData: dataTransfer,
        });
        callback(pasteEvent);
    }, "image/png", 1);
    canvas.remove();
}

function observeChange(): void {
    const uploadAnimation: (HTMLElement | null) = document.querySelector("div[role=tablist][aria-orientation=vertical] > div:nth-child(5) > button > div > div > div:nth-child(3)");
    if(uploadAnimation) {
        stopLoading();
    }
}

let draggedImage: (HTMLImageElement | undefined) = undefined;
let pasteEvent: (ClipboardEvent | undefined) = undefined;
let pasteImmediately: boolean = false;
let observer: MutationObserver;

export function init(): void {
    chrome.storage.sync.get({"config-premium-elements": getDefaultConfig()["config-premium-elements"]}, (config: Record<string, boolean>) => {
        if(!config["config-premium-elements"]) return;

        observer = new MutationObserver(observeChange);
        observer.observe(document.body, { childList: true, subtree: true });


        document.addEventListener("dragstart", (e: DragEvent) => {
            if(!e.target) return;

            const target: HTMLElement = e.target as HTMLElement;

            if(target.children == null || target.children.length == 0 || !target.children[0]) return;


            const img: (HTMLImageElement | undefined) = premiumImg(target.children[0] as HTMLElement);
            if(img === undefined) return;

            draggedImage = img;
            pasteImg(img, (e: ClipboardEvent): void => {
                if(pasteImmediately) {
                    document.dispatchEvent(e);
                    pasteImmediately = false;
                }else {
                    pasteEvent = e;
                }
            });
        });
        document.addEventListener("drop", (e: DragEvent) => {
            if(draggedImage === undefined) return;
            
            e.stopImmediatePropagation();
            e.stopPropagation();

            startLoading();
            if(pasteEvent === undefined) {
                pasteImmediately = true;
            }else {
                document.dispatchEvent(pasteEvent);
                pasteEvent = undefined;
                pasteImmediately = false;
            }
        });
        document.addEventListener("dragend", (_: DragEvent) => {
            draggedImage = undefined;
            pasteEvent = undefined;
            pasteImmediately = false;
        });
        document.addEventListener("click", (e: MouseEvent) => {
            if(!e.target) return;

            const target: HTMLElement = e.target as HTMLElement;

            if(target.tagName.toLowerCase() !== "div") return;
            if(target.role !== "button") return;
            if(target.draggable !== true) return;

            const parent: HTMLElement = target.parentElement as HTMLElement;
            const img: (HTMLImageElement | undefined) = premiumImg(parent);
            if(img === undefined) return;
            

            e.stopImmediatePropagation();
            e.stopPropagation();
            
            startLoading();
            pasteImg(img, (e: ClipboardEvent): void => {
                document.dispatchEvent(e);
            });
        }, true);
    });
}