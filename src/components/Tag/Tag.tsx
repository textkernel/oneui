import * as React from 'react';
import { MdClose } from 'react-icons/md';
import { bem } from '../../utils';
import { Text } from '../Text';

import styles from './Tag.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Tag content */
    label: string;
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
    const { label, bgColor, maxWidth, size, onDelete, onClick, isSelected } = props;

    const handleTagClick = (event: Event) => {
        event.stopPropagation();

        onClick?.();
    };

    return (
        <div
            {...block({ className: isSelected && 'selected' })}
            onClick={onClick && handleTagClick}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
            style={{
                backgroundColor: bgColor,
                boxShadow: isSelected ? '0 0 0 2px var(--color-brand)' : 'none',
                maxWidth,
            }}
        >
            <Text size={size} {...elem('Text', { elemClassName: styles.tagText })}>
                {label}
            </Text>
            {onDelete && (
                <div className={styles.iconWrapper}>
                    <MdClose onClick={onDelete} size="15px" />
                </div>
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
