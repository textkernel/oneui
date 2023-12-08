import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@textkernel/oneui';

const meta: Meta<typeof Pagination> = {
    title: 'Molecules/Pagination',
    component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const _Pagination: Story = {
    name: 'Pagination',
    args: {
        align: 'center',
        currentPage: 6,
        maxPageButtons: 8,
        totalPages: 25,
        prevLabel: 'Previous',
        nextLabel: 'Next',
    },
    render: (args) => <Pagination {...args} />,
};
