import React from 'react';
import { Content, DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { bem } from '../../utils/bem/bem';
import styles from './Dropdown.scss';

const { block } = bem('DropdownContent', styles);

export const DropdownContent = (props: DropdownMenuContentProps) => (
    <Content {...props} {...block(props)} />
);
