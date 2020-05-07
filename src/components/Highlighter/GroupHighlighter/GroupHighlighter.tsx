import * as React from 'react';
import { HighlighterCore, HighlighterCoreAccuracy } from '../../../packages/@highlighter/core';
import { HighlighterControl } from '../../../packages/@highlighter/control';
import { HighlighterNode, HighlighterNodeRenderer } from '../../../packages/@highlighter/node';

type GroupHighlighterTermResult = {
    term: string;
    styles: CSSStyleDeclaration;
};
interface Props {
    /** Target DOM node for highlight searching */
    children: React.ReactElement;
    /** Array of words or RegExp that is used for search */
    searchTerms: string[];
    /** Method is called on render founded substrings */
    highlightRenderer: HighlighterNodeRenderer;
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
    /** Fired after finishing highlighting */
    onComplete: (
        instance: HighlighterControl,
        result: GroupHighlighterTermResult[],
        rootNode: HTMLElement
    ) => void;
}

/**
 * Defines styles for highlighted node
 */
const HIGHLIGHTED_NODE_STYLES = {
    borderRadius: '2px',
} as CSSStyleDeclaration;

/**
 * Defines styles for selected node
 */
const SELECTED_NODE_STYLES = {
    boxShadow: '0 0 0 1px #000',
    position: 'relative',
} as CSSStyleDeclaration;

/**
 * Defines styles for cleaning selection for node
 */
const RESET_SELECTED_NODE_STYLES = {
    boxShadow: '',
    position: 'initial',
} as CSSStyleDeclaration;

export const GroupHighlighter: React.FC<Props> = React.memo((props) => {
    const {
        children,
        searchTerms,
        accuracy,
        ignoreDiacritics,
        ignoreCase,
        onComplete,
        highlightRenderer,
    } = props;
    const elementRef = React.createRef<HTMLDivElement>();
    const key = JSON.stringify({ searchTerms, accuracy, ignoreDiacritics, ignoreCase });

    React.useEffect(() => {
        if (elementRef.current) {
            const result: GroupHighlighterTermResult[] = [];
            const sortedSearchTerms = HighlighterCore.sortTerms(searchTerms);
            const highlighterControl = new HighlighterControl({
                root: elementRef.current,
                onSelection: (node) =>
                    HighlighterNode.applyStylesForNode(node, SELECTED_NODE_STYLES),
                onRemoveSelection: (node) =>
                    HighlighterNode.applyStylesForNode(node, RESET_SELECTED_NODE_STYLES),
            });
            sortedSearchTerms.forEach((term, index) => {
                const styles = {
                    ...HIGHLIGHTED_NODE_STYLES,
                    backgroundColor: HighlighterNode.generateColor(index),
                } as CSSStyleDeclaration;

                const highlighterCore = new HighlighterCore({
                    searchTerms: [term],
                    accuracy,
                    ignoreDiacritics,
                    ignoreCase,
                });
                const highlighterNode = new HighlighterNode({
                    highlightRenderer,
                    highlighterCore,
                });
                highlighterControl.findKeywordInNodes(term, (node, onMatch) => {
                    highlighterNode.find(node, (matchedNode) => {
                        HighlighterNode.applyStylesForNode(matchedNode, styles);
                        onMatch(matchedNode);
                    });
                });
                result.push({
                    term,
                    styles,
                });
            });
            onComplete(highlighterControl, result, elementRef.current);
        }
    }, [
        elementRef,
        accuracy,
        highlightRenderer,
        ignoreCase,
        ignoreDiacritics,
        onComplete,
        searchTerms,
    ]);

    return (
        <div key={key} ref={elementRef}>
            {children}
        </div>
    );
});

GroupHighlighter.displayName = 'GroupHighlighter';

GroupHighlighter.defaultProps = {};
