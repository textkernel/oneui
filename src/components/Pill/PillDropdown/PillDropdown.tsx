import * as React from 'react';
import { bem } from '../../../utils';
import { DropdownContent } from '../../Dropdown';
import styles from './PillDropdown.scss';

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Content that will be displayed inside of PillDropdown */
    children: React.ReactNode;
    /** whether or not to add a padding to the dropdown container.
     * It is useful if you need to add elements that stretch to the edge of the container.
     * You can use the CSS variable --pill-dropdown-padding to add padding as required.
     * */
    noPadding?: boolean;
}

const { block } = bem('PillDropdown', styles);

export const PillDropdown = React.forwardRef<HTMLElement, Props>(
    ({ noPadding = false, children, ...rest }, ref) => (
        <DropdownContent ref={ref} {...rest} {...block({ noPadding, ...rest })}>
            {children}
        </DropdownContent>
    )
);

PillDropdown.displayName = 'PillDropdown';
