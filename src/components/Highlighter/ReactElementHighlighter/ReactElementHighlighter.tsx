import * as React from 'react';
import { HighlighterCoreOptions, Highlighter } from '../../../packages/Highlighter';

type ReactElementHighlighterTermResult = {
    term: string;
    styles: CSSStyleDeclaration;
};
interface Props {
    /** Target DOM node for highlight searching */
    children: React.ReactElement;
    /** Array of words or RegExp that is used for search */
    searchTerms: string[];
    /** Specify HighlighterCore options */
    highlighterCoreOptions?: HighlighterCoreOptions;
    /** Specify styles for highlighted terms */
    highlightStyles?: CSSStyleDeclaration;
    /** Fired after finishing highlighting */
    onComplete: (
        instance: Highlighter,
        result: [ReactElementHighlighterTermResult[], ReactElementHighlighterTermResult[]],
        rootNode: HTMLElement
    ) => void;
}

export const ReactElementHighlighter: React.FC<Props> = (props) => {
    const { children, searchTerms, highlighterCoreOptions, highlightStyles, onComplete } = props;
    const elementRef = React.createRef<HTMLDivElement>();
    const key = JSON.stringify({ searchTerms, ...highlighterCoreOptions });

    React.useEffect(() => {
        if (elementRef.current) {
            const highlighter = new Highlighter({
                root: elementRef.current,
            });
            const [matchedTerms, notMatchedTerms] = highlighter.find(
                searchTerms,
                highlighterCoreOptions,
                highlightStyles
            );
            onComplete(highlighter, [matchedTerms, notMatchedTerms], elementRef.current);
        }
    }, [elementRef, onComplete, searchTerms, highlighterCoreOptions]);

    return (
        <div key={key} ref={elementRef}>
            {children}
        </div>
    );
};

ReactElementHighlighter.displayName = 'ReactElementHighlighter';

ReactElementHighlighter.defaultProps = {
    highlighterCoreOptions: {
        accuracy: 'exact',
        ignoreDiacritics: true,
        ignoreCase: true,
    },
    highlightStyles: undefined,
};
