import * as React from 'react';
import { IoIosArrowDown, IoMdClose } from 'react-icons/io';
import { bem } from '../../../utils';
import { ENTER_KEY } from '../../../constants';
import styles from './PillButton.scss';

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
    /** Wether the dropdown is open or closed */
    isOpen?: boolean;
    /** If pill is in default state, meaning it has content but cannot be reset. */
    isContentDefault?: boolean;
    /** a function to be called when dropdown should be toggled */
    toggleDropdown: () => void;
    /** a function to be called to clear the pill/filter content */
    onClear: () => void;
    /** name describing the pill/filter */
    name: string;
    /** label describing the content of an active filter/pill. Note: it is rendered within a <span> */
    content?: React.ReactNode;
    /** Down arrow name for ARIA labelling, it is used when the component isn't focused */
    downArrowLabel?: string;
    /** Up arrow name for ARIA labelling, it is used when the component is focused and options are shown */
    upArrowLabel?: string;
    /** Clear label name for ARIA labelling, it is used when needs to clear data from component */
    clearLabel?: string;
}

const { block, elem } = bem('PillButton', styles);

export const PillButton = React.forwardRef<HTMLElement, Props>(
    (
        {
            isOpen = false,
            isContentDefault = false,
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
        const [pillMinWidth, setPillMinWidth] = React.useState(0);

        // make sure label is not longer then pill
        React.useLayoutEffect(() => {
            if (isActive) {
                const labelEl = labelRef.current as HTMLElement;
                const { width: labelWidth } = labelEl.getBoundingClientRect();
                const pillEl = pillRef.current as HTMLElement;
                const { width: pillWidth } = pillEl.getBoundingClientRect();

                if (labelWidth > pillWidth) {
                    setPillMinWidth(labelWidth);
                }
            }
        }, [isActive, labelRef, pillMinWidth, pillRef]);

        let buttonIcon = (
            <IoIosArrowDown
                {...elem('arrowIcon', propsForBem)}
                role="img"
                aria-label={isOpen ? upArrowLabel : downArrowLabel}
            />
        );
        let isButtonClickable = false;

        if (isActive && !isOpen && !isContentDefault) {
            buttonIcon = <IoMdClose role="img" aria-label={clearLabel} />;
            isButtonClickable = true;
        }

        const buttonClick = isButtonClickable
            ? (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onClear();
              }
            : undefined;

        const handleKeyDownOnButton = isButtonClickable
            ? (e) => {
                  if (e.key === ENTER_KEY) {
                      if (buttonClick) {
                          buttonClick(e);
                      }
                  }
              }
            : undefined;

        const handleKeyDownOnPill = (e) => {
            if (e.key === ENTER_KEY) {
                e.preventDefault();
                toggleDropdown();
            }
        };

        return (
            <div ref={ref} {...rest} {...block({ ...propsForBem, ...rest })}>
                <div ref={labelRef} {...elem('label', propsForBem)}>
                    {isActive && name}
                </div>
                <div
                    ref={pillRef}
                    {...elem('pill', propsForBem)}
                    style={pillMinWidth ? { minWidth: pillMinWidth } : undefined}
                    onClick={toggleDropdown}
                    onKeyDown={handleKeyDownOnPill}
                    tabIndex="0"
                    role="button"
                >
                    <span {...elem('pillLabel', propsForBem)}>{content || name}</span>
                    <button
                        type="button"
                        {...elem('button', propsForBem)}
                        onClick={buttonClick}
                        onKeyDown={handleKeyDownOnButton}
                    >
                        {buttonIcon}
                    </button>
                </div>
            </div>
        );
    }
);

PillButton.displayName = 'PillButton';
