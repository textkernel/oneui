import cssVarsPonyfill from 'css-vars-ponyfill';
import { OneUI } from '../OneUI';

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
            value: ieUserAgent,
            configurable: true,
        });

        OneUI.applyCssVarsPonyfill();

        expect(cssVarsPonyfill).toBeCalledTimes(1);
    });

    it('should not load the ponyfill if browser is different than IE11', () => {
        const chromeUserAgent =
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36';

        Object.defineProperty(window.navigator, 'userAgent', {
            value: chromeUserAgent,
            configurable: true,
        });

        OneUI.applyCssVarsPonyfill();

        expect(cssVarsPonyfill).toBeCalledTimes(0);
    });

    it('should apply theme and start ponyfill on init', () => {
        const themeURL = 'http://theme-cdn.com/mytheme.css';
        const ponyfillOptions = { onlyLegacy: false };

        const mockedApplyTheme = jest.spyOn(OneUI, 'applyTheme');
        const mockedApplyCssVarsPonyfill = jest.spyOn(OneUI, 'applyCssVarsPonyfill');

        mockedApplyTheme.mockImplementation(() => Promise.resolve());
        mockedApplyCssVarsPonyfill.mockImplementation(() => Promise.resolve());

        OneUI.init({ themeURL, ponyfillOptions });

        expect(mockedApplyTheme).toBeCalledWith(themeURL);
        expect(mockedApplyCssVarsPonyfill).toBeCalledWith(ponyfillOptions);

        mockedApplyTheme.mockRestore();
        mockedApplyCssVarsPonyfill.mockRestore();
    });

    it('should not attach link element in the DOM when themeURL is not provided', () => {
        const themeURL = null;

        const documentHead = '<meta charset="utf-8">s';
        document.head.innerHTML = documentHead;

        OneUI.applyTheme(themeURL);

        expect(document.head.innerHTML).toEqual(documentHead);
    });

    it('should call the onComplete callback function when ponyfill is loaded', () => {
        cssVarsPonyfill.mockImplementationOnce(ponyfillOptions =>
            setTimeout(ponyfillOptions.onComplete, 10)
        );

        const ieUserAgent = 'Mozilla/5.0(Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        Object.defineProperty(window.navigator, 'userAgent', {
            value: ieUserAgent,
            configurable: true,
        });

        const ponyfillOptions = {
            onComplete: jest.fn(),
        };

        return OneUI.applyCssVarsPonyfill(ponyfillOptions).then(() => {
            expect(ponyfillOptions.onComplete).toBeCalledTimes(1);
        });
    });

    it('should call the onError callback function when ponyfill isnt loaded', () => {
        cssVarsPonyfill.mockImplementationOnce(ponyfillOptions =>
            setTimeout(ponyfillOptions.onError, 10)
        );

        const ieUserAgent = 'Mozilla/5.0(Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        Object.defineProperty(window.navigator, 'userAgent', {
            value: ieUserAgent,
            configurable: true,
        });

        const ponyfillOptions = {
            onError: jest.fn(),
        };

        return OneUI.applyCssVarsPonyfill(ponyfillOptions).catch(() => {
            expect(ponyfillOptions.onError).toBeCalledTimes(1);
        });
    });
});
