/**
 * @module BooleanQueryTokenizer is responsible for tokenizing boolean query language. Also
 * it provides a method `extractWordsAndPhrases` that returns bag of phrases and words.
 *
 * Glossary:
 * A _token_ is a pair consisting of a token name and matched _lexeme_.
 * The token name represents a kind of lexical unit, e.g.,
 * particular keyword, phrase, operator, separator, etc.
 *
 * A _lexeme_ is a sequence of characters in the input string that matches the pattern for
 * a token and is identified by the lexical analyzer as an instance of that token.
 *
 * A _pattern_ is a description of the form that the lexemes of a token may take.
 * In the case of a keyword as a token, the pattern is just the sequence of characters that
 * form the keyword. For identifiers and some other tokens, the pattern is more complex
 * structure that is matched by many strings.
 */
/* eslint-disable class-methods-use-this */

export enum TokenType {
    unknown,
    separator,
    word,
    wildcardWord,
    wildcard,
    phrase,
    booleanOperator,
    aroundOperator,
    modifier,
    parentheses,
}
type TokenPattern = [
    TokenType, // Token type
    RegExp // Pattern of a token in a RegExp form
];
type Token = {
    type: TokenType;
    lexeme: string;
};
type Extract = {
    wordsAndPhrases: string[];
};

// Character classes
const spaceSymbols = '\\s\\t\\n';
/**
 * We need a character class that matches a letter from any alphabet.
 * The easiest way to achieve it is to use the regexp /\p{Letter}/,
 * but only if RegExp engine supports Unicode Property Escapes.
 * Unfortunately, RegExp engine in Internet Explorer does not. So we have to use a slightly
 * modified version of transpiled /\p{Letter}/ expression.
 * @see https://github.com/tc39/proposal-regexp-unicode-property-escapes
 * @see https://mothereff.in/regexpu#input=var+regex+%3D+/%5Cp%7BL%7D/u%3B&unicodePropertyEscape=1
 * If you need to decode it to readable characters, @see https://r12a.github.io/app-conversion/
 */
const letterSymbols =
    'A-Za-z\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0560-\\u0588\\u05D0-\\u05EA\\u05EF-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u0860-\\u086A\\u08A0-\\u08B4\\u08B6-\\u08C7\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u09FC\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0AF9\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58-\\u0C5A\\u0C60\\u0C61\\u0C80\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D04-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D54-\\u0D56\\u0D5F-\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E86-\\u0E8A\\u0E8C-\\u0EA3\\u0EA5\\u0EA7-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F5\\u13F8-\\u13FD\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16F1-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1878\\u1880-\\u1884\\u1887-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1C80-\\u1C88\\u1C90-\\u1CBA\\u1CBD-\\u1CBF\\u1CE9-\\u1CEC\\u1CEE-\\u1CF3\\u1CF5\\u1CF6\\u1CFA\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312F\\u3131-\\u318E\\u31A0-\\u31BF\\u31F0-\\u31FF\\u3400-\\u4DBF\\u4E00-\\u9FFC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6E5\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA7BF\\uA7C2-\\uA7CA\\uA7F5-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA8FD\\uA8FE\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB69\\uAB70-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC';
const validWordSymbols = "\\d._'$@&/";
const modifierSymbols = '\\!+-';

// Basic patterns
const word = `[${letterSymbols}${validWordSymbols}]{1}[${letterSymbols}${validWordSymbols}${modifierSymbols}]*`;
const wordModifier = `[${modifierSymbols}]{1}`;
const separator = `[${spaceSymbols}]+`;
const separatorOrEnd = `(?:${separator}|$)`;
const parentheses = '(?:\\(|\\)|\\[|\\]|\\{|\\}|\\<|\\>)';
const wildcard = '\\*';
const phrase = '(?:"[^"]*"|\'[^\']*\')';
const simpleOperator = '(?:OR|AND|NEAR|NOT|\\&|\\|)';
const andNotOperator = `AND${separator}NOT`;
const aroundOperator = `AROUND${separator}\\d+`;

export class BooleanQueryTokenizer {
    /**
     * Token patterns are tuples that define a token type and its pattern.
     * Token patterns are ordered from low to high priority.
     * Token priorities are used as a tie breakers when multiple patterns matched
     * the same lexeme. E.g. lexeme "NEAR" is a boolean operator and a word at the same
     * time; it will be recognized as a `booleanOperator` as long as `booleanOperator` has
     * higher priority than `word`.
     * Some context specific patterns use lookahead assertions: /^pattern(?=lookahead)/
     */
    private static readonly tokenPatterns: TokenPattern[] = [
        [TokenType.separator, new RegExp(`^(?:${separator}|$)`)],
        [TokenType.word, new RegExp(`^${word}`)],
        [TokenType.modifier, new RegExp(`^(?:${wordModifier})(?=${phrase}|\\(|${word})`)],
        [
            TokenType.wildcard,
            new RegExp(`^(?:${wildcard}(?=${word})|${wildcard}(?=${separatorOrEnd}))`),
        ],
        [TokenType.wildcardWord, new RegExp(`^${word}${wildcard}${word}`)],
        [TokenType.phrase, new RegExp(`^${phrase}`)],
        [
            TokenType.booleanOperator,
            // Cases like `NOT word`, `NOT(group...`, `AND"a phrase"`
            new RegExp(
                `^(?:${andNotOperator}|${aroundOperator}|${simpleOperator})` +
                    `(?=${separatorOrEnd}|\\(|${phrase})`,
                'i'
            ),
        ],
        [TokenType.parentheses, new RegExp(`^${parentheses}`)],
    ];

    /**
     * Tokenizer splits an input text into meaningful chunks and labels each chunk according to its
     * lexical meaning, suchwise producing a list of tokens.
     */
    public tokenize(inputString: string): Token[] {
        const tokens: Token[] = [];
        let remainingInputString = inputString;
        while (remainingInputString.length > 0) {
            const token = this.tokenizeCurrentChunk(remainingInputString);
            if (token) {
                // If token has been found, reduce the `remainingInputString `
                // on the length of the matched lexeme and add the token to the result.
                const { lexeme } = token;
                remainingInputString = remainingInputString.substring(lexeme.length);
                tokens.push(token);
            } else {
                // If no tokens has been matched, mark current character as unknown token.
                // If the previous token is also unknown, append current character to
                // the previous token.
                const prevToken = tokens[tokens.length - 1];
                if (prevToken && prevToken.type === TokenType.unknown) {
                    prevToken.lexeme += remainingInputString.substring(0, 1);
                } else {
                    tokens.push({
                        type: TokenType.unknown,
                        lexeme: remainingInputString.substring(0, 1),
                    });
                }
                remainingInputString = remainingInputString.substring(1);
            }
        }
        return tokens;
    }

    /**
     * @deprecated use BooleanQueryTokenizer#extractWords instead
     */
    public extractWordsAndPhrases(inputString: string): string[] {
        return this.filterWordsAndPhrases(this.tokenize(inputString));
    }

    /**
     * Extracts words and phrases from boolean query. Ignores negated words and phrases.
     * Supports negation of words, phrases, and groups (by parentheses).
     * If there is not enough closing parentheses, negation is not be applied.
     * @param inputString - boolean query string
     */
    public extractWords(inputString: string): Extract {
        const tokens = this.tokenize(inputString);
        for (let i = 0; i < tokens.length; i += 1) {
            const token = tokens[i];
            if (this.isNegation(token) && i + 1 < tokens.length) {
                let j = i + 1;
                while (j < tokens.length) {
                    const lookAheadToken = tokens[j];
                    if (lookAheadToken.type === TokenType.separator) {
                        j += 1;
                    } else if (this.isNegationable(lookAheadToken)) {
                        this.resetSubsequenceToUnknown(tokens, i, j);
                        i = j;
                        break;
                    } else if (this.isParenthesisGroupStart(lookAheadToken)) {
                        let parenthesisTracker = 0;
                        for (let k = j; k < tokens.length; k += 1) {
                            const parenthesisLoopToken = tokens[k];
                            if (parenthesisLoopToken.type === TokenType.parentheses) {
                                if (parenthesisLoopToken.lexeme === '(') {
                                    parenthesisTracker += 1;
                                } else if (parenthesisLoopToken.lexeme === ')') {
                                    parenthesisTracker -= 1;
                                }
                            }
                            if (parenthesisTracker === 0) {
                                this.resetSubsequenceToUnknown(tokens, i, k);
                                i = k;
                                break;
                            }
                        }
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
        // Filter only words and phrases
        return {
            wordsAndPhrases: this.filterWordsAndPhrases(tokens),
        };
    }

    /**
     * @deprecated use `BooleanQueryTokenizer#tokenize`
     */
    public static tokenize(inputString: string): Token[] {
        const booleanQueryTokenizer = new BooleanQueryTokenizer();
        return booleanQueryTokenizer.tokenize(inputString);
    }

    /**
     * @deprecated use `BooleanQueryTokenizer#extractWords`
     */
    public static extractWordsAndPhrases(inputString: string): string[] {
        const booleanQueryTokenizer = new BooleanQueryTokenizer();
        return booleanQueryTokenizer.extractWordsAndPhrases(inputString);
    }

    /**
     * @deprecated use `BooleanQueryTokenizer#extractWords`
     */
    public static extractWords(inputString: string): Extract {
        const booleanQueryTokenizer = new BooleanQueryTokenizer();
        return booleanQueryTokenizer.extractWords(inputString);
    }

    /**
     * Check does inputString contain boolean operators
     * @param inputString - boolean query string
     */
    public isContainsBooleanOperators(inputString: string): boolean {
        const tokens = this.tokenize(inputString);
        if (this.extractWords(inputString).wordsAndPhrases.length === 0) {
            return false;
        }
        const result = tokens.find((token) => token.type === TokenType.booleanOperator);
        return result !== undefined;
    }

    private filterWordsAndPhrases(tokens: Token[]): string[] {
        return (
            tokens
                // Filter only words and phrases
                .filter((token) => token.type === TokenType.word || token.type === TokenType.phrase)
                .map((wordOrPhrase) => {
                    // `phrase` tokens require some dirty preprocessing
                    // to remove quotes and possible inner wildcards.
                    if (wordOrPhrase.type === TokenType.phrase) {
                        return wordOrPhrase.lexeme.replace(/('|"|\*)/g, '').trim();
                    }
                    return wordOrPhrase.lexeme;
                })
                // After `phrase` tokens preprocessing, some strings can become empty,
                // so we should remove them.
                .filter((str) => str)
        );
    }

    private resetSubsequenceToUnknown(tokens: Token[], from: number, to: number): Token[] {
        tokens.forEach((_token, index) => {
            if (index >= from && index <= to) {
                // eslint-disable-next-line no-param-reassign
                tokens[index] = {
                    type: TokenType.unknown,
                    lexeme: '',
                };
            }
        });
        return tokens;
    }

    private isNegation(token: Token): boolean {
        return (
            (token.type === TokenType.booleanOperator &&
                (token.lexeme === 'NOT' || token.lexeme === 'AND NOT')) ||
            (token.type === TokenType.modifier && (token.lexeme === '-' || token.lexeme === '!'))
        );
    }

    private isNegationable(token: Token): boolean {
        return (
            token.type === TokenType.word ||
            token.type === TokenType.wildcardWord ||
            token.type === TokenType.phrase
        );
    }

    private isParenthesisGroupStart(token: Token): boolean {
        return token.type === TokenType.parentheses && token.lexeme === '(';
    }

    /**
     * `tokenizeCurrentChunk` tries to find the best possible match for the current
     * part of the input string
     */
    private tokenizeCurrentChunk(remainingInputString: string): Token | undefined {
        let tokenCandidate: Token | undefined;
        BooleanQueryTokenizer.tokenPatterns.forEach((tokenPattern) => {
            const [name, tokenRegExp] = tokenPattern;
            const lexemeMatch = remainingInputString.match(tokenRegExp);
            if (lexemeMatch !== null) {
                const [lexeme] = lexemeMatch;
                if (!tokenCandidate) {
                    tokenCandidate = { type: name, lexeme };
                } else if (lexeme.length >= tokenCandidate.lexeme.length) {
                    // Longer lexeme always wins. If tokens' lexemes are equal in length, then wins a
                    // token who's lexeme has been matched by a pattern with higher priority.
                    // Which means the current one (because we iterate through patterns from left to
                    // right and right patterns have higher priority).
                    tokenCandidate = { type: name, lexeme };
                }
            }
        });
        return tokenCandidate;
    }
}
