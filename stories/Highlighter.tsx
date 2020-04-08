import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { StringHighlighter, HighlighterCoreAccuracy } from '@textkernel/oneui';

storiesOf('Atoms|Highlighter', module)
    .addDecorator(withKnobs)
    .add('Highlighter', () => {
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
                accuracy={select('Accuracy', ACCURACY, ACCURACY[0]) as HighlighterCoreAccuracy}
                ignoreCase={boolean('ignoreCase', true)}
                ignoreDiacritics={boolean('ignoreDiacritics', true)}
                highlightRenderer={({ substring, ...substringProps }) => (
                    <b {...substringProps} style={{ backgroundColor: 'lightyellow' }}>
                        {substring}
                    </b>
                )}
            />
        );
    });
