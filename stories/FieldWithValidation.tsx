import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';
import { FieldWithValidation, Input, TextArea } from '@textkernel/oneui';

storiesOf('Molecules|FieldWithValidation', module)
    .addDecorator(withKnobs)
    .add('FieldWithValidation', () => (
        <>
            <div style={{ marginBottom: '10px' }}>
                <FieldWithValidation
                    errorMessage={text('Error message for input field', 'Something wrong')}
                    useTooltip={boolean('Use tooltip for input field', false)}
                >
                    <Input />
                </FieldWithValidation>
            </div>
            <div>
                <FieldWithValidation
                    errorMessage={text('Error message for text field', '')}
                    useTooltip={boolean('Use tooltip for text field', false)}
                >
                    <TextArea />
                </FieldWithValidation>
            </div>
        </>
    ));
