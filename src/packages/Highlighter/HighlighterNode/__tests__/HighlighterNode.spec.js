/* eslint-disable import/no-extraneous-dependencies */
import intersection from 'lodash/intersection';
import { HighlighterCore } from '../../HighlighterCore';
import { HighlighterNode } from '../HighlighterNode';

describe('HighlighterNode', () => {
    const highlightRenderer = (keyword) => {
        const node = document.createElement('mark');
        node.innerHTML = keyword;
        return node;
    };
    describe('#constructor()', () => {
        it('should create an instance with default options', () => {
            const highlighterCore = new HighlighterCore([]);
            expect(() => new HighlighterNode({ highlightRenderer, highlighterCore })).not.toThrow();
        });
    });
    describe('#generateColor()', () => {
        it('should generate color', () => {
            const color = HighlighterNode.generateColor(1);
            expect(color).toMatch('#D6F481');
        });

        it('should generate 12 distinct colors', () => {
            const numbers = Array.from({ length: 100 }, (e, i) => i);
            const colors = numbers.map((i) => HighlighterNode.generateColor(i));
            const amountDifferentColors = intersection(colors).length;

            expect(amountDifferentColors).toBe(12);
        });
    });
    describe('#applyStylesForNode()', () => {
        it('should apply styles for node', () => {
            const node = document.createElement('div');
            const styles = {
                color: 'red',
                backgroundColor: 'green',
            };
            HighlighterNode.applyStylesForNode(node, styles);
            expect(node.outerHTML).toBe('<div style="color: red; background-color: green;"></div>');
        });
    });
    describe('#find()', () => {
        it('should highlight keyword if it exist in node', () => {
            const highlighterCore = new HighlighterCore(['ipsum', 'dolor']);
            const onMatch = jest.fn();
            const wrapper = document.createElement('div');
            wrapper.innerHTML = 'Lorem ipsum dolor sit amet';
            const highlighterNode = new HighlighterNode({ highlightRenderer, highlighterCore });
            highlighterNode.find(wrapper.firstChild, onMatch);
            expect(onMatch).toBeCalledTimes(2);
            expect(wrapper.innerHTML).toBe('Lorem <mark>ipsum</mark> <mark>dolor</mark> sit amet');
        });
        it("should not highlight keyword if it doesn't exist in node", () => {
            const highlighterCore = new HighlighterCore(['ipsum', 'dolor']);
            const wrapper = document.createElement('div');
            const onMatch = jest.fn();
            wrapper.innerHTML = 'Excepteur sint occaecat cupidatat non proident';
            const highlighterNode = new HighlighterNode({ highlightRenderer, highlighterCore });
            highlighterNode.find(wrapper.firstChild, onMatch);
            expect(onMatch).toBeCalledTimes(0);
            expect(wrapper.innerHTML).toBe('Excepteur sint occaecat cupidatat non proident');
        });
    });
});
