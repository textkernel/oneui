import removeAccents from 'remove-accents';

export type HighlighterCoreAccuracy = 'exact' | 'partial';

type Substring = {
    highlighted: boolean;
    substring: string;
};

type SubstringIndexes = {
    start: number;
    end: number;
};

interface RegExpBuilder {
    searchString: string | RegExp;
    accuracy?: HighlighterCoreAccuracy;
    ignoreCase?: boolean;
}

interface StringNormalizer {
    string: string;
    useEscape?: boolean;
    ignoreDiacritics?: boolean;
}

export interface HighlighterCoreOptions {
    /** Array of words or RegExp that is used for search */
    searchTerms: string[] | RegExp;
    /**
     * Define the accuracy of search
     * Supported options:
     * partial - when searching for "lor" only "lor" inside "lorem" will be marked
     * exact - When searching for "lor" only those exact words with a word boundary will be marked.
     * regexp - When searching for "lor" only those exact words with a word boundary will be marked.
     */
    accuracy?: HighlighterCoreAccuracy;
    /** If enabled the diacritic characters should be matched */
    ignoreDiacritics?: boolean;
    /** Ignore case sensitivity */
    ignoreCase?: boolean;
}

export class HighlighterCore {
    protected accuracy: HighlighterCoreAccuracy;

    protected regexp: RegExp | null;

    protected ignoreDiacritics: boolean;

    protected ignoreCase: boolean;

    static escapeStr(string: string) {
        return string.replace(/[-[\]{}():*+?.,\\^$|#\s]/g, '\\$&');
    }

    static removeDiacritics(string: string) {
        return removeAccents(string);
    }

    static buildRegExp({ searchString, accuracy, ignoreCase }: RegExpBuilder) {
        let source: string | RegExp = '';
        let flags = 'gm';

        switch (accuracy) {
            case 'partial':
                source = `(${searchString})`;
                break;
            case 'exact':
            default:
                source = `(\\b)(${searchString})(?=$|\\s|\\b)`;
                break;
        }

        if (ignoreCase) {
            flags = `${flags}i`;
        }

        return new RegExp(source, flags);
    }

    static normalize({ string, useEscape, ignoreDiacritics }: StringNormalizer) {
        let normalizedString = string;

        if (ignoreDiacritics) {
            normalizedString = HighlighterCore.removeDiacritics(string);
        }

        if (useEscape) {
            normalizedString = HighlighterCore.escapeStr(normalizedString);
        }

        return normalizedString;
    }

    static termsToString(terms: string[], ignoreDiacritics: boolean) {
        return terms
            .sort((a, b) => b.split(' ').length - a.split(' ').length)
            .map((string) =>
                HighlighterCore.normalize({
                    string,
                    useEscape: true,
                    ignoreDiacritics,
                })
            )
            .join('|');
    }

    static concatenateOverlappingIndexes(
        startIndexes: number[],
        endIndexes: number[]
    ): SubstringIndexes[] {
        const sortedStartIndexes = startIndexes.sort((a, b) => a - b);
        const sortedEndIndexes = endIndexes.sort((a, b) => a - b);
        const substringIndexes: SubstringIndexes[] = [];
        sortedStartIndexes.forEach((pos, index) => {
            if (substringIndexes.length === 0) {
                substringIndexes.push({
                    start: pos,
                    end: sortedEndIndexes[index],
                });
                return;
            }

            if (pos > substringIndexes[substringIndexes.length - 1].end) {
                substringIndexes.push({
                    start: pos,
                    end: sortedEndIndexes[index],
                });
            } else {
                substringIndexes[substringIndexes.length - 1].end = sortedEndIndexes[index];
            }
        });

        return substringIndexes;
    }

    static buildSubstringsFromIndexes(
        string: string,
        substringIndexes: SubstringIndexes[]
    ): Substring[] {
        const substrings: Substring[] = [];
        substringIndexes.forEach((pair, index) => {
            if (substringIndexes[index - 1]) {
                substrings.push({
                    highlighted: false,
                    substring: string.substring(substringIndexes[index - 1].end, pair.start),
                });
            } else if (pair.start !== 0) {
                substrings.push({
                    highlighted: false,
                    substring: string.substring(0, pair.start),
                });
            }

            substrings.push({
                highlighted: true,
                substring: string.substring(pair.start, pair.end),
            });

            if (!substringIndexes[index + 1] && pair.end !== string.length) {
                substrings.push({
                    highlighted: false,
                    substring: string.substring(pair.end, string.length),
                });
            }
        });
        return substrings;
    }

    constructor({
        searchTerms,
        accuracy = 'exact',
        ignoreDiacritics = true,
        ignoreCase = true,
    }: HighlighterCoreOptions) {
        this.accuracy = accuracy;
        this.ignoreDiacritics = ignoreDiacritics;
        this.ignoreCase = ignoreCase;
        if (searchTerms instanceof RegExp) {
            this.regexp = searchTerms;
        } else if (searchTerms.length > 0) {
            const searchString = HighlighterCore.termsToString(searchTerms, ignoreDiacritics);
            this.regexp = HighlighterCore.buildRegExp({
                searchString,
                accuracy,
                ignoreCase,
            });
        } else {
            this.regexp = null;
        }
    }

    public find(string: string): Substring[] {
        if (this.regexp === null) {
            return [
                {
                    highlighted: false,
                    substring: string,
                },
            ];
        }
        const normalizedString = HighlighterCore.normalize({
            string,
            ignoreDiacritics: this.ignoreDiacritics,
        });
        let match: RegExpExecArray | null;
        const startIndexes: number[] = [];
        const endIndexes: number[] = [];

        // eslint-disable-next-line no-cond-assign
        while ((match = this.regexp.exec(normalizedString))) {
            const startIndex = match.index;
            const endIndex = startIndex + match[0].length;
            startIndexes.push(startIndex);
            endIndexes.push(endIndex);
            this.regexp.lastIndex = match.index + 1;
        }

        if (startIndexes.length === 0) {
            return [
                {
                    highlighted: false,
                    substring: string,
                },
            ];
        }

        return HighlighterCore.buildSubstringsFromIndexes(
            string,
            HighlighterCore.concatenateOverlappingIndexes(startIndexes, endIndexes)
        );
    }
}
