export function hideScrollbar(open: boolean) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (!open) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = '0';
    }
}