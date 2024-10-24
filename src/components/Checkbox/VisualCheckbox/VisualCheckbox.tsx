import React from 'react';
import { bem } from '../../../utils';
import styles from './VisualCheckbox.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** checkbox state */
    checked: boolean;
}
const { block } = bem('VisualCheckbox', styles);

export const VisualCheckbox = ({ checked, ...rest }: Props) => (
    <div {...block({ checked, rest })} {...rest}>
        <svg width="12px" height="8px" viewBox="0 0 12 9" role="img" aria-hidden="true">
            {checked === undefined || (checked && <polyline points="1.5 5 4 8 10.5 2" />)}
        </svg>
    </div>
);

VisualCheckbox.displayName = 'VisualCheckbox';
