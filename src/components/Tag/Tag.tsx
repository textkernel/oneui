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
    onDelete?: () => void;
    /** Callback, that is fired when a user clicks on an element */
    onClick?: () => void;
    /** A css class to be applied to the content (child) */
    contentClassName?: string;
    /** A css style to be applied to the content (child) */
    contentStyle?: React.CSSProperties;
}

const { block, elem } = bem('Tag', styles);

export const Tag = React.forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            bgColor = 'var(--color-background)',
            maxWidth = 'fit-content',
            size = 'normal',
            onDelete = undefined,
            onClick = undefined,
            isSelected = false,
            contentClassName,
            contentStyle,
            ...rest
        },
        ref
    ) => {
        // Generate title for children that are plain text (without tags)
        // If there is something different from the string (JSX) - children will be of object type.
        const areChildrenString = typeof children === 'string';

        const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();

            onDelete?.();
        };

        const handleTagKeyPress = (e: React.KeyboardEvent) => {
            e.stopPropagation();

            if (e.key === ENTER_KEY) {
                onClick?.();
            }
        };

        const handleDeleteButtonKeyPress = (e: React.KeyboardEvent) => {
            e.stopPropagation();
            e.preventDefault();

            if (e.key === ENTER_KEY) {
                onDelete?.();
            }
        };

        return (
            <div
                {...rest}
                ref={ref}
                {...block({ isSelected, clickable: !!onClick })}
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
    }
);

Tag.displayName = 'Tag';
