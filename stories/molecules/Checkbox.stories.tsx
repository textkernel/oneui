import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Text } from '@textkernel/oneui';

const meta: Meta<typeof Checkbox> = {
    title: 'Molecules/Checkbox',
    component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const ControlledCheckbox: Story = {
    name: 'Checkbox as controlled component',
    args: {
        disabled: false,
        id: 'checkbox-1',
        asFlexbox: false,
        children: 'Select me!',
    },
    render: (args) => {
        const [checked, setChecked] = React.useState(false);

        const handleChange = (e) => {
            console.log('Checkbox state changed', e);
            setChecked(e.target.checked);
        };

        return <Checkbox checked={checked} onChange={handleChange} {...args} />;
    },
};

export const UncontrolledCheckbox: Story = {
    name: 'Checkbox as uncontrolled component',
    args: {
        disabled: false,
        id: 'checkbox-1',
        asFlexbox: false,
        children: 'Select me!',
        defaultChecked: true,
    },
    render: (args) => <Checkbox {...args} />,
};

export const CheckboxWithLongLabel: Story = {
    name: 'Checkbox with long label',
    args: {
        disabled: false,
        id: 'checkbox-1',
        asFlexbox: false,
        children: 'This is a longer label text. Change flexbox rendering to see how it changes',
        defaultChecked: true,
        style: { width: '150px' },
    },
    render: (args) => <Checkbox {...args} />,
};

export const CheckboxWithNotJustStringAsLabel: Story = {
    name: 'Checkbox with not just string as label',
    args: {
        disabled: false,
        id: 'checkbox-1',
        asFlexbox: false,
        children: (
            <Text inline style={{ color: 'turquoise' }} className="test-class">
                Select me!
            </Text>
        ),
    },
    render: (args) => <Checkbox {...args} />,
};

export const ThreeStateCheckbox: Story = {
    name: 'Three state Checkbox',
    args: {
        disabled: false,
        id: 'checkbox-1',
        asFlexbox: false,
    },
    render: (args) => {
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
            const isNotChecked = mainStatus !== 'checked';
            setSubOneChecked(isNotChecked);
            setSubTwoChecked(isNotChecked);
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
    },
};
