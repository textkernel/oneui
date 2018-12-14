const variableRegexp = /^--([^:]+):\s*([^;]+);\s*\}?$/;

class StupidVariablesParserError extends Error {}

module.exports = function stupidVariablesParser(cssText) {
    try {
        return cssText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.startsWith('--'))
            .map(cssVariableLine => {
                const cssVariableMatch = cssVariableLine.match(variableRegexp);
                if (cssVariableMatch === null) {
                    throw StupidVariablesParserError(
                        `Error while parsing css variable: ${cssVariableLine}`
                    );
                }
                const [, cssVarName, cssVarValue] = cssVariableMatch;
                return [cssVarName, cssVarValue];
            });
    } catch (error) {
        if (error instanceof StupidVariablesParserError) {
            throw error;
        }
        console.error(error);
        throw new Error(
            `stupidVariablesParser: failed to parse out css variables from css payload.`
        );
    }
};
