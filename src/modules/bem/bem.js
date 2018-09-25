import React from 'react'
import { buildBemProps, getFunctionName } from './bemUtils'

const { Provider: ThemeProvider, Consumer } = React.createContext({})

/**
 *
 * @param {React.Component} BemComponent
 * @param {Object} styles
 * @returns {function(*): *}
 */
const bem = (styles) => (BemComponent) => {

    if (!Array.isArray(BemComponent.propsToMods)) {
        console.warn('bem(Component) should have static "propsToMods" property')
    }

    const blockName = getFunctionName(BemComponent)
    const propsToMods = Array.isArray(BemComponent.propsToMods) ? BemComponent.propsToMods : []

    /**
     * Add BemComponent#block method, that produces classNames for blocks
     * @returns {{className: *}}
     */
    BemComponent.prototype.block = function() {
        return buildBemProps(blockName, null, propsToMods, this.props, styles)
    };

    /**
     * Add BemComponent#elem method, that produces classNames for elements of the block
     * @returns {{className: *}}
     */
    BemComponent.prototype.elem = function(elemName) {
        return buildBemProps(blockName, elemName, propsToMods, this.props, styles)
    }

    return (props) => (
        <Consumer>
            {
                (value) => <BemComponent {...props} theme={value || {}} />
            }
        </Consumer>
    );
};

export default bem
export { ThemeProvider }
