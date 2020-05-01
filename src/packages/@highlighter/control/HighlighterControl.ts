import { NodeIterator } from './NodeIterator';

enum SelectionStatus {
    selected = 'selected',
    notSelected = 'not_selected',
}

type SelectionFunction = (node: HTMLElement) => void;

type FindInNodeFunction = (node: Node, onMatch: (node: HTMLElement) => void) => void;

export interface HighlightControlScrollArgs {
    nodeTopPosition: number;
    heightViewport: number;
    scrollTop: number;
}

export interface HighlightOptions {
    /** Defines scope where you want find and scroll highlight keywords */
    root: HTMLElement;
    /** Function responsibe for scrolling */
    scrollFunction?: (values: HighlightControlScrollArgs) => void;
    /** Defines DOM element that has scrolling */
    scrollableElement?: Window | HTMLElement;
    /** Fired when element is selected */
    onSelection?: SelectionFunction;
    /** Fired when element is lost selection */
    onRemoveSelection?: SelectionFunction;
}

const KEYWORD_ATTRIBUTE = 'data-highlight-keyword';
const SELECTED_ATTRIBUTE = 'data-highlight-selected';

export class HighlighterControl {
    private scrollFunction?: (values: HighlightControlScrollArgs) => void;

    private scrollableElement?: Window | HTMLElement;

    private nodeIterator: NodeIterator;

    private onSelection?: SelectionFunction;

    private onRemoveSelection?: SelectionFunction;

    /**
     * Method used for comparing position two nodes by the appearance
     * Compare vertical and horizontal position
     */
    static comparePositionTwoNodes(node: HTMLElement, nextNode: HTMLElement) {
        const nodeBoundaries = node.getBoundingClientRect();
        const nextNodeBoundaries = nextNode.getBoundingClientRect();
        const verticalCompares = nodeBoundaries.top - nextNodeBoundaries.top;
        const horizontalCompares = nodeBoundaries.left - nextNodeBoundaries.left;

        if (verticalCompares === 0) {
            return horizontalCompares;
        }

        return verticalCompares;
    }

    /**
     * Method used for sort nodes by appearance
     * Order from top to bottom and left to right
     */
    static sortNodesByAppearance(nodes: HTMLElement[]) {
        return nodes.sort(HighlighterControl.comparePositionTwoNodes);
    }

    static keywordNodes(keyword: string) {
        return document.querySelectorAll<HTMLElement>(`[${KEYWORD_ATTRIBUTE}="${keyword}"]`);
    }

    static get selectedNode() {
        return document.querySelector<HTMLElement>(
            `[${SELECTED_ATTRIBUTE}="${SelectionStatus.selected}"]`
        );
    }

    constructor({
        root,
        scrollFunction,
        scrollableElement = window,
        onSelection,
        onRemoveSelection,
    }: HighlightOptions) {
        this.scrollFunction = scrollFunction;
        this.scrollableElement = scrollableElement;
        this.onSelection = onSelection;
        this.onRemoveSelection = onRemoveSelection;
        this.nodeIterator = new NodeIterator({
            root,
            whatToShow: NodeFilter.SHOW_TEXT,
        });
    }

    private triggerSelection(keyword: string) {
        let nextIndex = 0;
        const keywordNodes = Array.from(HighlighterControl.keywordNodes(keyword));
        const prevNode = HighlighterControl.selectedNode;
        const sortedKeywordNodes = HighlighterControl.sortNodesByAppearance(keywordNodes);

        if (prevNode) {
            const indexPrevNode = sortedKeywordNodes.indexOf(prevNode);
            prevNode.setAttribute(SELECTED_ATTRIBUTE, SelectionStatus.notSelected);
            if (this.onRemoveSelection) this.onRemoveSelection(prevNode);

            nextIndex = indexPrevNode + 1;

            if (nextIndex >= sortedKeywordNodes.length) {
                nextIndex = 0;
            }
        }

        const nextNode = sortedKeywordNodes[nextIndex];

        if (nextNode) {
            if (this.onSelection) this.onSelection(nextNode);
            nextNode.setAttribute(SELECTED_ATTRIBUTE, SelectionStatus.selected);
        }
    }

    private scrollToSelectedKeyword() {
        const { selectedNode } = HighlighterControl;
        if (selectedNode && this.scrollableElement) {
            const nodeTopPosition = selectedNode.getBoundingClientRect().top;
            let heightViewport = 0;
            let scrollTop = 0;

            if (this.scrollableElement instanceof Window) {
                heightViewport = this.scrollableElement.innerHeight;
                scrollTop = this.scrollableElement.pageYOffset;
            }

            if (this.scrollableElement instanceof HTMLElement) {
                heightViewport = this.scrollableElement.clientHeight || 0;
                scrollTop = this.scrollableElement.scrollTop;
            }

            if (this.scrollFunction) {
                this.scrollFunction({
                    nodeTopPosition,
                    heightViewport,
                    scrollTop,
                });
            } else {
                this.scrollableElement.scrollTo(
                    0,
                    nodeTopPosition + scrollTop - heightViewport / 2
                );
            }
        }
    }

    public findKeywordInNodes(keyword: string, findInNode: FindInNodeFunction) {
        const iterator = this.nodeIterator.create();

        iterator.iterateThroughNodes((node) => {
            findInNode(node, (highlightedNode) => {
                highlightedNode.setAttribute(KEYWORD_ATTRIBUTE, keyword);
            });
        });
    }

    public selectKeyword(keyword: string) {
        this.triggerSelection(keyword);
        this.scrollToSelectedKeyword();
    }
}
