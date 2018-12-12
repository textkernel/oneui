import React from 'react';
import { buildBemProps, getFunctionName } from './bemUtils';

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
        StatefulBemComponent.prototype.block = function block() {
            return buildBemProps({
                block: blockName,
                elem: null,
                props: this.props,
                propsToMods,
                state: this.state,
                stateToMods,
                classnamesMap
            });
        };

        /**
         * Add StatefulBemComponent#elem method, that produces classNames for elements of the block
         * @returns {BEMClassNames}
         */
        // eslint-disable-next-line no-param-reassign
        StatefulBemComponent.prototype.elem = function elem(elemName) {
            return buildBemProps({
                block: blockName,
                elem: elemName,
                props: this.props,
                propsToMods,
                state: this.state,
                stateToMods,
                classnamesMap
            });
        };

        return StatefulBemComponent;
    };
}

/**
 * Decorates stateless react component with BEM methods
 * @param {ClassnamesMap} classnamesMap
 * @returns {Function}
 */
function bemStateless(classnamesMap) {
    /**
     * @param {Component} StatelessBEMComponent - Function based stateless react component
     * @returns {Function} - Decorated react component
     */
    return function bemStatelessClosure(StatelessBEMComponent) {
        const blockName = getFunctionName(StatelessBEMComponent);
        const propsToMods = Array.isArray(StatelessBEMComponent.propsToMods)
            ? StatelessBEMComponent.propsToMods
            : [];

        return props => {
            const propsWithBEMTaste = {
                ...props,
                block: () =>
                    buildBemProps({
                        block: blockName,
                        elem: null,
                        props,
                        propsToMods,
                        classnamesMap
                    }),
                elem: elemName =>
                    buildBemProps({
                        block: blockName,
                        elem: elemName,
                        props,
                        propsToMods,
                        classnamesMap
                    })
            };

            return <StatelessBEMComponent {...propsWithBEMTaste} />;
        };
    };
}

/**
 * Decorates react component with BEM methods
 * @param {ClassnamesMap} classnamesMap
 * @returns {Function}
 */
export default function bem(classnamesMap) {
    /**
     * @param {Component} BemComponent - React component
     * @returns {Function} - Decorated react component
     */
    return function bemClosure(BemComponent) {
        if (BemComponent.prototype instanceof React.Component) {
            return bemStateful(classnamesMap)(BemComponent);
        }
        return bemStateless(classnamesMap)(BemComponent);
    };
}
