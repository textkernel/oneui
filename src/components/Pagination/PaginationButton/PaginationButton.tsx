import * as React from 'react';
import { bem } from '../../../utils';
import styles from './PaginationButton.scss';
import { Button } from '../../Buttons';

export interface Props extends React.HTMLAttributes<HTMLElement> {
    children: number;
    isActive?: boolean;
}

const { block } = bem('PaginationButton', styles);

export const PaginationButton: React.FC<Props> = ({ children, isActive = false, ...rest }) => {
    return (
        <Button {...rest} isLink {...block(isActive)} aria-current={isActive ? 'page' : null}>
            {children}
        </Button>
    );
};

PaginationButton.displayName = 'PaginationButton';