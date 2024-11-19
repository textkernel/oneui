import * as React from 'react';
import { bem } from '../../../utils';
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

const { block, elem } = bem('PillDropdown', styles);

export const PillDropdown = React.forwardRef<HTMLElement, Props>(
    ({ noPadding = false, children, ...rest }, ref) => (
        <div ref={ref} role="presentation" {...rest} {...block({ noPadding, ...rest })}>
            <div role="dialog" {...elem('dialog')}>
                <div {...elem('content', { noPadding })} role="group">
                    {children}
                </div>
            </div>
        </div>
    )
);

PillDropdown.displayName = 'PillDropdown';
