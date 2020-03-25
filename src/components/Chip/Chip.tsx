import * as React from 'react';
import { bem } from '../../utils';
import styles from './Chip.scss';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    /** The content of the chip: it is expected to be short text possibly accompanied by an icon */
    children: NotEmptyReactNode;
}

const { block } = bem('Chip', styles);

export const Chip: React.FC<Props> = (props) => {
    const { children, ...rest } = props;

    return (
        <span {...rest} {...block(props)}>
            {children}
        </span>
    );
};

Chip.displayName = 'Chip';
