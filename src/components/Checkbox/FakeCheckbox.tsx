import React from 'react';
import { bem } from '../../utils';
import styles from './FakeCheckbox.scss';

export interface Props {
    checked: boolean;
}
const { block } = bem('FakeCheckbox', styles);

export const FakeCheckbox = ({ checked }) => (
    <div {...block({ checked })}>
        <svg width="12px" height="8px" viewBox="0 0 12 9" role="img" aria-hidden="true">
            {checked === undefined || (checked && <polyline points="1.5 5 4 8 10.5 2" />)}
        </svg>
    </div>
);
