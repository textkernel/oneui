import { HighlighterControl } from '../HighlighterControl';

describe('HighlighterControl', () => {
    window.scrollTo = () => {};
    const createOnMatchCallback = (keyword) => {
        return (node, onMatch) => {
            if (node.textContent === keyword) {
                const newNode = document.createElement('mark');
                newNode.innerHTML = node.textContent;
                onMatch(newNode);
                node.replaceWith(newNode);
            }
        };
    };
    const html = `
        <div>
            python
            <p>python test js js</p>
            <h1>
                <p>
                    <p>python</p>
                <div>python python</div>
                    <p>python</p>
                </p>
            </h1>
        </div>java
    `;
    describe('#constructor()', () => {
        it('should create an instance with default options', () => {
            const root = document.createElement('div');
            expect(() => new HighlighterControl({ root })).not.toThrow();
        });
    });
    describe('#comparePositionTwoNodes()', () => {
        it('should correct compare vertical position', () => {
            const firstNode = document.createElement('div');
            firstNode.getBoundingClientRect = jest.fn(() => ({
                top: 10,
                left: 40,
            }));
            const secondNode = document.createElement('div');
            secondNode.getBoundingClientRect = jest.fn(() => ({
                top: 20,
                left: 10,
            }));
            HighlighterControl.comparePositionTwoNodes(firstNode, secondNode);
            expect(
                HighlighterControl.comparePositionTwoNodes(firstNode, secondNode) > 0
            ).toBeFalsy();
        });
        it('should correct compare vertical position in nodes in different order', () => {
            const firstNode = document.createElement('div');
            firstNode.getBoundingClientRect = jest.fn(() => ({
                top: 20,
                left: 40,
            }));
            const secondNode = document.createElement('div');
            secondNode.getBoundingClientRect = jest.fn(() => ({
                top: 10,
                left: 10,
            }));
            HighlighterControl.comparePositionTwoNodes(firstNode, secondNode);
            expect(
                HighlighterControl.comparePositionTwoNodes(firstNode, secondNode) > 0
            ).toBeTruthy();
        });
        it('should correct compare horizontal position', () => {
            const firstNode = document.createElement('div');
            firstNode.getBoundingClientRect = jest.fn(() => ({
                top: 10,
                left: 20,
            }));
            const secondNode = document.createElement('div');
            secondNode.getBoundingClientRect = jest.fn(() => ({
                top: 10,
                left: 10,
            }));
            HighlighterControl.comparePositionTwoNodes(firstNode, secondNode);
            expect(
                HighlighterControl.comparePositionTwoNodes(firstNode, secondNode) > 0
            ).toBeTruthy();
        });
    });
    describe('#sortNodesByAppearance()', () => {
        it("should correct compare position of node's list", () => {
            const firstNode = document.createElement('div');
            firstNode.getBoundingClientRect = jest.fn(() => ({
                top: 30,
                left: 40,
            }));
            const secondNode = document.createElement('span');
            secondNode.getBoundingClientRect = jest.fn(() => ({
                top: 10,
                left: 10,
            }));
            const thirdNode = document.createElement('a');
            thirdNode.getBoundingClientRect = jest.fn(() => ({
                top: 30,
                left: 20,
            }));
            expect(
                HighlighterControl.sortNodesByAppearance([firstNode, secondNode, thirdNode])
            ).toEqual([secondNode, thirdNode, firstNode]);
        });
    });
    describe('#findKeywordInNodes()', () => {
        it('should iterate through nodes correctly', () => {
            const callback = jest.fn();
            const root = document.createElement('div');
            root.innerHTML = html;
            const highlighterControl = new HighlighterControl({ root });
            highlighterControl.findKeywordInNodes('python', callback);
            expect(callback).toBeCalledTimes(15);
        });
        it('should highlight nodes correctly', () => {
            const root = document.createElement('div');
            root.innerHTML = html;
            const highlighterControl = new HighlighterControl({ root });
            highlighterControl.findKeywordInNodes('python', createOnMatchCallback('python'));
            const highlightedItems = root.querySelectorAll('[data-highlight-keyword="python"]');
            expect(highlightedItems.length).toBe(2);
            expect(highlightedItems[0].textContent).toBe('python');
            expect(highlightedItems[1].textContent).toBe('python');
        });
    });
    describe('#selectKeyword()', () => {
        it('should select highlight in correct order', () => {
            const root = document.createElement('div');
            root.innerHTML = html;
            const highlighterControl = new HighlighterControl({ root });
            highlighterControl.findKeywordInNodes('python', createOnMatchCallback('python'));
            const highlightedItems = root.querySelectorAll('[data-highlight-keyword="python"]');
            highlightedItems[0].getBoundingClientRect = jest.fn(() => ({
                top: 30,
                left: 40,
            }));
            highlightedItems[1].getBoundingClientRect = jest.fn(() => ({
                top: 20,
                left: 10,
            }));
            highlighterControl.selectKeyword('python');
            expect(highlightedItems[0].getAttribute('data-highlight-selected')).toBe(null);
            expect(highlightedItems[1].getAttribute('data-highlight-selected')).toBe('selected');
            highlighterControl.selectKeyword('python');
            expect(highlightedItems[0].getAttribute('data-highlight-selected')).toBe('selected');
            expect(highlightedItems[1].getAttribute('data-highlight-selected')).toBe(
                'not_selected'
            );
            highlighterControl.selectKeyword('python');
            expect(highlightedItems[0].getAttribute('data-highlight-selected')).toBe(
                'not_selected'
            );
            expect(highlightedItems[1].getAttribute('data-highlight-selected')).toBe('selected');
        });
    });
    describe('#selectKeyword()', () => {
        it("should unselect highlight if keyword doesn't exist", () => {
            const root = document.createElement('div');
            root.innerHTML = html;
            const highlighterControl = new HighlighterControl({ root });
            highlighterControl.findKeywordInNodes('python', createOnMatchCallback('python'));
            const highlightedItems = root.querySelectorAll('[data-highlight-keyword="python"]');
            highlightedItems[0].getBoundingClientRect = jest.fn(() => ({
                top: 30,
                left: 40,
            }));
            highlightedItems[1].getBoundingClientRect = jest.fn(() => ({
                top: 20,
                left: 10,
            }));
            highlighterControl.selectKeyword('python');
            expect(highlightedItems[0].getAttribute('data-highlight-selected')).toBe(null);
            expect(highlightedItems[1].getAttribute('data-highlight-selected')).toBe('selected');
            highlighterControl.selectKeyword('not_exist');
            expect(highlightedItems[0].getAttribute('data-highlight-selected')).toBe(null);
            expect(highlightedItems[1].getAttribute('data-highlight-selected')).toBe(
                'not_selected'
            );
        });
    });
});
