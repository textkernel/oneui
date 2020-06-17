import * as React from 'react';

export function useBrowserTabVisibilityChange() {
    const [isBrowserTabVisible, setIsBrowserTabVisible] = React.useState(true);

    React.useEffect(() => {
        const handleFocusHandleVisibilityChange = () => {
            if (document.hidden) {
                setIsBrowserTabVisible(false);
            } else {
                // once the tab is switched back synced setIsBrowserTabVisible sets new value
                // before any component was focused what may cause unexpected behavior
                setTimeout(() => setIsBrowserTabVisible(true));
            }
        };

        document.addEventListener('visibilitychange', handleFocusHandleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleFocusHandleVisibilityChange);
        };
    }, []);

    return isBrowserTabVisible;
}
