import * as React from 'react';

export function useBrowserTabVisibilityChange() {
    const [isBrowserTabVisible, setIsBrowserTabVisible] = React.useState(true);
    const handleFocusHandleVisibilityChange = () => {
        if (document.hidden) {
            setIsBrowserTabVisible(false);
        } else {
            setTimeout(() => setIsBrowserTabVisible(true), 250);
        }
    };

    React.useEffect(() => {
        document.addEventListener('visibilitychange', handleFocusHandleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleFocusHandleVisibilityChange);
        };
    });

    return isBrowserTabVisible;
}
