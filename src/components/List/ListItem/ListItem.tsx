import * as React from 'react';
import { bem } from '../../../utils';
import { Text } from '../../Text';
import { Context } from '../../../constants';
import styles from './ListItem.scss';

export interface Props extends Omit<React.HTMLAttributes<HTMLLIElement>, 'onClick'> {
    /** List Items */
    children?: ReactNode;
    /** A function to be called if the item is clicked */
    onClick?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
    /** Formats this item as selected  */
    isSelected?: boolean;
    /** Formats this item as selected  */
    isHighlighted?: boolean;
    /** Format this item as disabled */
    disabled?: boolean;
    /** formatting context when hovered or selected */
    highlightContext?: Context | 'default';
    /** Ref to access the li element */
    ref?: React.RefObject<HTMLLIElement>;
    /** Item identifier is used in {@link Dropdown} to select/navigate through children */
    value?: unknown;
}

const { block, elem } = bem('ListItem', styles);

export const ListItem: React.FC<Props> = React.forwardRef((props, ref) => {
    const { children, isSelected, isHighlighted, onClick, highlightContext, value, ...rest } =
        props;
    const customBlockMod = { clickable: typeof onClick === 'function' };

    return (
        <li {...rest} ref={ref} {...block({ ...props, ...customBlockMod })}>
            <div onClick={onClick} role="presentation" {...elem('container', props)}>
                {React.Children.map(children, (child) =>
                    typeof child === 'string' ? <Text inline>{child}</Text> : child
                )}
            </div>
        </li>
    );
});

ListItem.displayName = 'ListItem';

ListItem.defaultProps = {
    isSelected: false,
    isHighlighted: false,
    disabled: false,
    highlightContext: 'default',
};
