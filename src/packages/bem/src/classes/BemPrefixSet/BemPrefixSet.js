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

/**
 * @type {Object.<string, string>}
 */
const defaultPrefixes = {
    elem: DEFAULT_ELEM_PREFIX,
    mod: DEFAULT_MOD_PREFIX,
    value: DEFAULT_VALUE_PREFIX
}

export class BemPrefixSetError extends Error {}

export default class BemPrefixSet {
    constructor(prefixes = {}) {
        const { elem, mod, value } = {
            ...defaultPrefixes,
            ...prefixes
        };
        BemPrefixSet.validate({ elem, mod, value });
        Object.assign(this, { elem, mod, value });
    }

    /**
     * @param {BemPrefixSet} prefixSet
     * @throws {BemPrefixSetError}
     */
    static validate(prefixSet) {
        Object.keys(prefixSet).forEach(prefixName => {
            // Validating keys name
            if (ALLOWED_PREFIX_NAMES.includes[prefixName] === false) {
                throw new BemPrefixSetError(
                    `BEM prefixes declaration includes unknown property '${prefixName}'. ` +
                        `Allowed values are ${ALLOWED_PREFIX_NAMES.join(', ')}.`
                );
            }

            // Validating values
            const prefixValue = prefixSet[prefixName];
            const prefixValueMatch = prefixValue.match(PREFIX_PATTERN);
            if (prefixValueMatch === null) {
                throw new BemPrefixSetError(
                    `BEM ${prefixName} has invalid value: '${prefixValue}'. It contains invalid characters or it is empty.`
                );
            }
        });
    }
}
