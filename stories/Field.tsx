import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Field, Input } from '@textkernel/oneui';

storiesOf('Molecules/Field', module)
    .addDecorator(withKnobs)
    .add('Field with label', () => (
        <Field labelText={text('Label', 'Some label')}>
            <Input />
        </Field>
    ));
