import * as React from 'react';

export function useBrowserTabVisibilityChange() {
    const [isBrowserTabVisible, setIsBrowserTabVisible] = React.useState(true);

    React.useEffect(() => {
        const handleFocusHandleVisibilityChange = () => {
            if (document.hidden) {
                setIsBrowserTabVisible(false);
            } else {
                // without the delay below once the tab is switched back setIsBrowserTabVisible
                // sets 'true' before any component was focused what may cause unexpected behavior
                setTimeout(() => setIsBrowserTabVisible(true), 100);
            }
        };

        document.addEventListener('visibilitychange', handleFocusHandleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleFocusHandleVisibilityChange);
        };
    }, []);

    return isBrowserTabVisible;
}
