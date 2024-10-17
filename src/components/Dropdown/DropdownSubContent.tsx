import React, { useEffect } from 'react';
import { SubContent, DropdownMenuSubContentProps } from '@radix-ui/react-dropdown-menu';
import { bem } from '../../utils/bem/bem';
import styles from './Dropdown.scss';

interface Props extends DropdownMenuSubContentProps {
    refElement?: React.RefObject<HTMLElement | null>;
}

const { block } = bem('DropdownSubContent', styles);

export const DropdownSubContent = ({ refElement, ...rest }: Props) => {
    const [width, setWidth] = React.useState<number>();

    useEffect(() => {
        if (refElement?.current?.offsetWidth) {
            setWidth(refElement.current.offsetWidth);
        }
    }, [refElement]);

    return <SubContent {...rest} {...block(rest)} sideOffset={6} style={{ width }} />;
};
