import * as React from 'react';

export interface Props extends React.HTMLAttributes<HTMLTableSectionElement> {
    /** The content of the Table Head (`<thead/>`) */
    children: React.ReactNode;
}

export const TableHead = ({ children, ...rest }: Props) => <thead {...rest}>{children}</thead>;

TableHead.displayName = 'TableHead';
