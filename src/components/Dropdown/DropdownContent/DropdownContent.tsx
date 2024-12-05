import React, { useEffect } from 'react';
import { Content, DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { bem } from '../../../utils/bem/bem';
import styles from '../Dropdown.scss';

interface Props extends DropdownMenuContentProps {
    /** Ref element used to make the width of the Content equal to the parent width */
    refElement?: React.RefObject<HTMLElement | null>;
}

const { block } = bem('DropdownContent', styles);

export const DropdownContent = React.forwardRef<HTMLElement, Props>(
    ({ refElement, ...rest }, ref) => {
        const [width, setWidth] = React.useState<number>();

        useEffect(() => {
            if (refElement?.current?.offsetWidth) {
                setWidth(refElement.current.offsetWidth);
            }
        }, [refElement, width]);

        return (
            <Content
                ref={ref}
                {...rest}
                {...block(rest)}
                align="start"
                sideOffset={6}
                style={{ minWidth: width }}
            />
        );
    }
);
