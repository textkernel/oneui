import cssVarsPonyfill from 'css-vars-ponyfill';

const THEME_URL_PARAM ='themeId';
const THEME_CDN_URL   = './';


class ThemeLoader {

    static load() {

        return new Promise(((resolve, reject) => {
            ThemeLoader.startCssVarsPonyfill();
            ThemeLoader.applyThemeIfExists();
            resolve();
        }));

    }


    static applyThemeIfExists() {
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

    }


    static startCssVarsPonyfill() {

        cssVarsPonyfill({
            onlyLegacy: false, // False, so we can use it on Chrome for test
            onlyVars: true,
            watch: true,
            onBeforeSend: function (xhr, node, url) {
                console.log('onBeforeSend', url);
            },
            onSuccess: function (cssText, node, url) {
                console.log('onSuccess', url);
            },
            onError: function (message, node, xhr, url) {
                console.log('onError');
                console.log(message, node, xhr, url);
            },
        });

    }


};


export default ThemeLoader;
