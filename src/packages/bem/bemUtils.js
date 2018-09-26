import React from 'react'
import classnames from 'classnames'

const ELEM_SEPARATOR = '__'
const MOD_SEPARATOR = '--'
const VALUE_SEPARATOR = '_'

/**
 * Builds a dictionary of modifiers
 * @param {Object} propsToMods
 * @param {Object} props
 * @returns {Object}
 * @private
 */
function buildMods(props, propsToMods) {

    return propsToMods.reduce(
        (result, propName) => {

            const propValue = props[propName];

            if (propValue) {

                if (propValue && (typeof propValue === 'string')) {
                    result[propName] = propValue
                }

                if (typeof propValue === 'boolean') {
                    result[propName] = true
                }

            }

            return result
        },
        Object.create(null)
    );
}

function buildModClassName({ block, elem = null, modName, modValue }) {
    // block, ELEM_SEPARATOR, elem, MOD_SEPARATOR, modName, VALUE_SEPARATOR, modValue

    if (elem) {
        return [
            block,
            ELEM_SEPARATOR,
            elem,
            MOD_SEPARATOR,
            modName,
            ...(
                typeof modValue === 'boolean' ? [] : [ VALUE_SEPARATOR, modValue, ]
            ),
        ].join('');
    }

    return  [
        block,
        MOD_SEPARATOR,
        modName,
        ...(
            typeof modValue === 'boolean' ? [] : [ VALUE_SEPARATOR, modValue, ]
        ),
    ].join('');
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
        .map(
            (modName) => {
                const classKey = buildModClassName({ block, elem, modName, modValue: mods[modName] })
                return styles[classKey]
            }
        )
        .filter(className => className)
}

/**
 * Parses function string representation to get function name
 * @param {Function} func
 */
function getFunctionNameFallback(func) {
    const [ , functionName ] = func.toString().match(/^function\s*([^\s(]+)/)
    return functionName
}


/**
 * Builds a full list of class names for a block or an element
 * @param {string} block
 * @param {string} [elem]
 * @param {Object} propsToMods
 * @param {Object} props
 * @param {Object} styles
 * @returns {string}
 * @public
 */
function buildClassNames(block, elem = null, propsToMods, props, styles) {

    const blockElemName = elem ? `${block}${ELEM_SEPARATOR}${elem}` : block
    const mods = buildMods(props, propsToMods)

    // Base level
    const baseClassName = styles[blockElemName]
    const baseModClassNames = modsToClassNames(block, elem, mods, styles)

    // Restyle level
    const restyle =  props.restyle || {}
    const restyleClassName = restyle[blockElemName]
    const restyleModClassNames = modsToClassNames(block, elem, mods, restyle)

    // Theme level
    const themeStyles = props.theme[block] || {}
    const themeClassName = themeStyles[blockElemName]
    const themeModClassNames = modsToClassNames(block, elem, mods, themeStyles)

    return classnames(
        // Own level
        baseClassName,
        ...baseModClassNames,
        // Product level
        restyleClassName,
        ...restyleModClassNames,
        // Theme level
        themeClassName,
        ...themeModClassNames
    )
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
export function buildBemProps(block, elem = null, propsToMods, props, styles) {

    let classNames = buildClassNames(block, elem, propsToMods, props, styles);

    // If an element mixed in to the component, add it's className
    if (props.className && elem === null) {
      classNames += ` ${props.className}`
    }

    if (classNames === '') {
        return Object.create(null)
    }

    return {
        className: classNames
    }
}

export function getFunctionName(func) {
    return func.displayName || func.name || getFunctionNameFallback(func)
}
