/**
 * @module ThemeGenerator is responsible for generating
 * custom CSS properties from theme variables.
 */
import Ajv, { ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';

type CssVars = {
    [key: string]: string;
};

export type ThemeData = {
    cssVariables: CssVars;
};

export type ThemeJsonResult = {
    /** theme name typed by user */
    name: string;
    /** timestamp when theme was created */
    created: string;
    /** version of Theme JSON file */
    configVersion: string;
    /** Theme styles */
    theme: ThemeData;
};

/**
 * Version of Theme JSON file.
 * Version must be increased if Theme JSON
 * file has breaking changes.
 */
export const THEME_CONFIG_VERSION = '1';
/**
 * File name suffix
 */
export const THEME_FILE_SUFFIX = '.theme.json';

const schema = {
    title: 'ThemeJsonResult',
    type: 'object',
    additionalProperties: false,
    required: ['name', 'created', 'configVersion', 'theme'],
    properties: {
        name: { type: 'string' },
        created: { type: 'string', format: 'date-time' },
        configVersion: { enum: [`${THEME_CONFIG_VERSION}`] },
        theme: {
            type: 'object',
            additionalProperties: false,
            required: ['cssVariables'],
            properties: {
                cssVariables: {
                    type: 'object',
                    patternProperties: {
                        '^--.*$': { type: 'string' },
                    },
                    additionalProperties: false,
                },
            },
        },
    },
};

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export class ThemeResult {
    public name: string;

    public fileName: string;

    public created: string;

    public configVersion: string;

    public theme: ThemeData;

    private validator: ValidateFunction<unknown>;

    static formatFileName(string: string): string {
        const shortName = ThemeResult.formatName(string);
        return shortName ? `${shortName}${THEME_FILE_SUFFIX}` : '';
    }

    static formatName(string: string): string {
        return string.replace(`${THEME_FILE_SUFFIX}`, '');
    }

    static create(name: string, cssVars: CssVars): ThemeResult {
        const config = {
            name,
            created: new Date().toISOString(),
            configVersion: THEME_CONFIG_VERSION,
            theme: {
                cssVariables: cssVars,
            },
        };
        return new ThemeResult(config);
    }

    constructor(result: unknown) {
        this.validator = ajv.compile(schema);
        if (!this.validate(result)) {
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw this.validator.errors;
        }
        this.name = ThemeResult.formatName(result.name);
        this.fileName = ThemeResult.formatFileName(result.name);
        this.created = result.created;
        this.configVersion = result.configVersion;
        this.theme = result.theme;
    }

    private validate(result: unknown): result is ThemeJsonResult {
        return this.validator(result) as boolean;
    }

    public toJSON(): ThemeJsonResult {
        const { name, created, configVersion, theme } = this;
        return {
            name,
            created,
            configVersion,
            theme,
        };
    }
}
