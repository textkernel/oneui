import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip, IconMatch } from '@textkernel/oneui';

const meta: Meta<typeof Chip> = {
    title: 'Atoms/Chip',
    component: Chip,
    render: (args) => <Chip {...args} />,
};

export default meta;

type Story = StoryObj<typeof Chip>;

const ChipImplementation = (args) => (
    <>
        <Chip {...args} />
        <Chip>
            <IconMatch />
            &nbsp;Chip with Icon as child
        </Chip>
    </>
);

export const _Chip: Story = {
    args: {
        title: 'This is a title that uses native browser functionality',
        children: 'Chip with title',
    },
    render: (args) => <ChipImplementation {...args} />,
};
