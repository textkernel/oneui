import * as React from 'react';
import ExpandIcon from '@material-design-icons/svg/round/expand_more.svg';
import { bem } from '../../../utils';
import { Button, ButtonProps } from '../../Buttons';
import { Separator } from '../../Dropdown/Separator';
import {
    DropdownContent,
    DropdownItem,
    DropdownPortal,
    DropdownRoot,
    DropdownTrigger,
    SingleSelectItem,
} from '../../Dropdown';
import styles from './ActionButton.scss';
import { Tooltip } from '../../Tooltip';

const { elem } = bem('ActionButton', styles);

export interface ActionButtonProps extends Omit<ButtonProps, 'children'> {
    /** Label of the button or the group of buttons */
    label: React.ReactNode;
    /** Dropdown items for the button, supports nested dropdowns/groups */
    dropdownItems?: React.ReactNode[] | ActionButtonProps[];
    /** Click handler for the button */
    onClick?: () => void;
    /** Indicates if this button represents a group of buttons */
    isGroup?: boolean;
    /** Indicates if this group is disabled */
    isGroupDisabled?: boolean;
    /** Tooltip content for the button, which appears on hover */
    tooltipContent?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    label,
    dropdownItems,
    onClick,
    tooltipContent,
    isGroup,
    isGroupDisabled,
    ...rest
}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpenStateChange = (open: boolean) => {
        setIsOpen(open);
    };

    return (
        <>
            {dropdownItems?.length ? (
                <DropdownRoot onOpenChange={handleOpenStateChange}>
                    <DropdownTrigger asChild disabled={isGroupDisabled}>
                        <Button type="button" context="primary" variant="ghost" {...rest}>
                            {label}
                            {dropdownItems && (
                                <ExpandIcon
                                    {...elem('icon', { isOpen, isGroupDisabled })}
                                    viewBox="0 0 24 24"
                                    height="20px"
                                    width="20px"
                                />
                            )}
                        </Button>
                    </DropdownTrigger>
                    <DropdownPortal>
                        <DropdownContent {...elem('dropdown')} role="menu">
                            {dropdownItems.map((item) =>
                                item.isGroup ? (
                                    <DropdownItem key={`${item.label}`}>
                                        <Separator>{item.label}</Separator>
                                        {item.dropdownItems &&
                                            item.dropdownItems.map((subItem) => (
                                                <SingleSelectItem
                                                    key={`${subItem.label}`}
                                                    onClick={subItem.onClick}
                                                >
                                                    {subItem.label}
                                                </SingleSelectItem>
                                            ))}
                                    </DropdownItem>
                                ) : (
                                    <SingleSelectItem onClick={item.onClick}>
                                        {item.label}
                                    </SingleSelectItem>
                                )
                            )}
                        </DropdownContent>
                    </DropdownPortal>
                </DropdownRoot>
            ) : (
                <Tooltip placement="top" content={tooltipContent}>
                    <Button
                        type="button"
                        context="primary"
                        variant="ghost"
                        onClick={onClick}
                        {...rest}
                    >
                        {label}
                    </Button>
                </Tooltip>
            )}
        </>
    );
};

ActionButton.displayName = 'ActionButton';
