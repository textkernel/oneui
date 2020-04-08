import * as React from 'react';
import { HighlighterCore, HighlighterCoreAccuracy } from '../../../utils/HighlighterCore';

export type HighlighterRenderer = ({ key: number, substring }) => ReactNode;

interface Props {
    /** Target string for highlight searching */
    string: string;
    /** Array of words or RegExp that is used for search */
    searchTerms: string[] | RegExp;
    /** Define the accuracy of search */
    accuracy?: HighlighterCoreAccuracy;
    /** If enabled the diacritic characters should be matched */
    ignoreDiacritics?: boolean;
    /** Ignore case sensitivity */
    ignoreCase?: boolean;
    /** Method is called on render founded substrings */
    highlightRenderer: HighlighterRenderer;
}

export const StringHighlighter: React.FC<Props> = (props) => {
    const { string, highlightRenderer, ...highlighterOptions } = props;
    const highlighter = React.useMemo(() => new HighlighterCore(highlighterOptions), [
        highlighterOptions,
    ]);
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
    accuracy: 'exact',
    ignoreDiacritics: true,
    ignoreCase: true,
};
