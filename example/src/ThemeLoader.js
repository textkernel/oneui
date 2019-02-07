import cssVarsPonyfill from 'css-vars-ponyfill';

const THEME_URL_PARAM ='themeId';
const THEME_CDN_URL   = './';

class ThemeLoader {


    static load() {

        return Promise.all([
            ThemeLoader.applyThemeIfExists(),
            ThemeLoader.startCssVarsPonyfill(),
        ]);

    }


    /**
     * Loads the CSS ponyfill.
     *
     * In case the property `onlyLegacy` is set to true, it will run only in legacy browsers like IE11.
     * For test purposes, it's set to true, so can be tested on modern browsers.
     */
    static startCssVarsPonyfill() {

        return new Promise((resolve, reject) => {

            cssVarsPonyfill({
                onlyLegacy: false,
                onlyVars: true,
                watch: true,
                onComplete: function (cssText, node, url) {
                    resolve();
                },
                onError: function (message, node, xhr, url) {
                    reject(message);
                }
            });

        });
    }


    /**
     * Get the parameter `themeId` from the URL in case if it exists, and append
     * it in a `link` element in the DOM
     */
    static applyThemeIfExists() {

        return new Promise((resolve, reject) => {

            const queryString = window.location.search.substr(1);

            if (queryString === '') resolve();

            queryString.split('&').forEach((item) => {

                const queryParam = item.split('=');

                if (queryParam[0] === THEME_URL_PARAM) {
                    const styleElement= document.createElement('link');
                    styleElement.type = 'text/css';
                    styleElement.rel = 'stylesheet';
                    styleElement.href = `${THEME_CDN_URL}${queryParam[1]}`;
                    styleElement.onload = () => resolve();
                    styleElement.onerror = () => reject();

                    const head = document.getElementsByTagName('head')[0]
                    head.appendChild(styleElement);
                }

            });

        });

    }


}


export default ThemeLoader;
