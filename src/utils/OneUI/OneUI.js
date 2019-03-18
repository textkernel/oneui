import cssVarsPonyfill from 'css-vars-ponyfill';

const isInternetExplorer11 = () => {
    const ua = window.navigator.userAgent;
    return ua.indexOf('Trident/') > 0;
};

const DEFAULT_LOADING_TIMEOUT = 2000;

class ThemeLoader {
    /**
     * Loads the theme and the CSS vars ponyfill if necessary
     *
     * @param {Object} themeConfig - Object that contains the configuration to initialize the theme
     * @param {string} themeConfig.themeURL - URL that serves the theme file
     * @param {number} themeConfig.maxTime - Max time to wait for the theme to be loaded
     * @param {Object} themeConfig.ponyfillOptions - Set of options that can be used to configure the ponyfill. Options: https://www.npmjs.com/package/css-vars-ponyfill#options
     */
    static init({ themeURL = '', maxTime = DEFAULT_LOADING_TIMEOUT, ponyfillOptions } = {}) {
        const loadTheme = Promise.all([
            ThemeLoader.applyTheme(themeURL),
            ThemeLoader.startCssVarsPonyfill(ponyfillOptions)
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
    static startCssVarsPonyfill(ponyfillOptions = { onlyLegacy: true }) {
        return new Promise((resolve, reject) => {
            if (!isInternetExplorer11() && ponyfillOptions.onlyLegacy === true) {
                resolve();
                return;
            }

            cssVarsPonyfill({
                ...ponyfillOptions,
                // eslint-disable-next-line no-unused-vars
                onComplete(cssText, node, url) {
                    resolve();
                },
                // eslint-disable-next-line no-unused-vars
                onError(message, node, xhr, url) {
                    reject(message);
                }
            });
        });
    }

    static applyTheme(themeURL) {
        return new Promise((resolve, reject) => {
            if (themeURL === '') {
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

export default ThemeLoader;
