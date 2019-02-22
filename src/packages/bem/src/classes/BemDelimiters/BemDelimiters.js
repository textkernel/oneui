/**
 * @type {Array.<string>}
 */
const ALLOWED_DELIMITER_NAMES = ['elem', 'mod', 'value'];

/**
 * @type {RegExp}
 */
const DELIMITER_PATTERN = /[_-]+/;

/**
 * @type {string}
 */
const DEFAULT_ELEM_DELIMITER = '__';

/**
 * @type {string}
 */
const DEFAULT_MOD_DELIMITER = '--';

/**
 * @type {string}
 */
const DEFAULT_VALUE_DELIMITER = '_';

/**
 * @type {Object.<string, string>}
 */
const defaultDelimiters = {
    elem: DEFAULT_ELEM_DELIMITER,
    mod: DEFAULT_MOD_DELIMITER,
    value: DEFAULT_VALUE_DELIMITER
};

export class BemDelimitersError extends Error {}

export default class BemDelimiters {
    constructor(delimiters = {}) {
        const delimitersWithDefaults = {
            ...defaultDelimiters,
            ...delimiters
        };
        BemDelimiters.validate(delimitersWithDefaults);
        Object.assign(this, delimitersWithDefaults);
    }

    /**
     * @param {BemDelimiters} delimiters
     * @throws {BemDelimitersError}
     */
    static validate(delimiters) {
        Object.keys(delimiters).forEach(delimiterName => {
            // Validating keys name
            if (ALLOWED_DELIMITER_NAMES.includes(delimiterName) === false) {
                throw new BemDelimitersError(
                    `BEM delimiters declaration includes unknown property '${delimiterName}'. ` +
                        `Allowed values are "${ALLOWED_DELIMITER_NAMES.join(', ')}".`
                );
            }

            // Validating values
            const delimitersValue = delimiters[delimiterName];
            const delimitersValueMatch = delimitersValue.match(DELIMITER_PATTERN);
            if (delimitersValueMatch === null) {
                throw new BemDelimitersError(
                    `BEM ${delimiterName} has invalid value: '${delimitersValue}'. It contains invalid characters or it is empty.`
                );
            }
        });
    }
}
