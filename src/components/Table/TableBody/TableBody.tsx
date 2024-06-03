import * as React from 'react';

export interface Props extends React.HTMLAttributes<HTMLTableSectionElement> {
    /** The content of the Table Body (<tbody />) */
    children: React.ReactNode;
}

export const TableBody = ({ children, ...rest }: Props) => <tbody {...rest}>{children}</tbody>;

TableBody.displayName = 'TableBody';
