import BemPrefixSet from '../BemPrefixSet';

/**
 * @typedef {Object} BemEntity
 * @property {string} block - Block name
 * @property {string|undefined} elem - Elem name
 * @property {string|undefined} mod - Mod name
 * @property {string|undefined} value - Mod value
 */

const BEM_ENTITY_PATTERN = '[a-zA-Z]+[a-zA-Z0-9]*'; // Pattern for matching block name, elem name or modifier name
const BEM_VALUE_PATTERN = '[a-zA-Z0-9]+'; // Pattern for matching modifier's value

export class BemTokensError extends Error {}

export default class BemTokens {
    constructor(tokens) {
        const { block, elem = '', mod = '', value = '' } = tokens;
        BemTokens.validate({ block, elem, mod, value });
        Object.assign(this, { block, elem, mod, value });
    }

    /**
     * @param {BemEntity} tokens
     */
    static validate({ block, elem, mod, value }) {
        if (typeof block !== 'string' || block === '') {
            throw new BemTokensError('block must be a non empty string.');
        }

        if (elem && typeof elem !== 'string') {
            throw new BemTokensError('"elem" must be a string.');
        }

        if (mod && typeof mod !== 'string') {
            throw new BemTokensError('"mod" must be a string.');
        }

        if (value && typeof value !== 'string') {
            throw new BemTokensError('"value" must be a string.');
        }

        // "value" can't be set without "mod"
        if (mod === '' && value !== '') {
            throw new BemTokensError('"value" can be set only when "mod" is also set.');
        }

        // tokens should have proper syntax
        if (block.match(BEM_ENTITY_PATTERN) === null) {
            throw new BemTokensError(
                `block value "${block}" has invalid syntax. Should match ${BEM_ENTITY_PATTERN} pattern.`
            );
        }

        if (elem && elem.match(BEM_ENTITY_PATTERN) === null) {
            throw new BemTokensError(
                `elem value "${elem}" has invalid syntax. Should match ${BEM_VALUE_PATTERN} pattern.`
            );
        }

        if (mod && mod.match(BEM_ENTITY_PATTERN) === null) {
            throw new BemTokensError(
                `mod value "${elem}" has invalid syntax. Should match ${BEM_ENTITY_PATTERN} pattern.`
            );
        }

        if (value && value.match(BEM_VALUE_PATTERN) === null) {
            throw new BemTokensError(
                `value "${value}" has invalid syntax. Should match ${BEM_VALUE_PATTERN} pattern.`
            );
        }
    }

    /**
     * @returns {RegExp} - Pattern for matching and parsing a BEM classname
     */
    static createClassNamePattern(prefixes) {
        const { elem, mod, value } = prefixes;
        const pattern = new RegExp(
            `^(${BEM_ENTITY_PATTERN})` +
                `(${elem}${BEM_ENTITY_PATTERN})?` +
                `(${mod}${BEM_ENTITY_PATTERN})?` +
                `(${value}${BEM_VALUE_PATTERN})?$`
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
            throw new BemTokensError(`BEM classname '${className}' has invalid syntax.`);
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
