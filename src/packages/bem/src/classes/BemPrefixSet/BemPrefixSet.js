/**
 * @typedef {Object} BemPrefixDict
 * @property {string} elem - Elem name
 * @property {string} mod - Mod name
 * @property {string} value - Mod value
 */

/**
 * @type {Array.<string>}
 */
const ALLOWED_PREFIX_NAMES = ['elem', 'mod', 'value'];

/**
 * @type {RegExp}
 */
const PREFIX_PATTERN = /[_-]+/;

/**
 * @type {string}
 */
const DEFAULT_ELEM_PREFIX = '__';

/**
 * @type {string}
 */
const DEFAULT_MOD_PREFIX = '--';

/**
 * @type {string}
 */
const DEFAULT_VALUE_PREFIX = '_';

export class BemPrefixSetError extends Error {}

export default class BemPrefixSet {
    constructor({
        elem = DEFAULT_ELEM_PREFIX,
        mod = DEFAULT_MOD_PREFIX,
        value = DEFAULT_VALUE_PREFIX
    }) {
        BemPrefixSet.validate({ elem, mod, value });
        Object.assign(this, { elem, mod, value });
    }

    /**
     * @param {BemPrefixSet} prefixSet
     * @throws {BemPrefixSetError}
     */
    static validate(prefixSet) {
        Object.keys(prefixSet).forEach(prefixName => {
            // Validating keys
            if (ALLOWED_PREFIX_NAMES.includes[prefixName] === false) {
                throw new TypeError(
                    `BEM prefixes declaration includes unknown property '${prefixName}'. ` +
                        `Allowed values are ${ALLOWED_PREFIX_NAMES.join(', ')}.`
                );
            }

            // Validating values
            const prefixValue = prefixSet[prefixName];
            const prefixValueMatch = prefixValue.match(PREFIX_PATTERN);
            if (prefixValueMatch === null) {
                throw new TypeError(
                    `BEM ${prefixName} has invalid value: '${prefixValue}'. It contains invalid characters or it is empty.`
                );
            }
        });
    }
}
