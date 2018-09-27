import React from 'react';

const ELEM_SEPARATOR = '__';
const MOD_SEPARATOR = '--';
const VALUE_SEPARATOR = '_';

/**
 * Builds a dictionary of modifiers
 * @param {Object} source
 * @param {Array.<string>} modNames
 * @returns {Object}
 * @private
 */
function buildModsFromObject(source, modNames) {
    return modNames.reduce((result, modNames) => {
        const propValue = source[modNames];

        if (propValue) {
            if (propValue && typeof propValue === 'string') {
                result[modNames] = propValue;
            }

            if (typeof propValue === 'boolean') {
                result[modNames] = true;
            }
        }

        return result;
    }, Object.create(null));
}

/**
 * @param {string} block
 * @param {string|null} elem
 * @param {string} modName
 * @param {string|boolean} modValue
 * @returns {string}
 */
function buildModClassName({ block, elem = null, modName, modValue }) {
    // block, ELEM_SEPARATOR, elem, MOD_SEPARATOR, modName, VALUE_SEPARATOR, modValue
    let result = block;

    if (elem) {
        result += `${ELEM_SEPARATOR}${elem}`;
    }

    result += `${MOD_SEPARATOR}${modName}`;

    if (typeof modValue !== 'boolean') {
        result += `${VALUE_SEPARATOR}${modName}`;
    }

    return result;
}

/**
 * For a block or an element builds a list of class names of modifiers
 * @param {string} block
 * @param {string} [elem]
 * @param {Object} mods
 * @param {Object} styles
 * @returns {Array.<string>}
 */
function modsToClassNames(block, elem = null, mods, styles) {
    return Object.keys(mods)
        .map(modName => {
            const classKey = buildModClassName({ block, elem, modName, modValue: mods[modName] });
            return styles[classKey];
        })
        .filter(className => className);
}

/**
 * Parses function string representation to get function name
 * @param {Function} func
 */
function getFunctionNameFallback(func) {
    const [, functionName] = func.toString().match(/^function\s*([^\s(]+)/);
    return functionName;
}

/**
 * Builds a full list of class names for a block or an element
 * @param {string} block
 * @param {string} [elem]
 * @param {Object} propsToMods
 * @param {Object} stateToMods
 * @param {Object} props
 * @param {Object} styles
 * @returns {string}
 * @public
 */
function buildClassNames({ block, elem = null, props, propsToMods, state, stateToMods, styles }) {
    const blockElemName = elem ? `${block}${ELEM_SEPARATOR}${elem}` : block;
    const modsFromProps = buildModsFromObject(props, propsToMods);
    const modsFromState = buildModsFromObject(state, stateToMods);
    const mods = Object.assign({}, modsFromProps, modsFromState);

    // Base level
    const baseClassName = styles[blockElemName];
    const baseModClassNames = modsToClassNames(block, elem, mods, styles);

    // Restyle level
    const restyle = props.restyle || {};
    const restyleClassName = restyle[blockElemName];
    const restyleModClassNames = modsToClassNames(block, elem, mods, restyle);

    // Theme level
    const themeStyles = props.theme[block] || {};
    const themeClassName = themeStyles[blockElemName];
    const themeModClassNames = modsToClassNames(block, elem, mods, themeStyles);
    const classNames = [
        baseClassName,
        ...baseModClassNames,
        // Product level
        restyleClassName,
        ...restyleModClassNames,
        // Theme level
        themeClassName,
        ...themeModClassNames
    ];

    return classNames.filter(className => className).join(' ');
}

/**
 * Checks if propsToMods and propsToMods are declared correctly
 * @param {Object} source: Object to inspect (props or state)
 * @param {Array.<string>} declaration: List of keys to check
 */
function checkModsDeclaration(block, source, declarations) {
    declarations.forEach(declaration => {
        if (declaration in source === false) {
            // eslint-disable-next-line no-console
            console.warn(
                `BEM component "${block}" prabably has incorrect declaration of "${declaration}"`
            );
        }
    });
}

/**
 * Builds an object of props that will be spreaded through block or elements
 * @param {string} block
 * @param {string} [elem]
 * @param {Object} propsToMods
 * @param {Object} props
 * @param {Object} styles
 * @returns {Array.<string>}
 * @public
 */
export function buildBemProps({
    block,
    elem = null,
    props,
    propsToMods,
    state,
    stateToMods,
    styles
}) {
    // If we deal with a new block, checking propsToMods and stateToMods declarations
    if (process.env.NODE_ENV === 'development' && elem === null) {
        checkModsDeclaration(block, props, propsToMods);
        checkModsDeclaration(block, state, stateToMods);
    }

    let classNames = buildClassNames({
        block,
        elem,
        props,
        propsToMods,
        state,
        stateToMods,
        styles
    });

    // If an element mixed in to the component, add it's className
    if (props.className && elem === null) {
        classNames += ` ${props.className}`;
    }

    if (classNames === '') {
        return Object.create(null);
    }

    return {
        className: classNames
    };
}

export function getFunctionName(func) {
    return func.displayName || func.name || getFunctionNameFallback(func);
}
