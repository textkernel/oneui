import cssVarsPonyfill from 'css-vars-ponyfill';

const THEME_URL_PARAM ='themeId';
const THEME_CDN_URL   = './';

class ThemeLoader {

    static load() {

        return new Promise(((resolve, reject) => {


            /**
             * Get the parameter `themeId` from the URL in case if it exists, and append
             * it in a `link` element in the DOM
             */
            const applyThemeIfExists = () => {

                const queryString = window.location.search.substr(1);

                if (queryString === '') return;

                queryString.split('&').forEach((item) => {

                    const queryParam = item.split('=');

                    if (queryParam[0] === THEME_URL_PARAM) {
                        const styleElement= document.createElement('link');
                        styleElement.type = 'text/css';
                        styleElement.rel = 'stylesheet';
                        styleElement.href = `${THEME_CDN_URL}${queryParam[1]}`;

                        const head = document.getElementsByTagName('head')[0]
                        head.appendChild(styleElement);
                    }

                });

            };

            /**
             * Loads the CSS ponyfill.
             *
             * In case the property `onlyLegacy` is set to true, it will run only in legacy browsers like IE11.
             * For test purposes, it's set to true, so can be tested on modern browsers.
             */
            const startCssVarsPonyfill = () => {
                cssVarsPonyfill({
                    onlyLegacy: false,
                    onlyVars: true,
                    watch: true,
                    onComplete: function (cssText, node, url) {
                        resolve();
                    },
                    onError: function (message, node, xhr, url) {
                        console.log(message, node, xhr, url);
                    },
                });

            };

            startCssVarsPonyfill();
            applyThemeIfExists();

        }));
    }
}


export default ThemeLoader;
