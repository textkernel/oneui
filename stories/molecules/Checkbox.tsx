import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox, Text } from '@textkernel/oneui';

export default {
    title: 'Molecules/Checkbox',
    component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const ControlledTemplate: ComponentStory<typeof Checkbox> = (args) => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (e) => {
        console.log('Checkbox state changed', e);
        setChecked(e.target.checked);
    };

    return <Checkbox checked={checked} onChange={handleChange} {...args} />;
};
const UncontrolledTemplate: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const CheckboxAsUncontrolledComponent = UncontrolledTemplate.bind({});
CheckboxAsUncontrolledComponent.storyName = 'Checkbox as uncontrolled component';
CheckboxAsUncontrolledComponent.args = {
    disabled: false,
    id: 'checkbox-1',
    asFlexbox: false,
    children: 'Select me!',
    defaultChecked: true,
};

export const CheckboxAsControlledComponent = ControlledTemplate.bind({});
CheckboxAsControlledComponent.storyName = 'Checkbox as controlled component';
CheckboxAsControlledComponent.args = {
    disabled: false,
    id: 'checkbox-1',
    asFlexbox: false,
    children: 'Select me!',
};

export const CheckboxWithLongLabel = UncontrolledTemplate.bind({});
CheckboxWithLongLabel.storyName = 'Checkbox with long label';
CheckboxWithLongLabel.args = {
    disabled: false,
    id: 'checkbox-1',
    asFlexbox: false,
    children: 'This is a longer label text. Change flexbox rendering to see how it changes',
    defaultChecked: true,
    style: { width: '150px' },
};

export const CheckboxWithNotJustStringAsLabel = UncontrolledTemplate.bind({});
CheckboxWithNotJustStringAsLabel.storyName = 'Checkbox with not just string as label';
CheckboxWithNotJustStringAsLabel.args = {
    disabled: false,
    id: 'checkbox-1',
    asFlexbox: false,
    children: (
        <Text inline style={{ color: 'turquoise' }} className="test-class">
            Select me!
        </Text>
    ),
};
