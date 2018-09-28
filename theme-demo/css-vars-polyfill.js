import cssVars from 'css-vars-ponyfill'

cssVars({
    include: 'style[data-nice-level], link[data-nice-level]',
    onlyLegacy: true,
    onlyVars: true,
    watch: true,
    onBeforeSend(xhr, node, url) {

        console.log('onBeforeSend', url)

        document.querySelector('body').style.visibility = 'hidden'

        // Fallback just in case 'cssVars#onComplete' callback will never be invoked for any reason
        setTimeout(
            () => document.querySelector('body').style.visibility = 'visible',
            1000
        )

    },
    onSuccess(cssText, node, url) {
        console.log('onSuccess', url)
    },
    onWarning(message) {
        console.log('onWarning')
        console.log({ message })
    },
    onError(message, node, xhr, url) {
        console.log('onError')
        console.log({ message, node, xhr, url })
    },
    onComplete(cssText, styleNode) {
        document.querySelector('body').style.visibility = 'visible'
    }
});
