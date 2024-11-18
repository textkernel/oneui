import * as React from 'react';
import { PillButton, PillButtonProps } from './PillButton';
import { PillButtonEnhanced, PillButtonEnhancedProps } from './PillButtonEnhanced';
import { PillDropdown, PillDropdownChildrenParams } from './PillDropdown';
import { DropdownContent, DropdownPortal, DropdownRoot } from '../Dropdown';

export interface ClassicButtonProps extends Omit<PillButtonProps, 'toggleDropdown' | 'children'> {
    /** Trigger button variant */
    variant?: 'classic';
}

export interface EnhancedButtonProps<PriorityItemValue>
    extends Omit<PillButtonEnhancedProps<PriorityItemValue>, 'toggleDropdown' | 'children'> {
    /** Trigger button variant */
    variant: 'enhanced';
}

export type Props<PriorityItemValue> = (
    | ClassicButtonProps
    | EnhancedButtonProps<PriorityItemValue>
) & {
    /** The dropdown content renderer function. It is called with:
     *   * close {function} that closes the dropdown
     *   * innerPadding {string} that can be applied inside the component to set consistent padding
     */
    children: (params: PillDropdownChildrenParams) => React.ReactNode;
    /** a function that is called when the dropdown closes via done-button-click, window-click or ESC */
    onClose?: () => void;
    /** ref for pill button */
    ref?: React.RefObject<HTMLElement>;
    /** ref for pill dropdown */
    dropdownRef?: React.RefObject<HTMLElement>;
    /** whether or not to add a padding to the dropdown container.
     * It is useful if you need to add elements that stretch to the edge of the container.
     * You can use the CSS variable --pill-dropdown-padding to add padding as required.
     * */
    noPaddingInDropdown?: boolean;
    /** other props that need to be applied to the dropdown container */
    additionalDropdownProps?: object;
};

/**
 * This component renders a PillButton and a PillDropdown, under the hood. These in turn are linked via PopupBase.
 *
 * * Most props, including 'rest' are applied to PillButton.
 * * 'children', 'noPaddingInDropdown' and 'additionalDropdownProps' are used in PillDropdown.
 * * 'ref' and 'dropdownRef' for used in PopupBase.
 */
/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint */
export const Pill = <PriorityItemValue extends unknown>({
    variant = 'classic',
    onClear,
    name,
    ref,
    content = null,
    children,
    dropdownRef,
    noPaddingInDropdown = false,
    additionalDropdownProps = {},
    onClose,
    ...rest
}: Props<PriorityItemValue>) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const closeDropdown = () => {
        onClose?.();
    };

    const handleOpenStateChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            onClose?.();
        }
    };

    return (
        <DropdownRoot onOpenChange={handleOpenStateChange} modal={false}>
            {variant === 'classic' ? (
                <PillButton
                    name={name}
                    content={content}
                    onClear={onClear}
                    isOpen={isOpen}
                    {...rest}
                />
            ) : (
                <PillButtonEnhanced
                    name={name}
                    content={content}
                    onClear={onClear}
                    isOpen={isOpen}
                    {...rest}
                />
            )}
            <DropdownPortal>
                <DropdownContent asChild>
                    <PillDropdown
                        ref={dropdownRef}
                        close={closeDropdown}
                        noPadding={noPaddingInDropdown}
                        {...additionalDropdownProps}
                    >
                        {children}
                    </PillDropdown>
                </DropdownContent>
            </DropdownPortal>
        </DropdownRoot>
    );
};
