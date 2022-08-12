import * as React from 'react';
import {
    HighlighterCore,
    HighlighterCoreTerm,
    HighlighterCoreOptions,
} from '../../../packages/Highlighter';

export type HighlighterRenderer = ({ key: number, substring }) => ReactNode;

export interface Props {
    /** Target string for highlight searching */
    string: string;
    /** Array of words or RegExp that is used for search */
    searchTerms: HighlighterCoreTerm;
    /** Specify HighlighterCore options */
    highlighterCoreOptions?: HighlighterCoreOptions;
    /** Method is called on render founded substrings */
    highlightRenderer: HighlighterRenderer;
}

export const StringHighlighter: React.FC<Props> = (props) => {
    const { string, searchTerms, highlightRenderer, highlighterCoreOptions } = props;
    const highlighter = React.useMemo(
        () => new HighlighterCore(searchTerms, highlighterCoreOptions),
        [searchTerms, highlighterCoreOptions]
    );
    const stringParts = highlighter.find(string);
    return (
        <>
            {stringParts.map(({ substring, highlighted }, index) => {
                if (highlighted) {
                    return highlightRenderer({ key: index, substring });
                }
                return substring;
            })}
        </>
    );
};

StringHighlighter.displayName = 'StringHighlighter';

StringHighlighter.defaultProps = {
    highlighterCoreOptions: {
        accuracy: 'exact',
        ignoreDiacritics: true,
        ignoreCase: true,
    },
};
