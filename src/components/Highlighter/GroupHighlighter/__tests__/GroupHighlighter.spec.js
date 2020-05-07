import React from 'react';
import { HighlighterControl } from '../../../../packages/@highlighter/control';
import { GroupHighlighter } from '../GroupHighlighter';

describe('GroupHighlighter', () => {
    const keywords = ['lorem', 'officia', 'dolore', 'dolor', 'irure dolor', 'qui officia deserunt'];
    const renderComponent = (props) => {
        return mount(
            <GroupHighlighter
                searchTerms={keywords}
                highlightRenderer={(keyword) => {
                    const node = document.createElement('mark');
                    node.innerText = keyword;
                    return node;
                }}
                onComplete={() => {}}
                {...props}
            >
                <>
                    <h1>Lorem ipsum dolor sit amet</h1>
                    <p>
                        Lorem ipsum dolor sit amet, eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                        officia deserunt mollit anim id est laborum.
                    </p>
                </>
            </GroupHighlighter>
        );
    };

    it('should highlight and return result', (done) => {
        renderComponent({
            onComplete: (highlighter, result, root) => {
                expect(root.outerHTML).toMatchSnapshot();
                expect(result.length).toBe(6);
                expect(highlighter).toBeInstanceOf(HighlighterControl);
                done();
            },
        });
    });
});
