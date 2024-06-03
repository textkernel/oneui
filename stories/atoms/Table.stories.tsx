import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableHeaderCell,
} from '@textkernel/oneui';

const meta: Meta<typeof Table> = {
    title: 'Atoms/Table',
    component: Table,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { TableHead, TableBody, TableRow, TableHeaderCell, TableCell } as any,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const _Table: Story = {
    name: 'Props in Table',
    render: (args) => (
        <Table {...args}>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>column header 1</TableHeaderCell>
                    <TableHeaderCell>column header 2</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableHeaderCell>Row header 1</TableHeaderCell>
                    <TableCell>Cell 1</TableCell>
                </TableRow>
                <TableRow>
                    <TableHeaderCell>Row header 2</TableHeaderCell>
                    <TableCell>Cell 2 with some longer text</TableCell>
                </TableRow>
                <TableRow>
                    <TableHeaderCell title="Row header 3 that is a bit longer then the rest">
                        Row header 3 that is a bit longer then the rest
                    </TableHeaderCell>
                    <TableCell>
                        Cell 3 with some very very long text | 03/05 - 11/2010 Magellan Health
                        Services/Icore Healthcare Division, Clinical Sales Representative * Managed
                        outside sales of New York&apos;s tri-state territory for Injectable
                        Medications. * Consulted Hospital Staff; Endocrinologists, and
                        Gastroenterologists on injectable Growth Hormone, a Magellan Health
                        Services/Icore Healthcare Division, Clinical Sales Representative * Managed
                        outside sales of New York&apos;s tri-state territory for Injectable
                        Medications. * Consulted Hospital Staff; Endocrinologists, and
                        Gastroenterologists on injectable Growth
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    ),
};
