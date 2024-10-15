import React from 'react';
import { SubContent, DropdownMenuSubContentProps } from '@radix-ui/react-dropdown-menu';
import { bem } from '../../utils/bem/bem';
import styles from './Dropdown.scss';

const { block } = bem('DropdownSubContent', styles);

export const DropdownSubContent = (props: DropdownMenuSubContentProps) => (
    <SubContent {...props} {...block(props)} sideOffset={6} />
);
