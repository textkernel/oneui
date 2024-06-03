import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from '..';

describe('<Table> and its sub elements', () => {
    it('should render correctly', () => {
        const { container } = render(
            <Table>
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
                            Services/Icore Healthcare Division, Clinical Sales Representative *
                            Managed outside sales of New York&apos;s tri-state territory for
                            Injectable Medications. * Consulted Hospital Staff; Endocrinologists,
                            and Gastroenterologists on injectable Growth Hormone, a Magellan Health
                            Services/Icore Healthcare Division, Clinical Sales Representative *
                            Managed outside sales of New York&apos;s tri-state territory for
                            Injectable Medications. * Consulted Hospital Staff; Endocrinologists,
                            and Gastroenterologists on injectable Growth
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );

        expect(container).toMatchSnapshot();
    });
});
