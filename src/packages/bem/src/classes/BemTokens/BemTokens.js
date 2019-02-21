/**
 * @typedef {Object} BemEntity
 * @property {string} block - Block name
 * @property {string|undefined} elem - Elem name
 * @property {string|undefined} mod - Mod name
 * @property {string|undefined} value - Mod value
 */

export class BEMTokensError extends Error {}

export default class BEMTokens {
    /**
     * @type {Object}
     */
    static DEFAULT_SEPARATORS = {
        elemSeparator: '__',
        modSeparator: '--',
        valueSeparator: '_'
    };

    constructor(tokens) {
        const { block, elem, mod, value } = tokens;
        Object.assign(this, { block, elem, mod, value });
    }

    /**
     * @returns {RegExp} - Pattern for matching and parsing a BEM classname
     */
    static createClassNamePattern(separators) {
        const bemEntityPattern = '[a-zA-Z]+[a-zA-Z0-9]*'; // Pattern for matching block name, elem name or modifier name
        const valuePattern = '[a-zA-Z0-9]+'; // Pattern for matching modifier's value
        const { elemSeparator, modSeparator, valueSeparator } = separators;
        const pattern = new RegExp(
            `^(${bemEntityPattern})` +
                `(${elemSeparator}${bemEntityPattern})?` +
                `(${modSeparator}${bemEntityPattern})?` +
                `(${valueSeparator}${valuePattern})?$`
        );
        return pattern;
    }

    /**
     * @param {string} value - Value to be stripped from a prefix
     * @param {string} prefix - Prefix
     * @returns {string} - Stripped value
     */
    static stripPrefix(value, prefix) {
        if (value.startsWith(prefix)) {
            return value.replace(prefix, '');
        }
        return value;
    }

    static validateClassName(className) {
        if (typeof className !== 'string') {
            throw new BEMTokensError('BEN classname shoud be a string');
        }
        if (className === '') {
            throw new BEMTokensError('BEN classname shoud not be empty');
        }
    }

    static validateSeparators(separators) {
        const allowedTypes = ['elemSeparator', 'modSeparator', 'valueSeparator'];
        const separatorPattern = /[_-]+/;
        Object.keys(separators).forEach(separatorType => {
            // Validating keys
            if (allowedTypes.includes[separatorType] === false) {
                throw new TypeError(
                    `BEM separators declaration includes unknown property '${separatorType}'. ` +
                        `Allowed values are ${allowedTypes.join(', ')}.`
                );
            }

            // Validating values
            const separatorValue = separators[separatorType];
            const separatorValueMatch = separatorValue.match(separatorPattern);
            if (separatorValueMatch === null) {
                throw new TypeError(
                    `BEM ${separatorType} has invalid value: '${separatorValue}'. It contains invalid characters or it is empty.`
                );
            }
        });
    }

    static from(className, separators = BEMTokens.DEFAULT_SEPARATORS) {
        BEMTokens.validateClassName(className);
        BEMTokens.validateSeparators(separators);
        const classNamePattern = BEMTokens.createClassNamePattern(separators);
        const match = className.match(classNamePattern);
        if (match === null) {
            throw TypeError(`BEM classname '${className}' has invalid syntax or empty`);
        }
        const [, block, elem, mod, value] = match;
        return new BEMTokens({
            block,
            elem: BEMTokens.stripPrefix(elem, separators.elem),
            mod: BEMTokens.stripPrefix(mod, separators.mod),
            value: BEMTokens.stripPrefix(value, separators.value)
        });
    }
}
