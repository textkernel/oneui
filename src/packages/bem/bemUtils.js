/**
 * Element prefix
 * @type {string}
 */
const ELEM_SEPARATOR = '__';

/**
 * Modifyer prefix
 * @type {string}
 */
const MOD_SEPARATOR = '--';

/**
 * Modifyer's value prefix
 * @type {string}
 */
const VALUE_SEPARATOR = '_';

/**
 * Object that represents modifyers dictionary (basically, props or state from a component)
 * @typedef {Object.<string, string|number|boolean>} ModDict
 */

/**
 * BEMClassNames
 * @typedef {Object} BEMClassNames
 * @property {string} [className] - Space separates list of class names
 */

/**
 * Filters and builds a dictionary of modifiers
 * @param {ModDict} source
 * @param {ModsList} modNames
 * @returns {ModDict}
 * @private
 */
function buildModsFromObject(source, modNames) {
    // eslint-disable-next-line no-shadow
    return modNames.reduce((result, modNames) => {
        const propValue = source[modNames];

        if (propValue) {
            if (propValue && (typeof propValue === 'string' || typeof propValue === 'number')) {
                result[modNames] = propValue; // eslint-disable-line no-param-reassign
            }

            if (typeof propValue === 'boolean') {
                result[modNames] = true; // eslint-disable-line no-param-reassign
            }
        }

        return result;
    }, Object.create(null));
}

/**
 * @param {string} block
 * @param {string|null} elem
 * @param {string} modName
 * @param {string|number|boolean} modValue
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
        result += `${VALUE_SEPARATOR}${modValue}`;
    }

    return result;
}

/**
 * For a block or an element builds a list of class names of modifiers
 * @param {string} block - Block name
 * @param {string} [elem] - Elem name
 * @param {ModDict} – Object that represents mods (props or state)
 * @param {ClassnamesMap} classnamesMap – css modules classnames map
 * @returns {ClassnamesMap}
 */
function modsToClassNames(block, elem = null, mods, classnamesMap) {
    const classNames = [];
    Object.keys(mods).forEach(modName => {
        const modValue = mods[modName];

        // Process numeric and string mods
        if (typeof modValue === 'string' || typeof modValue === 'number') {
            // Checking if we should produce a "wildcard" class name for the current modifier
            // E.g. Component--size
            const wildcardClassKey = buildModClassName({ block, elem, modName, modValue: true });
            if (classnamesMap[wildcardClassKey]) {
                classNames.push(classnamesMap[wildcardClassKey]);
            }

            // Checking if there is specific class name defined
            // E.g. Component--size_2
            const classKey = buildModClassName({ block, elem, modName, modValue });
            if (classnamesMap[classKey]) {
                classNames.push(classnamesMap[classKey]);
            }
        }

        // Process boolean mods
        if (typeof modValue === 'boolean' && modValue === true) {
            const classKey = buildModClassName({ block, elem, modName, modValue });
            if (classnamesMap[classKey]) {
                classNames.push(classnamesMap[classKey]);
            }
        }
    });

    return classNames;
}

/**
 * Parses function string representation to get function name
 * @param {Function} func
 * @returns {string} – Function name
 */
function getFunctionNameFallback(func) {
    const [, functionName] = func.toString().match(/^function\s*([^\s(]+)/);
    return functionName;
}

/**
 * Builds a full list of class names for a block or an element
 * @param {string} block – Block name
 * @param {string} [elem] – Elem name
 * @param {ModDict} props - All props from a component
 * @param {ModsList} propsToMods - List of props properties to use for class generation
 * @param {ModDict} state - All state from a component
 * @param {ModsList} stateToMods - List of state properties to use for class generation
 * @param {ModDict} extraMods - Extra mods that are not related to props or state
 * @param {ClassnamesMap} classnamesMap - css modules classnames map
 * @returns {string}
 * @public
 */
function buildClassNames({
    block,
    elem = null,
    props,
    propsToMods,
    state,
    stateToMods,
    extraMods,
    classnamesMap
}) {
    const blockElemName = elem ? `${block}${ELEM_SEPARATOR}${elem}` : block;
    const modsFromProps = buildModsFromObject(props, propsToMods);
    const modsFromState = buildModsFromObject(state, stateToMods);

    // Todo: check that modsFromProps, modsFromState, extraMods don't have any intersections
    const mods = Object.assign({}, modsFromProps, modsFromState, extraMods);

    // Base level
    const baseClassName = classnamesMap[blockElemName];
    const baseModClassNames = modsToClassNames(block, elem, mods, classnamesMap);
    const classNames = [baseClassName, ...baseModClassNames];

    return classNames.filter(className => className).join(' ');
}

/**
 * Checks if propsToMods and propsToState are declared correctly
 * @param {string} block - Block name
 * @param {ModDict} source - Object to inspect (props or state)
 * @param {ModsList} declaration - List of keys to check
 * @returns {void}
 */
function checkModsDeclaration(block, source, declarations) {
    declarations.forEach(declaration => {
        if (declaration in source === false) {
            // eslint-disable-next-line no-console
            console.warn(
                `BEM component "${block}" probably has incorrect declaration of "${declaration}"`
            );
        }
    });
}

/**
 * Tells if args has a shape of BlockDecl
 * @param {Object} args – Arbitrary object to check
 * @returns {}
 * @public
 */
export function isBlockDecl(args) {
    return typeof args.name === 'string' && args.name !== '' && typeof args.classnames === 'object';
}

/**
 * Builds an object of props that will be spreaded through block or elements
 * @param {string} block
 * @param {string} [elem]
 * @param {ModDict} [props]
 * @param {ModsList} [propsToMods]
 * @param {ModDict} [state]
 * @param {ModsList} [stateToMods]
 * @param {ModDict} [extraMods]
 * @param {ClassnamesMap} classnamesMap
 * @returns {BEMClassNames}
 * @public
 */
export function buildBemProps({
    block,
    elem = null,
    props = {},
    propsToMods = [],
    state = {},
    stateToMods = [],
    extraMods = {},
    classnamesMap
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
        extraMods,
        classnamesMap
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
