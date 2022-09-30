import * as React from 'react';
import { MdClose } from 'react-icons/md';
import { bem } from '../../utils';
import { Text } from '../Text';
import { ENTER_KEY } from '../../constants';
import styles from './Tag.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Value that helps us to understand if the component is currently selected or not. */
    isSelected?: boolean;
    /** Color is assigned to a background color of a wrapper */
    bgColor?: string;
    /** Max-width of a component */
    maxWidth?: string;
    /** Size of the text */
    size?: 'small' | 'normal' | 'large';
    /** Callback, that is fired when a user clicks on a delete icon */
    onDelete?: (e: React.KeyboardEvent | React.MouseEvent) => void;
    /** Callback, that is fired when a user clicks on an element */
    onClick?: (e: React.KeyboardEvent | React.MouseEvent) => void;
    /** A css class to be applied to the content (child) */
    contentClassName?: string;
    /** A css style to be applied to the content (child) */
    contentStyle?: React.CSSProperties;
}

const { block, elem } = bem('Tag', styles);

export const Tag = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {
        children,
        bgColor,
        maxWidth,
        size,
        onDelete,
        onClick,
        isSelected,
        contentClassName,
        contentStyle,
        ...rest
    } = props;

    // Generate title for children that are plain text (without tags)
    // If there is something different from the string (JSX) - children will be of object type.
    const areChildrenString = typeof children === 'string';

    const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();

        onDelete?.(e);
    };

    const handleTagKeyPress = (e: React.KeyboardEvent) => {
        e.stopPropagation();

        if (e.key === ENTER_KEY) {
            onClick?.(e);
        }
    };

    const handleDeleteButtonKeyPress = (e: React.KeyboardEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.key === ENTER_KEY) {
            onDelete?.(e);
        }
    };

    return (
        <div
            {...rest}
            ref={ref}
            {...block({ ...props, clickable: !!onClick })}
            {...(onClick && {
                onClick,
                tabIndex: 0,
                role: 'button',
                onKeyPress: handleTagKeyPress,
            })}
            style={{
                backgroundColor: bgColor,
                maxWidth,
            }}
        >
            <Text
                size={size}
                {...(areChildrenString && { title: children })}
                {...elem('text', { elemClassName: contentClassName })}
                style={contentStyle}
            >
                {children}
            </Text>
            {onDelete && (
                <button
                    onClick={handleDeleteClick}
                    onKeyDown={handleDeleteButtonKeyPress}
                    type="button"
                    {...elem('deleteButton')}
                >
                    <MdClose size="15px" />
                </button>
            )}
        </div>
    );
});

Tag.displayName = 'Tag';

Tag.defaultProps = {
    isSelected: false,
    bgColor: 'var(--color-background)',
    maxWidth: 'fit-content',
    size: 'normal',
    onDelete: undefined,
    onClick: undefined,
};
