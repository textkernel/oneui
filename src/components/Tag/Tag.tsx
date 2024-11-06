import * as React from 'react';
import Close from '@material-design-icons/svg/round/close.svg';
import { bem } from '../../utils';
import { Text } from '../Text';
import { ENTER_KEY, Size } from '../../constants';
import styles from './Tag.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Value that helps us to understand if the component is currently selected or not. */
    isSelected?: boolean;
    /** Color is assigned to a background color of a wrapper */
    bgColor?: string;
    /** Max-width of a component */
    maxWidth?: string;
    /** Size of the text */
    size?: Size;
    /** Callback, that is fired when a user clicks on a delete icon */
    onDelete?: (e: React.KeyboardEvent | React.MouseEvent) => void;
    /** Callback, that is fired when a user clicks on an element */
    onClick?: (e: React.KeyboardEvent | React.MouseEvent) => void;
    /** A css class to be applied to the content (child) */
    contentClassName?: string;
    /** A css style to be applied to the content (child) */
    contentStyle?: React.CSSProperties;
    /** Close label name for ARIA labelling, it is used when needs to clear data from component */
    closeLabel?: string;
    /** Should tag be disabled or not */
    disabled?: boolean;
}

const { block, elem } = bem('Tag', styles);

export const Tag = React.forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            bgColor,
            maxWidth = 'fit-content',
            size = 'large',
            onDelete = undefined,
            onClick = undefined,
            isSelected = false,
            contentClassName,
            contentStyle,
            closeLabel,
            disabled,
            ...rest
        },
        ref
    ) => {
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

            if (e.key === ENTER_KEY) {
                e.preventDefault();
                onDelete?.(e);
            }
        };

        return (
            <div
                {...rest}
                ref={ref}
                {...block({ isSelected, clickable: !!onClick, ...rest })}
                {...(onClick && {
                    onClick,
                    tabIndex: 0,
                    role: 'button',
                    onKeyPress: handleTagKeyPress,
                })}
                style={{
                    '--bg-color': bgColor,
                    maxWidth,
                }}
                disabled={disabled}
            >
                <Text
                    size={size}
                    {...(areChildrenString && { title: children })}
                    {...elem('text', { elemClassName: contentClassName })}
                    disabled={disabled}
                    style={contentStyle}
                >
                    {children}
                </Text>
                {onDelete && (
                    <button
                        onClick={handleDeleteClick}
                        onKeyDown={handleDeleteButtonKeyPress}
                        type="button"
                        disabled={disabled}
                        {...elem('deleteButton')}
                    >
                        <Close
                            aria-label={closeLabel}
                            style={{ width: '100%', height: '100%' }}
                            viewBox="0 0 24 24"
                        />
                    </button>
                )}
            </div>
        );
    }
);

Tag.displayName = 'Tag';
