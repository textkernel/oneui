import * as React from 'react';

/**
 * A hook that helps listening to clicks outside of a component
 * @param {(event: MouseEvent) => void} callback a function to be called when the document was clicked
 * @returns {React.RefObject} to be applied to the elements that we listen to (clicks on this element will not trigger the callback)
 */
export function useOuterClick<E = HTMLElement>(callback: (event: MouseEvent) => void) {
    const ref = React.createRef<E>();

    React.useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            // @ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                callback(event);
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [ref]);

    return ref;
}
