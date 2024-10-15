import React, { useEffect } from 'react';
import { Content, DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { bem } from '../../utils/bem/bem';
import styles from './Dropdown.scss';

const { block } = bem('DropdownContent', styles);

interface Props extends DropdownMenuContentProps {
    refElement?: React.RefObject<HTMLElement | null>;
}

export const DropdownContent = ({ refElement, ...rest }: Props) => {
    const [width, setWidth] = React.useState<number>();

    useEffect(() => {
        if (refElement?.current?.offsetWidth) {
            setWidth(refElement.current.offsetWidth);
        }
    }, [refElement]);

    return <Content {...rest} {...block(rest)} align="start" style={{ width }} />;
};
