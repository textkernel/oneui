import * as React from 'react';
import { bem } from '../../../utils';
import styles from './TableHeaderCell.scss';

export interface Props extends React.HTMLAttributes<HTMLTableCellElement> {
    /** The content of the Table Header Cell (`<th/>`) */
    children: React.ReactNode;
}

const { block } = bem('TableHeaderCell', styles);

export const TableHeaderCell = ({ children, ...rest }: Props) => (
    <th {...block({ ...rest })} {...rest}>
        {children}
    </th>
);

TableHeaderCell.displayName = 'TableHeaderCell';
