import * as React from 'react';

export function useBrowserTabVisibilityChange() {
    const [isBrowserTabVisible, setIsBrowserTabVisible] = React.useState(true);

    React.useEffect(() => {
        const handleFocusHandleVisibilityChange = () => {
            if (document.hidden) {
                setIsBrowserTabVisible(false);
            } else {
                setTimeout(() => setIsBrowserTabVisible(true), 250);
            }
        };

        document.addEventListener('visibilitychange', handleFocusHandleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleFocusHandleVisibilityChange);
        };
    }, []);

    return isBrowserTabVisible;
}
