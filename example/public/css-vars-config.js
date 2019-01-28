/* eslint-disable no-console, no-undef */

/**
 * Configures and calls the ponyfill that provides client-side support
 * for CSS custom properties (aka "CSS variables") in legacy and modern browsers (i.e. IE11).
 * For details see: https://www.npmjs.com/package/css-vars-ponyfill
 */
cssVars({
    include: 'style[data-oneui-level], link[data-oneui-level], style',
    onlyLegacy: true,
    onlyVars: true,
    watch: true,
    onBeforeSend: function (xhr, node, url) {
        console.log('onBeforeSend', url);

        document.querySelector('body').style.visibility = 'hidden';

        // Fallback just in case 'cssVars#onComplete' callback will never be invoked for any reason
        setTimeout(function () {
            document.querySelector('body').style.visibility = 'visible';
        }, 1000);
    },
    onSuccess: function (cssText, node, url) {
        console.log('onSuccess', url);
    },
    onWarning: function (message) {
        console.log('onWarning');
        console.log(message);
    },
    onError: function (message, node, xhr, url) {
        console.log('onError');
        console.log(message, node, xhr, url);
    },
    onComplete: function () {
        document.querySelector('body').style.visibility = 'visible';
    }
});
