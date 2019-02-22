import BemPrefixSet from '../BemPrefixSet';

/**
 * @typedef {Object} BemEntity
 * @property {string} block - Block name
 * @property {string|undefined} elem - Elem name
 * @property {string|undefined} mod - Mod name
 * @property {string|undefined} value - Mod value
 */

export class BemTokensError extends Error {}

export default class BemTokens {
    constructor(tokens) {
        const { block, elem, mod, value } = tokens;
        Object.assign(this, { block, elem, mod, value });
    }

    /**
     * @returns {RegExp} - Pattern for matching and parsing a BEM classname
     */
    static createClassNamePattern(prefixes) {
        const bemEntityPattern = '[a-zA-Z]+[a-zA-Z0-9]*'; // Pattern for matching block name, elem name or modifier name
        const valuePattern = '[a-zA-Z0-9]+'; // Pattern for matching modifier's value
        const { elem, mod, value } = prefixes;
        const pattern = new RegExp(
            `^(${bemEntityPattern})` +
                `(${elem}${bemEntityPattern})?` +
                `(${mod}${bemEntityPattern})?` +
                `(${value}${valuePattern})?$`
        );
        return pattern;
    }

    /**
     * @param {string} value - Value to be stripped from a prefix
     * @param {string} prefix - Prefix
     * @returns {string} - Stripped value
     */
    static stripPrefix(value, prefix) {
        if (typeof value !== 'string') return '';
        if (value.startsWith(prefix)) {
            return value.replace(prefix, '');
        }
        return value;
    }

    static validateClassName(className) {
        if (typeof className !== 'string') {
            throw new BemTokensError('BEM classname shoud be a string');
        }
        if (className === '') {
            throw new BemTokensError('BEM classname shoud not be empty');
        }
    }

    static from(className = '', prefixes = {}) {
        BemTokens.validateClassName(className);
        const prefixSet = new BemPrefixSet(prefixes);
        const classNamePattern = BemTokens.createClassNamePattern(prefixSet);
        const match = className.match(classNamePattern);
        if (match === null) {
            throw new BemTokensError(`BEM classname '${className}' has invalid syntax or empty`);
        }
        const [, block, elem, mod, value] = match;
        return new BemTokens({
            block,
            elem: BemTokens.stripPrefix(elem, prefixSet.elem),
            mod: BemTokens.stripPrefix(mod, prefixSet.mod),
            value: BemTokens.stripPrefix(value, prefixSet.value)
        });
    }
}
