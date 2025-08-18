export function startLoading(): void {
    stopLoading();

    const overlay: HTMLDivElement = document.createElement('div');
    overlay.id = "__cvp__loading";
    overlay.style.position = "absolute";
    overlay.style.left = overlay.style.top = "0";
    overlay.style.width = overlay.style.height = "100%";
    overlay.style.zIndex = "100000";
    overlay.style.backgroundColor = "#000022AA";

    document.body.appendChild(overlay);

    setTimeout(stopLoading, 7000);
}

export function stopLoading(): void {
    const element: (HTMLElement | null) = document.getElementById("__cvp__loading");
    if(element) {
        element.remove();
    }
}