import BemDelimiters from '../BemDelimiters';

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
     * @private
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

        const bemEntityPattern = new RegExp(`^${BEM_ENTITY_PATTERN}$`);
        const bemValuePattern = new RegExp(`^${BEM_VALUE_PATTERN}$`);

        // tokens should have proper syntax
        if (block.match(bemEntityPattern) === null) {
            throw new BemTokensError(
                `block value "${block}" has invalid syntax. Should match ${BEM_ENTITY_PATTERN} pattern.`
            );
        }

        if (elem && elem.match(bemEntityPattern) === null) {
            throw new BemTokensError(
                `elem value "${elem}" has invalid syntax. Should match ${BEM_VALUE_PATTERN} pattern.`
            );
        }

        if (mod && mod.match(bemEntityPattern) === null) {
            throw new BemTokensError(
                `mod value "${elem}" has invalid syntax. Should match ${BEM_ENTITY_PATTERN} pattern.`
            );
        }

        if (value && value.match(bemValuePattern) === null) {
            throw new BemTokensError(
                `value "${value}" has invalid syntax. Should match ${BEM_VALUE_PATTERN} pattern.`
            );
        }
    }

    /**
     * @returns {RegExp} - Pattern for matching and parsing a BEM classname
     * @private
     */
    static createClassNamePattern(delimiters) {
        const { elem, mod, value } = delimiters;
        const pattern = new RegExp(
            `^(${BEM_ENTITY_PATTERN})` +
                `(${elem}${BEM_ENTITY_PATTERN})?` +
                `(${mod}${BEM_ENTITY_PATTERN})?` +
                `(${value}${BEM_VALUE_PATTERN})?$`
        );
        return pattern;
    }

    /**
     * @param {string} value - Value to be stripped from a delimiter
     * @param {string} delimiter - Delimiter
     * @returns {string} - Stripped value
     * @private
     */
    static stripDelimiter(value, delimiter) {
        if (typeof value !== 'string') return '';
        if (value.startsWith(delimiter)) {
            return value.replace(delimiter, '');
        }
        return value;
    }

    /**
     * @param {string} className
     * @private
     */
    static validateClassName(className) {
        if (typeof className !== 'string') {
            throw new BemTokensError('BEM classname shoud be a string');
        }
        if (className === '') {
            throw new BemTokensError('BEM classname shoud not be empty');
        }
    }

    /**
     *
     * @param {string} className
     * @param {Object.<string, string>} delimiters
     * @public
     */
    static from(className = '', delimiters = {}) {
        BemTokens.validateClassName(className);
        const bemDelimiters = new BemDelimiters(delimiters);
        const classNamePattern = BemTokens.createClassNamePattern(bemDelimiters);
        const match = className.match(classNamePattern);
        if (match === null) {
            throw new BemTokensError(`BEM classname '${className}' has invalid syntax.`);
        }
        const [, block, elem, mod, value] = match;
        return new BemTokens({
            block,
            elem: BemTokens.stripDelimiter(elem, bemDelimiters.elem),
            mod: BemTokens.stripDelimiter(mod, bemDelimiters.mod),
            value: BemTokens.stripDelimiter(value, bemDelimiters.value)
        });
    }
}
