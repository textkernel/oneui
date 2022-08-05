import * as React from 'react';
import { Field, Input } from '@textkernel/oneui';

export default {
    title: 'Molecules/Field',
    component: Field,
};

export const _Field = (args) => (
    <Field {...args}>
        <Input />
    </Field>
);
_Field.args = {
    labelText: 'Some label',
};
