import * as React from 'react';
import ExpandIcon from '@material-design-icons/svg/round/expand_more.svg';
import { bem } from '../../../utils';
import { Button } from '../../Buttons';
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

const { elem } = bem('ActionButton', styles);

export interface ActionButtonProps {
    /** Label of the button or the group of buttons */
    label: React.ReactNode;
    /** Dropdown items for the button, supports nested dropdowns/groups */
    dropdownItems?: React.ReactNode[] | ActionButtonProps[];
    /** Click handler for the button */
    onClick?: () => void;
    /** Indicates if this button represents a group of buttons */
    isGroup?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ label, dropdownItems, onClick }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <DropdownRoot onOpenChange={setIsOpen}>
            <DropdownTrigger asChild>
                <Button type="button" context="primary" variant="ghost" onClick={onClick}>
                    {label}
                    {dropdownItems && (
                        <ExpandIcon
                            {...elem('icon', { isOpen })}
                            viewBox="0 0 24 24"
                            height="20px"
                            width="20px"
                        />
                    )}
                </Button>
            </DropdownTrigger>
            {dropdownItems && (
                <DropdownPortal>
                    <DropdownContent {...elem('dropdown')}>
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
            )}
        </DropdownRoot>
    );
};

ActionButton.displayName = 'ActionButton';
