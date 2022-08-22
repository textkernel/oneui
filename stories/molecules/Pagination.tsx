import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pagination } from '@textkernel/oneui';

export default {
    title: 'Molecules/Pagination',
    component: Pagination,
} as ComponentMeta<typeof Pagination>;

export const _Pagination: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;
_Pagination.args = {
    align: 'center',
    currentPage: 6,
    maxPageButtons: 8,
    totalPages: 25,
    prevLabel: 'Previous',
    nextLabel: 'Next',
};
