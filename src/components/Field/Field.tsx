import React from 'react';
import { bem } from '../../utils';
import styles from './Field.scss';

const { block, elem } = bem('Field', styles);

type Props = {
    /** Label text for the input */
    labelText: string;
    /** Component to be rendered inside the field */
    children: React.ReactNode;
};

export const Field: React.FC<Props> = ({ labelText, children }) => (
    <div {...block()}>
        <p {...elem('label')}>{labelText}</p>
        {children}
    </div>
);

Field.displayName = 'Field';
