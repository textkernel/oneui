import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import {
    StringHighlighter,
    ReactElementHighlighter,
    HighlighterCoreAccuracy,
} from '@textkernel/oneui';

const HIGHLIGHT_STYLES = {
    backgroundColor: 'lightyellow',
} as CSSStyleDeclaration;

storiesOf('Atoms/Highlighter', module)
    .addDecorator(withKnobs)
    .add('StringHighlighter', () => {
        const ACCURACY = ['exact', 'partial'];
        const someText = text(
            'Placeholder',
            'We are looking for php, java and javascript developer'
        );
        const keywords = text('keywords', 'javascript developer|php|java')
            .split('|')
            .filter((i) => i !== '');
        return (
            <StringHighlighter
                string={someText}
                searchTerms={keywords}
                highlighterCoreOptions={{
                    accuracy: select('Accuracy', ACCURACY, ACCURACY[0]) as HighlighterCoreAccuracy,
                    ignoreCase: boolean('ignoreCase', true),
                    ignoreDiacritics: boolean('ignoreDiacritics', true),
                }}
                highlightRenderer={({ substring, ...substringProps }) => (
                    <b {...substringProps} style={{ backgroundColor: 'lightyellow' }}>
                        {substring}
                    </b>
                )}
            />
        );
    })
    .add('ReactElementHighlighter', () => {
        const ACCURACY = ['exact', 'partial'];
        const isCustomStylesUsed = boolean('Use custom styles', false);
        const keywords = text(
            'keywords',
            'lorem|officia|dolore|dolor|irure dolor|qui officia deserunt'
        )
            .split('|')
            .filter((i) => i !== '');
        return (
            <ReactElementHighlighter
                key={`${keywords}${isCustomStylesUsed}`}
                searchTerms={keywords}
                highlightStyles={isCustomStylesUsed ? HIGHLIGHT_STYLES : undefined}
                highlighterCoreOptions={{
                    accuracy: select('Accuracy', ACCURACY, ACCURACY[0]) as HighlighterCoreAccuracy,
                    ignoreCase: boolean('ignoreCase', true),
                    ignoreDiacritics: boolean('ignoreDiacritics', true),
                }}
                onComplete={(highlighter, result) => {
                    console.log('highlighter', highlighter);
                    console.log('result', result);
                }}
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
            </ReactElementHighlighter>
        );
    });
