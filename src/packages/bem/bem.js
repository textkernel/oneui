import React from 'react';
import { buildBemProps, getFunctionName, isBlockDecl } from './bemUtils';

/**
 * CSS modules classnames map
 * @typedef {Object.<string, string>} ClassnamesMap
 */

/**
 * List of mods names
 * @typedef {Array.<string>} ModsList
 */

/**
 * BlockDecl
 * @typedef {Object} BlockDecl
 * @property {string} name - Block name
 * @property {ClassnamesMap} classnames - Classnames map
 * @property {ModsList} propsToMods - List of prop names that affects classnames
 */

/**
 * Decorates stateful react component with BEM methods
 * @param {ClassnamesMap} classnamesMap
 * @returns {Function}
 */
function bemStateful(classnamesMap) {
    /**
     * @param {Component} BemComponent - Class based statefull react component
     * @returns {Function} - Decorated react component
     */
    return function bemStatefulClosure(StatefulBemComponent) {
        const blockName = getFunctionName(StatefulBemComponent);
        const propsToMods = Array.isArray(StatefulBemComponent.propsToMods)
            ? StatefulBemComponent.propsToMods
            : [];
        const stateToMods = Array.isArray(StatefulBemComponent.stateToMods)
            ? StatefulBemComponent.stateToMods
            : [];

        /**
         * Add StatefulBemComponent#block method, that produces classNames for blocks
         * @returns {BEMClassNames}
         */
        // eslint-disable-next-line no-param-reassign
        StatefulBemComponent.prototype.block = function block(extraMods = {}) {
            return buildBemProps({
                block: blockName,
                elem: null,
                props: this.props,
                propsToMods,
                state: this.state,
                stateToMods,
                extraMods,
                classnamesMap
            });
        };

        /**
         * Add StatefulBemComponent#elem method, that produces classNames for elements of the block
         * @returns {BEMClassNames}
         */
        // eslint-disable-next-line no-param-reassign
        StatefulBemComponent.prototype.elem = function elem(elemName, extraMods = {}) {
            return buildBemProps({
                block: blockName,
                elem: elemName,
                props: this.props,
                propsToMods,
                state: this.state,
                stateToMods,
                extraMods,
                classnamesMap
            });
        };

        return StatefulBemComponent;
    };
}

/**
 * Decorates stateless react component with BEM methods
 * @param {BlockDecl} blockDecl - Block declaration in case of statless usage.
 * @returns {{ block: Function, elem: Function }}
 */
function bemStateless(blockDecl) {
    const { name, classnames, propsToMods } = blockDecl;
    return {
        block: (props, extraMods = {}) => {
            if (!props) {
                throw new TypeError('block(props) should be called with props as an argument');
            }
            return buildBemProps({
                block: name,
                elem: null,
                props,
                propsToMods,
                extraMods,
                classnamesMap: classnames
            });
        },
        elem: (elemName, props, extraMods = {}) => {
            if (!elemName || !props) {
                throw new TypeError(
                    'elem(elemName, props) should be called with elem name and props as an arguments'
                );
            }
            return buildBemProps({
                block: name,
                elem: elemName,
                props,
                propsToMods,
                extraMods,
                classnamesMap: classnames
            });
        }
    };
}

/**
 * Decorates react component with BEM methods
 * @param {ClassnamesMap|BlockDecl} args – Classnames map in case of usage with stateful componens.
 *       Block declaration in case of statless usage.
 * @returns {Function}
 */
export default function bem(args) {
    // bem was called as a in stateless mode
    if (isBlockDecl(args)) {
        const { name, classnames, propsToMods } = args;
        return bemStateless({ name, classnames, propsToMods });
    }

    // Otherwise be called in stateful mode
    /**
     * @param {Component} BemComponent - React component
     * @returns {Function} - Decorated react component
     */
    return function bemClosure(BemComponent) {
        const classnamesMap = args;

        if (
            BemComponent.prototype instanceof React.Component === false &&
            BemComponent.prototype instanceof React.PureComponent === false
        ) {
            throw new TypeError(
                'bem(classnames)(Component) should be called with class based react component'
            );
        }

        return bemStateful(classnamesMap)(BemComponent);
    };
}
