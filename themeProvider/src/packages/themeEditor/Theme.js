const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const cloneDeep = require('lodash/cloneDeep');
const randomColor = require('randomColor');
const stupidVariablesExtractor = require('../stupidVariablesParser');

class Theme {
    /**
     * @param {Object} themeData
     */
    constructor(themeData = []) {
        this.variables = cloneDeep(themeData);
    }

    randomize() {
        return this.variables;
    }

    fork() {
        return new Theme(this.variables);
    }

    toJSON() {
        return this.variables;
    }

    toCSS() {
        return `:root {\n${this.variables
            .map(variable => {
                const [name, value] = variable;
                return `    --${name}: ${value};`;
            })
            .join('\n')}\n}`;
    }

    static createEmptyTheme() {
        return new Theme([]);
    }

    static async createFromSassAndRandomize({ themePath, themeFilename }) {
        try {
            const variables = {
                'color-background': randomColor(),
                'color-foreground': randomColor(),
                'color-neutral': randomColor(),
                'color-muted': randomColor(),
                'color-brand': randomColor(),
                'color-primary': randomColor(),
                'color-accent': randomColor(),
                'color-info': randomColor(),
                'color-good': randomColor(),
                'color-warning': randomColor(),
                'color-bad': randomColor()
            };
            const randomTheme = await Theme.extractVariableFromSass({
                themePath,
                themeFilename,
                variables
            });
            return new Theme(randomTheme);
        } catch (error) {
            console.log(error);
        }
    }

    static async createFromSass({ themePath, themeFilename }) {
        try {
            const originalTheme = await Theme.extractVariableFromSass({ themePath, themeFilename });
            return new Theme(originalTheme);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @param {*} sassFilename
     * @private
     */
    static extractVariableFromSass({ themePath, themeFilename, variables = {} }) {
        return new Promise((resolve, reject) => {
            const sassFilename = path.resolve(themePath, themeFilename);

            // console.log('======= extractVariableFromSass ========')
            // console.log('themePath', themePath);
            // console.log('themeFilename', themeFilename);
            // console.log('sassFilename', sassFilename);
            // console.log('variables', variables);

            fs.readFile(sassFilename, (error, data) => {
                if (error) return reject(error);

                const customVariables = Theme.convertVariablesToSass(variables);
                const sassOptions = {
                    includePaths: [path.resolve(themePath)],
                    data: `${customVariables}\n
                        ${data.toString()}
                    `
                };

                console.log(sassOptions.data);

                sass.render(sassOptions, (error, result) => {
                    if (error) return reject(error);
                    const variables = stupidVariablesExtractor(result.css.toString());
                    return resolve(variables);
                });
            });
        });
    }

    static convertVariablesToSass(variables = {}) {
        return Object.keys(variables)
            .map(variableName => {
                const variableValue = variables[variableName];
                return `$${variableName}: ${variableValue};`;
            })
            .join('\n');
    }
}

module.exports = Theme;
