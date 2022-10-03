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

export const ThreeStateCheckbox = (args) => {
    type ThreeStateCheckboxState = 'checked' | 'unchecked' | 'mixed';

    const [mainStatus, setMainStatus] = React.useState<ThreeStateCheckboxState>('unchecked');
    const [subOneChecked, setSubOneChecked] = React.useState(false);
    const [subTwoChecked, setSubTwoChecked] = React.useState(false);

    React.useEffect(() => {
        let newStatus: ThreeStateCheckboxState = 'unchecked';

        if ((!subOneChecked && subTwoChecked) || (subOneChecked && !subTwoChecked)) {
            newStatus = 'mixed';
        } else if (subOneChecked && subTwoChecked) {
            newStatus = 'checked';
        }

        if (newStatus !== mainStatus) {
            setMainStatus(newStatus);
        }
    }, [mainStatus, subOneChecked, subTwoChecked]);

    const handleMainCheckboxChange = (e) => {
        console.log('MainCheckbox state changed', e);
        setMainStatus('checked');
        setSubOneChecked(e.target.checked);
        setSubTwoChecked(e.target.checked);
    };

    const handleSubOneCheckboxChange = (e) => {
        console.log('SubOneCheckbox state changed', e);
        setSubOneChecked(e.target.checked);
    };

    const handleSubTowCheckboxChange = (e) => {
        console.log('SubTwoCheckbox state changed', e);
        setSubTwoChecked(e.target.checked);
    };

    return (
        <>
            <Checkbox
                {...args}
                checked={mainStatus === 'checked'}
                onChange={handleMainCheckboxChange}
                indeterminate={mainStatus === 'mixed'}
            >
                Main
            </Checkbox>
            <Checkbox checked={subOneChecked} onChange={handleSubOneCheckboxChange} id="2">
                Sub One
            </Checkbox>
            <Checkbox checked={subTwoChecked} onChange={handleSubTowCheckboxChange} id="3">
                Sub Two
            </Checkbox>
        </>
    );
};
ThreeStateCheckbox.args = {
    disabled: false,
    id: 'checkbox-1',
    asFlexbox: false,
};
