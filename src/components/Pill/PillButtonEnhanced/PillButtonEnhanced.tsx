import * as React from 'react';
import { IoIosArrowDown, IoMdClose } from 'react-icons/io';
import { bem } from '../../../utils';
import { ENTER_KEY } from '../../../constants';
import { PillButtonProps } from '../PillButton';
import styles from './PillButtonEnhanced.scss';

export interface Props extends Omit<PillButtonProps, 'isContentDefault'> {}

const { block, elem } = bem('PillButtonEnhanced', styles);

export const PillButtonEnhanced = React.forwardRef<HTMLElement, Props>(
    (
        {
            isOpen = false,
            toggleDropdown,
            onClear,
            name,
            content = null,
            downArrowLabel,
            upArrowLabel,
            clearLabel,
            ...rest
        },
        ref
    ) => {
        const isActive = !!content;
        const propsForBem = { isOpen, isActive };

        const labelRef = React.createRef();
        const pillRef = React.createRef();

        let buttonIcon = 'arrow up/down OR close icon';
        // let buttonIcon = (
        //     <IoIosArrowDown
        //         {...elem('arrowIcon', propsForBem)}
        //         role="img"
        //         aria-label={isOpen ? upArrowLabel : downArrowLabel}
        //     />
        // );
        // let isButtonClickable = false;

        // if (isActive && !isOpen && !isContentDefault) {
        //     buttonIcon = <IoMdClose role="img" aria-label={clearLabel} />;
        //     isButtonClickable = true;
        // }

        // const buttonClick = isButtonClickable
        //     ? (e) => {
        //           e.stopPropagation();
        //           e.preventDefault();
        //           onClear();
        //       }
        //     : undefined;

        // const handleKeyDownOnButton = isButtonClickable
        //     ? (e) => {
        //           if (e.key === ENTER_KEY) {
        //               if (buttonClick) {
        //                   buttonClick(e);
        //               }
        //           }
        //       }
        //     : undefined;

        // const handleKeyDownOnPill = (e) => {
        //     if (e.key === ENTER_KEY) {
        //         e.preventDefault();
        //         toggleDropdown();
        //     }
        // };

        return (
            <div ref={ref} {...rest} {...block({ ...propsForBem, ...rest })}>
                {name}: {content} {buttonIcon}
            </div>
        );
    }
);

PillButtonEnhanced.displayName = 'PillButtonEnhanced';