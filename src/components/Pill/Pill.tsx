import * as React from 'react';
import { PopupBase } from '../PopupBase';
import { PillButton, PillButtonProps } from './PillButton';
import { PillButtonEnhanced, PillButtonEnhancedProps } from './PillButtonEnhanced';
import { PillDropdown, PillDropdownChildrenParams } from './PillDropdown';

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
    /** label for the Done button */
    doneLabel: string;
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
    doneLabel,
    name,
    ref,
    content = null,
    children,
    dropdownRef: dropdownRefFromProps,
    noPaddingInDropdown = false,
    additionalDropdownProps = {},
    onClose,
    ...rest
}: Props<PriorityItemValue>) => {
    const buttonRef = React.useMemo(() => ref || React.createRef<HTMLElement>(), [ref]);
    const dropdownRef = React.useMemo(
        () => dropdownRefFromProps || React.createRef<HTMLElement>(),
        [dropdownRefFromProps]
    );

    const buttonRenderer = ({ setPopupVisibility, isOpen }) => {
        const toggleDropdown = () => {
            if (isOpen && onClose) {
                onClose();
            }
            setPopupVisibility(!isOpen);
        };

        return variant === 'classic' ? (
            <PillButton
                name={name}
                content={content}
                isOpen={isOpen}
                toggleDropdown={toggleDropdown}
                onClear={onClear}
                {...rest}
            />
        ) : (
            <PillButtonEnhanced
                name={name}
                content={content}
                isOpen={isOpen}
                toggleDropdown={toggleDropdown}
                onClear={onClear}
                {...rest}
            />
        );
    };

    const closeDropdown = (setPopupVisibility) => {
        onClose?.();
        setPopupVisibility(false);
    };

    const dropdownRenderer = ({ setPopupVisibility }) => (
        <PillDropdown
            close={() => closeDropdown(setPopupVisibility)}
            noPadding={noPaddingInDropdown}
            doneLabel={doneLabel}
            {...additionalDropdownProps}
        >
            {children}
        </PillDropdown>
    );

    return (
        <PopupBase
            anchorRenderer={buttonRenderer}
            popupRenderer={dropdownRenderer}
            anchorRef={buttonRef}
            popupRef={dropdownRef}
            onClose={onClose}
        />
    );
};

Pill.displayName = 'Pill';
