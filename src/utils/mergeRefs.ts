import React from 'react';

/**
 * Merge all refs into one ref function
 * @param refs - list of refs to be merged (skip undefined)
 */
export function mergeRefs<T>(
    refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined>
): React.RefCallback<T> {
    return (node) => {
        refs.forEach((ref) => {
            if (!ref) {
                return;
            }
            if (typeof ref === 'function') {
                ref(node);
            }
            if (typeof ref === 'object') {
                // eslint-disable-next-line no-param-reassign
                (ref as React.MutableRefObject<T | null>).current = node;
            }
        });
    };
}
