import * as React from 'react';
import { bem } from '../../../utils';
import styles from './TableRow.scss';

export interface Props extends React.HTMLAttributes<HTMLTableRowElement> {
    /** The content of the Table Row (<tr />) */
    children: React.ReactNode;
}

const { block } = bem('TableRow', styles);

export const TableRow = ({ children, ...rest }: Props) => (
    <tr {...block({ ...rest })} {...rest}>
        {children}
    </tr>
);

TableRow.displayName = 'TableRow';
