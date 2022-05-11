import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { Checkbox, Text } from '@textkernel/oneui';

storiesOf('Molecules|Checkbox', module)
    .addDecorator(withKnobs)
    .add('Checkbox as controlled component', () => {
        const [checked, setChecked] = React.useState(false);

        const handleChange = (e) => {
            console.log('Checkbox state changed', e);
            setChecked(e.target.checked);
        };

        return (
            <Checkbox
                disabled={boolean('Disabled', false)}
                id={text('Id', 'checkbox-1')}
                onChange={handleChange}
                checked={checked}
                asFlexbox={boolean('Render in flexbox', false)}
            >
                {text('Checkbox label', 'Select me!')}
            </Checkbox>
        );
    })
    .add('Checkbox as uncontrolled component', () => (
        <Checkbox
            disabled={boolean('Disabled', false)}
            id={text('Id', 'checkbox-1')}
            onChange={(e) => console.log('Checkbox state changed', e)}
            asFlexbox={boolean('Render in flexbox', false)}
            defaultChecked
        >
            {text('Checkbox label', 'Select me!')}
        </Checkbox>
    ))
    .add('Checkbox with long label', () => (
        <Checkbox
            disabled={boolean('Disabled', false)}
            id={text('Id', 'checkbox-1')}
            onChange={(e) => console.log('Checkbox state changed', e)}
            asFlexbox={boolean('Render in flexbox', false)}
            defaultChecked
            style={{ width: '150px' }}
        >
            {text(
                'Checkbox label',
                'This is a longer label text. Change flexbox rendering to see how it changes'
            )}
        </Checkbox>
    ))
    .add('Checkbox with not just string as label', () => (
        <Checkbox
            disabled={boolean('Disabled', false)}
            id={text('Id', 'checkbox-1')}
            asFlexbox={boolean('Render in flexbox', false)}
            onChange={(e) => console.log('Checkbox state changed', e)}
        >
            <Text inline style={{ color: 'turquoise' }} className="test-class">
                {text('Checkbox label', 'Select me!')}
            </Text>
        </Checkbox>
    ));
