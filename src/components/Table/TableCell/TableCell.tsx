import * as React from 'react';
import { bem } from '../../../utils';
import styles from './TableCell.scss';

export interface Props extends React.HTMLAttributes<HTMLTableCellElement> {
    /** The content of the Table Cell (<td />) */
    children: React.ReactNode;
}

const { block } = bem('TableCell', styles);

export const TableCell = ({ children, ...rest }: Props) => (
    <td {...block({ ...rest })} {...rest}>
        {children}
    </td>
);

TableCell.displayName = 'TableCell';
