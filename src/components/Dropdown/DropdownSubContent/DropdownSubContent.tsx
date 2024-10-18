import React, { useEffect } from 'react';
import { SubContent, DropdownMenuSubContentProps } from '@radix-ui/react-dropdown-menu';
import { bem } from '../../../utils/bem/bem';
import styles from '../Dropdown.scss';

interface Props extends DropdownMenuSubContentProps {
    /** Ref element used to make the width of the Subcontent equal to the parent width */
    refElement?: React.RefObject<HTMLElement | null>;
}

const { block } = bem('DropdownSubContent', styles);

export const DropdownSubContent = React.forwardRef<HTMLElement, Props>(
    ({ refElement, ...rest }, ref) => {
        const [width, setWidth] = React.useState<number>();

        useEffect(() => {
            if (refElement?.current?.offsetWidth) {
                setWidth(refElement.current.offsetWidth);
            }
        }, [refElement, width]);

        return (
            <SubContent
                ref={ref}
                {...rest}
                {...block(rest)}
                sideOffset={6}
                style={{ minWidth: width }}
            />
        );
    }
);
