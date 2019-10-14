/** TODO: extend this function to check on parent scroll container if we have a use case.
 * That implementation is hard to test in storybook because of the iframe situation,
 * hence relevant code is now disabled here
 */

// const REGEXP_SCROLL_PARENT = /^(visible|hidden)/;

// const getScrollParent = el => {
//     if (!(el instanceof HTMLElement) || typeof window.getComputedStyle !== 'function') {
//         return null;
//     }
//     if (
//         el.scrollHeight >= el.clientHeight &&
//         !REGEXP_SCROLL_PARENT.test(window.getComputedStyle(el).overflowY || 'visible')
//     ) {
//         return el;
//     }
//     return getScrollParent(el.parentElement) || document.body;
// };

const scrollIntoViewIfNeeded = (el, alignTo = 'bottom') => {
    // check if we can scroll at all
    if (!el || !el.scrollIntoView) {
        return;
    }

    // check if element is visible:
    const elRect = el.getBoundingClientRect();
    // const scrollParent = getScrollParent(el);
    // const parentRect = scrollParent.getBoundingClientRect();

    const isVisible = elRect.top >= 0 && elRect.bottom <= window.innerHeight;
    // const isVisible = elRect.top >= parentRect.top && elRect.bottom <= parentRect.bottom;

    if (!isVisible) {
        const alignToTop = alignTo !== 'bottom';
        el.scrollIntoView(alignToTop);
    }
};

export default scrollIntoViewIfNeeded;
