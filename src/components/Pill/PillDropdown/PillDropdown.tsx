import * as React from 'react';
import { bem } from '../../../utils';
import { Button } from '../../Buttons';
import styles from './PillDropdown.scss';

export interface PillDropdownChildrenParams {
    /** function that closes the dropdown */
    close?: () => void;
    /** string that can be applied
     * inside the component to set consistent padding
     * */
    innerPadding?: string;
}

export interface Props {
    /** The dropdown content renderer function. It is called with:
     *   * close {function} - see below
     */
    children: (params: PillDropdownChildrenParams) => ReactNode;
    /** function that closes the dropdown */
    close: () => void;
    /** label for the Done button */
    doneLabel: string;
    /** whether or not to add a padding to the dropdown container.
     * It is useful if you need to add elements that stretch to the edge of the container.
     * You can use the CSS variable --pill-dropdown-padding to add padding as required.
     * */
    noPadding?: boolean;
}

const { block, elem } = bem('PillDropdown', styles);

export const PillDropdown = React.forwardRef<HTMLElement, Props>(
    ({ close, doneLabel, noPadding = false, children, ...rest }, ref) => {
        const handleDoneClick = () => {
            if (close) {
                close();
            }
        };

        return (
            <div ref={ref} role="presentation" {...rest} {...block({ noPadding, ...rest })}>
                <div role="dialog" {...elem('dialog')}>
                    <div {...elem('content', { noPadding })}>{children({ close })}</div>
                    <div {...elem('footer')}>
                        <Button isPrimary size="small" onClick={handleDoneClick}>
                            {doneLabel}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
);

PillDropdown.displayName = 'PillDropdown';
