import * as React from 'react';
import { ReactNode } from '../../../customTypes/types';
import {
    HighlighterCore,
    HighlighterCoreTerm,
    HighlighterCoreOptions,
} from '../../../packages/Highlighter';

export type HighlighterRenderer = ({ key, substring }) => ReactNode;

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

export const StringHighlighter: React.FC<Props> = ({
    string,
    searchTerms,
    highlightRenderer,
    highlighterCoreOptions = {
        accuracy: 'exact',
        ignoreDiacritics: true,
        ignoreCase: true,
    },
}) => {
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
