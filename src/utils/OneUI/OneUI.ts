import cssVarsPonyfill from 'css-vars-ponyfill';

/**
 * Set of options that can be used to configure the ponyfill.
 * Options: https://jhildenbiddle.github.io/css-vars-ponyfill/#/?id=options
 * */
interface PonyfillOptions {
    /** Targets */
    rootElement?: HTMLElement|Node;
    shadowDOM?: boolean;

    /** Sources */
    include?: string,
    exclude?: string,
    variables?: { [key: string]: string },

    /** Options */
    onlyLegacy?: boolean;
    preserveStatic?: boolean;
    preserveVars?: boolean;
    silent?: boolean;
    updateDOM?: boolean;
    updateURLs?: boolean;
    watch?: boolean;

    /** Callbacks */
    onBeforeSend?: (xhr, elm, url) => void;
    onWarning?: (message) => void;
    onError?: (message, elm, xhr, url) => void;
    onSuccess?: (cssText, elm, url) => void;
    onComplete?: (cssText, node, url) => void;
}

interface InitConfig {
    /** URL that serves the theme file */
    themeURL?: string;
    /** Max time to wait for the theme to be loaded */
    maxTime?: number;
    /** Set of options that can be used to configure the ponyfill */
    ponyfillOptions?: PonyfillOptions;
}

const isInternetExplorer11 = () => {
    const ua = window.navigator.userAgent;
    return ua.indexOf('Trident/') > 0;
};

const DEFAULT_LOADING_TIMEOUT = 2000;

class OneUI {
    static init({ themeURL, maxTime = DEFAULT_LOADING_TIMEOUT, ponyfillOptions = {} }: InitConfig = {}) {
        const loadTheme = Promise.all([
            OneUI.applyTheme(themeURL),
            OneUI.applyCssVarsPonyfill(ponyfillOptions),
        ]);

        const timeout = new Promise((resolve, reject) =>
            setTimeout(
                () => reject(new Error(`Theme "${themeURL}" not loaded. Loading time expired`)),
                maxTime
            )
        );

        return Promise.race([loadTheme, timeout]);
    }

    /**
     * Loads the CSS Vars ponyfill in case the browser is Internet Explorer 11. It can also
     * forces to load in modern browsers in case the user passes `onlyLegacy` property as false
     */
    static applyCssVarsPonyfill(ponyfillOptions: PonyfillOptions = {}) {
        return new Promise((resolve, reject) => {
            const shouldForcePonyfill = ponyfillOptions.onlyLegacy === false;

            if (!isInternetExplorer11() && !shouldForcePonyfill) {
                resolve();
                return;
            }

            const { onComplete, onError, ...rest } = ponyfillOptions;

            cssVarsPonyfill({
                ...rest,
                onComplete(cssText, node, url) {
                    if (onComplete) {
                        onComplete(cssText, node, url);
                    }
                    resolve();
                },
                onError(message, node, xhr, url) {
                    if (onError) {
                        onError(message, node, xhr, url);
                    }
                    reject(message);
                },
            });
        });
    }

    static applyTheme(themeURL) {
        return new Promise((resolve, reject) => {
            if (!themeURL) {
                resolve();
                return;
            }

            const styleElement = document.createElement('link');
            styleElement.type = 'text/css';
            styleElement.rel = 'stylesheet';
            styleElement.href = themeURL;
            styleElement.onload = () => resolve();
            styleElement.onerror = () => reject(new Error(`Failed to load the theme: ${themeURL}`));

            const head = document.getElementsByTagName('head')[0];
            head.appendChild(styleElement);
        });
    }
}

export default OneUI;
