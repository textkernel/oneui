import cssVarsPonyfill from 'css-vars-ponyfill';
import OneUI from '../OneUI';

jest.mock('css-vars-ponyfill');

describe('OneUI loader that starts the ponyfill and attach the theme to DOM', () => {
    it('should attach <link> element with theme URL to DOM tree', () => {
        const themeURL = 'http://theme-cdn.com/mytheme.css';
        document.body.innerHTML = '<head></head>';

        OneUI.applyTheme(themeURL);

        expect(document.getElementsByTagName('link')[0].href).toBe(themeURL);
    });

    it('should load the ponyfill if browser is IE11', () => {
        const ieUserAgent = 'Mozilla/5.0(Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        Object.defineProperty(window.navigator, 'userAgent', {
            get: () => ieUserAgent
        });

        OneUI.startCssVarsPonyfill();

        expect(cssVarsPonyfill).toBeCalledTimes(1);
    });

    it('should apply theme and start ponyfill on init', () => {
        const themeURL = 'http://theme-cdn.com/mytheme.css';
        const ponyfillOptions = { onlyLegacy: false };

        OneUI.applyTheme = jest.fn();
        OneUI.startCssVarsPonyfill = jest.fn();

        OneUI.init({ themeURL, ponyfillOptions });

        expect(OneUI.applyTheme).toBeCalledWith(themeURL);
        expect(OneUI.startCssVarsPonyfill).toBeCalledWith(ponyfillOptions);
    });
});
