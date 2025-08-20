let timeoutId: (number | undefined) = undefined;

export function getOverlayId(): string {
    return "__cvp__overlay";
}

export function showOverlay(text: string = "", setTimeoutLimit: boolean = true): void {
    if(timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
    }

    hideOverlay();

    const overlay: HTMLDivElement = document.createElement('div');
    overlay.id = getOverlayId();
    overlay.style.pointerEvents = "none";


    overlay.innerText = text;
    overlay.style.fontSize = "50px";
    overlay.style.color = "#FFFFFF66";
    overlay.style.lineHeight = "100vh";
    overlay.style.textAlign = "center";

    
    overlay.style.position = "absolute";
    overlay.style.left = overlay.style.top = "0";
    overlay.style.width = overlay.style.height = "100%";
    overlay.style.zIndex = "100000";
    overlay.style.backgroundColor = "#000022AA";

    document.body.appendChild(overlay);

    if(setTimeoutLimit) {
        timeoutId = setTimeout(hideOverlay, 7000);
    }
}

export function hideOverlay(): void {
    if(timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
    }
    
    const element: (HTMLElement | null) = document.getElementById(getOverlayId());
    if(element) {
        element.remove();
    }
}