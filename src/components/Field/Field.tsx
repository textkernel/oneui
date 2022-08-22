import * as React from 'react';
import { bem } from '../../utils';
import styles from './Field.scss';

const { block, elem } = bem('Field', styles);

export interface Props extends React.HTMLAttributes<HTMLLabelElement> {
    /** Label text for the input */
    labelText: string;
    /** Component to be rendered inside the field */
    children: React.ReactNode;
}

export const Field: React.FC<Props> = ({ labelText, children, ...rest }) => (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label {...rest} {...block()}>
        <p {...elem('label')}>{labelText}</p>
        {children}
    </label>
);

Field.displayName = 'Field';
