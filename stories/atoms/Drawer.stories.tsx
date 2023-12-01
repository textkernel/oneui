import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from '@textkernel/oneui';

const meta: Meta<typeof Drawer> = {
    title: 'Atoms/Drawer',
    component: Drawer,
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const _Drawer: Story = {
    name: 'Drawer',
    args: {
        isShown: true,
        isExpanded: true,
        isPrimary: false,
        title: '12/13 processed (2 need review, 1 failed)',
        children: `
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Ipsum Ipsum
        Ipsum has been the industrys standard dummy text ever since the 1500s, w unknown unknown
        unknown printer took a galley of type and scrambled it to make a type spe has survived
        not only five centuries, but also the leap into elec typesetting, typesetting, remaining
        essentially unchanged. It was popularised in the 19 with the with the release of
        Letraset sheets containing Lorem Ipsum passages, recently with desktop publishing
        software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
        dummy text of the printing and typesetting industry. Ipsum Ipsum has been the industrys
        standard dummy text ever since the 1500s, w unknown unknown printer took a galley of
        type and scrambled it to make a type spe has survived not only five centuries, but also
        the leap into elec typesetting, typesetting, remaining essentially unchanged. It was
        popularised in the 19 with the with the release of Letraset sheets containing Lorem
        Ipsum passages, recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
        `,
    },
    render: (args) => <Drawer {...args} />,
};
