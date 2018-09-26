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

    const blockName = getFunctionName(BemComponent)
    const propsToMods = Array.isArray(BemComponent.propsToMods) ? BemComponent.propsToMods : []
    const stateToMods = Array.isArray(BemComponent.stateToMods) ? BemComponent.stateToMods : []

    /**
     * Add BemComponent#block method, that produces classNames for blocks
     * @returns {{className: *}}
     */
    BemComponent.prototype.block = function() {
        return buildBemProps({
            block: blockName,
            elem: null,
            props: this.props,
            propsToMods,
            state: this.state,
            stateToMods,
            styles,
        })
    };

    /**
     * Add BemComponent#elem method, that produces classNames for elements of the block
     * @returns {{className: *}}
     */
    BemComponent.prototype.elem = function(elemName) {
        return buildBemProps({
            block: blockName,
            elem: elemName,
            props: this.props,
            propsToMods,
            state: this.state,
            stateToMods,
            styles,
        })
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
