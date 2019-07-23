import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { FieldWrapper, Text } from '@textkernel/oneui';

storiesOf('FieldWrapper', module)
    .addDecorator(withKnobs)
    .add('FieldWrapper', () => {
        return (
            <FieldWrapper
                clearLabel={text('Clear button label', 'Clear')}
                onClear={() => console.log('onClear has been called')}
                showClearButton={boolean('Show clear button', true)}
                isFocused={boolean('Is focused', false)}
                style={{ width: '600px' }}
            >
                <Text style={{ margin: 'var(--spacing-normal)' }} context="muted">
                    {text('Child 1', 'Some text or elements to be rendered within the wrapper.')}
                </Text>
                <input
                    style={{ margin: 'var(--spacing-normal)' }}
                    placeholder={text('Child 2', 'Add input field if needed...')}
                />
                <Text style={{ margin: 'var(--spacing-normal)', fontWeight: 'bold' }}>
                    {text(
                        'Child 3',
                        'Note: for optimal rendering all child elements should have spacing-normal margins.'
                    )}
                </Text>
            </FieldWrapper>
        );
    });
