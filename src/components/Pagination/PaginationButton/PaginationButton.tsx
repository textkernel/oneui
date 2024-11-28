import * as React from 'react';
import { bem } from '../../../utils';
import { Button } from '../../Buttons';
import styles from './PaginationButton.scss';

export interface Props extends React.HTMLAttributes<HTMLElement> {
    children: number;
    isActive?: boolean;
}

const { block } = bem('PaginationButton', styles);

export const PaginationButton: React.FC<Props> = ({ children, isActive = false, ...rest }) => (
    <Button
        {...rest}
        variant={isActive ? 'filled' : 'ghost'}
        {...block({ isActive })}
        aria-current={isActive ? 'page' : null}
    >
        {children}
    </Button>
);

PaginationButton.displayName = 'PaginationButton';
