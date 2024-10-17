import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VisualCheckbox } from '@textkernel/oneui';

const meta: Meta<typeof VisualCheckbox> = {
    title: 'Molecules/Checkbox/VisualCheckbox',
    component: VisualCheckbox,
};

export default meta;

type Story = StoryObj<typeof VisualCheckbox>;

export const VisualCheckboxStory: Story = {
    name: 'VisualCheckbox',
    args: { checked: false },
    render: (args) => <VisualCheckbox {...args} />,
};
