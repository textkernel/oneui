import * as React from 'react';
import Close from '@material-design-icons/svg/round/close.svg';

import { bem } from '../../utils';
import { Text } from '../Text';
import styles from './SelectedItemBadge.scss';
import { DropdownContent, DropdownRoot, DropdownTrigger, SingleSelectItemProps } from '../Dropdown';
import { PrioritySelector, PrioritySelectorProps } from '../PrioritySelector';

export interface Props<PriorityItemValue>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Children nodes to be rendered within the Dropdown,
     *  which is triggered by the main button
     * */
    children?: (
        | React.ReactElement<SingleSelectItemProps<PriorityItemValue>>
        | React.ReactElement<SingleSelectItemProps<PriorityItemValue>>[]
    )[];
    /** Label of the currently selected option item from filter */
    label: React.ReactNode;
    /** An additional label displayed next to the main label (e.g., the number of synonyms) */
    additionalLabel?: React.ReactNode;
    /** Function to be called when the delete button is clicked. */
    onDelete?: (e: React.KeyboardEvent | React.MouseEvent) => void;
    /** Boolean indicating whether the whole badge should be disabled. */
    isDisabled?: boolean;
    /** Main button label name for ARIA labelling */
    buttonLabel?: string;
    /** Delete button label name for ARIA labelling */
    deleteButtonLabel?: string;
    /** props for PrioritySelector */
    priority?: PrioritySelectorProps<PriorityItemValue>;
    /** Ref element used to make the width of the Content equal to the parent width */
    refElement?: React.RefObject<HTMLElement | null>;
}

const { block, elem } = bem('SelectedItemBadge', styles);

export const SelectedItemBadge = React.forwardRef<HTMLElement, Props<string>>(
    (
        {
            children,
            label,
            additionalLabel,
            isDisabled = false,
            onDelete,
            buttonLabel,
            deleteButtonLabel,
            priority,
            refElement,
            ...rest
        },
        ref
    ) => {
        const badgeRef = React.useRef<HTMLElement>(null);

        const hasPriorityList = priority && priority.list.length > 0;

        const handleOnDelete = (e: React.KeyboardEvent | React.MouseEvent) => {
            e.stopPropagation();
            onDelete?.(e);
        };

        return (
            <div {...rest} {...block()} ref={badgeRef || ref}>
                {hasPriorityList && <PrioritySelector {...priority} parentRef={badgeRef} />}
                {children ? (
                    <DropdownRoot>
                        <DropdownTrigger asChild>
                            <button
                                aria-label={buttonLabel}
                                disabled={isDisabled}
                                type="button"
                                {...elem('optionButton')}
                            >
                                <Text inline size="small" {...elem('valueText')}>
                                    {label}
                                </Text>
                                {additionalLabel && (
                                    <Text inline size="small" {...elem('optionText')}>
                                        {additionalLabel}
                                    </Text>
                                )}
                            </button>
                        </DropdownTrigger>
                        <DropdownContent
                            {...elem('badgeDropdownList')}
                            sideOffset={6}
                            alignOffset={priority ? -32 : 0}
                            refElement={badgeRef}
                        >
                            {children}
                        </DropdownContent>
                    </DropdownRoot>
                ) : (
                    <div {...elem('valueContainer')}>
                        <Text inline size="small" {...elem('valueText')}>
                            {label}
                        </Text>
                        {additionalLabel && (
                            <Text inline size="small" {...elem('optionText')}>
                                {additionalLabel}
                            </Text>
                        )}
                    </div>
                )}
                {onDelete && (
                    <button
                        aria-label={deleteButtonLabel}
                        disabled={isDisabled}
                        onClick={handleOnDelete}
                        type="button"
                        {...elem('deleteButton')}
                    >
                        <Close viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }} />
                    </button>
                )}
            </div>
        );
    }
);
