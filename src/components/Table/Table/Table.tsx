import * as React from 'react';
import { bem } from '../../../utils';
import styles from './Table.scss';

export interface Props extends React.HTMLAttributes<HTMLTableElement> {
    /** The content of the Table (<table />)  */
    children: React.ReactNode;
}

const { block } = bem('Table', styles);

export const Table = ({ children, ...rest }: Props) => (
    <table {...block({ ...rest })} {...rest}>
        {children}
    </table>
);

Table.displayName = 'Table';
