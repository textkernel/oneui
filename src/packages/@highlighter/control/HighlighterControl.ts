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
    /** Function responsible for scrolling */
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
    private root: HTMLElement;

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

    constructor({
        root,
        scrollFunction,
        scrollableElement = window,
        onSelection,
        onRemoveSelection,
    }: HighlightOptions) {
        this.root = root;
        this.scrollFunction = scrollFunction;
        this.scrollableElement = scrollableElement;
        this.onSelection = onSelection;
        this.onRemoveSelection = onRemoveSelection;
        this.nodeIterator = new NodeIterator({
            root,
            whatToShow: NodeFilter.SHOW_TEXT,
        });
    }

    private keywordNodes(keyword: string) {
        return this.root.querySelectorAll<HTMLElement>(`[${KEYWORD_ATTRIBUTE}="${keyword}"]`);
    }

    private get selectedNode() {
        return this.root.querySelector<HTMLElement>(
            `[${SELECTED_ATTRIBUTE}="${SelectionStatus.selected}"]`
        );
    }

    private triggerSelection(keyword: string) {
        let nextIndex = 0;
        const keywordNodes = Array.from(this.keywordNodes(keyword));
        const prevNode = this.selectedNode;

        if (prevNode && this.onRemoveSelection) {
            this.onRemoveSelection(prevNode);
        }

        const sortedKeywordNodes = HighlighterControl.sortNodesByAppearance(keywordNodes);

        if (prevNode) {
            const indexPrevNode = sortedKeywordNodes.indexOf(prevNode);
            prevNode.setAttribute(SELECTED_ATTRIBUTE, SelectionStatus.notSelected);

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
        const { selectedNode } = this;
        if (selectedNode && this.scrollableElement) {
            const nodeTopPosition = selectedNode.getBoundingClientRect().top;
            /**
             * Below we can't use `instanceOf` because `this.scrollableElement`
             * can be created in another instance.
             * for example, `this.scrollableElement` mounted inside iframe
             */
            const heightViewport =
                (this.scrollableElement as any).innerHeight ||
                (this.scrollableElement as any).clientHeight ||
                0;
            const scrollTop =
                (this.scrollableElement as any).pageYOffset ||
                (this.scrollableElement as any).scrollTop ||
                0;

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
