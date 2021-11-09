import * as React from 'react';
import { MdClose } from 'react-icons/md';
import { bem } from '../../utils';
import { Text } from '../Text';
import { ENTER_KEY } from '../../constants';
import styles from './Tag.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Value that helps us to understand if the component is currently selected or not. */
    isSelected?: boolean;
    /** Color is assigned to a background color of a wrapper */
    bgColor?: string;
    /** Max-width of a component */
    maxWidth?: string;
    /** Size of the text */
    size?: 'small' | 'normal' | 'large';
    /** Callback, that is fired when a user clicks on a delete icon */
    onDelete?: () => void;
    /** Callback, that is fired when a user clicks on an element */
    onClick?: () => void;
}

const { block, elem } = bem('Tag', styles);

export const Tag: React.FC<Props> = (props) => {
    const { children, bgColor, maxWidth, size, onDelete, onClick, isSelected, ...rest } = props;

    // Generate title for children that are plain text (without tags)
    // If there is something different from the string (JSX) - children will be of object type.
    const areChildrenString = typeof children === 'string';

    const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();

        onDelete?.();
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        e.stopPropagation();

        if (e.key === ENTER_KEY) {
            onClick?.();
        }
    };

    return (
        <div
            {...rest}
            {...block({ ...props, clickable: !!onClick })}
            {...(onClick && { onClick, tabIndex: 0, role: 'button', onKeyPress: handleKeyPress })}
            style={{
                backgroundColor: bgColor,
                maxWidth,
            }}
        >
            <Text size={size} {...(areChildrenString && { title: children })} {...elem('text')}>
                {children}
            </Text>
            {onDelete && (
                <button onClick={handleDeleteClick} type="button" {...elem('deleteButton')}>
                    <MdClose size="15px" />
                </button>
            )}
        </div>
    );
};

Tag.displayName = 'Tag';

Tag.defaultProps = {
    isSelected: false,
    bgColor: 'var(--color-background)',
    maxWidth: 'fit-content',
    size: 'normal',
    onDelete: undefined,
    onClick: undefined,
};
