import * as React from 'react';
import DownArrow from '@material-design-icons/svg/round/expand_more.svg';
import UpArrow from '@material-design-icons/svg/round/expand_less.svg';
import Clear from '@material-design-icons/svg/round/cancel.svg';
import { bem } from '../../../utils';
import { ENTER_KEY } from '../../../constants';
import { PillButtonBaseProps } from '../PillButton';
import styles from './PillButtonEnhanced.scss';

export interface Props extends PillButtonBaseProps {
    /** Label/indicator in case of multiple selection, such as `+2` for instance */
    multiSelectionLabel?: string;
    /** Tooltip content to be shown when multiple selections are shown */
    multiSelectionTooltip?: string;
    /** Props needed for rendering optional priority selector */
    prioritySelector?: boolean; // boolean is temporary placeholder until PrioritySelector component is finalized
}

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
            prioritySelector = false,
            multiSelectionLabel,
            multiSelectionTooltip,
            ...rest
        },
        ref
    ) => {
        const isActive = !!content;
        const propsForBem = { isOpen, isActive };

        let buttonIcon = (
            <DownArrow aria-label={downArrowLabel} viewBox="0 0 24 24" height="14px" width="14px" />
        );
        let handleButtonClick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleDropdown();
        };
        if (isOpen) {
            buttonIcon = (
                <UpArrow aria-label={upArrowLabel} viewBox="0 0 24 24" height="14px" width="14px" />
            );
        }
        if (!!content) {
            buttonIcon = (
                <Clear aria-label={clearLabel} viewBox="0 0 24 24" height="14px" width="14px" />
            );
            handleButtonClick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                onClear();
            };
        }

        const handleKeyDownOnButton = (e) => {
            if (e.key === ENTER_KEY) {
                handleButtonClick(e);
            }
        };

        const handlePillClick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleDropdown();
        };

        const handleKeyDownOnPill = (e) => {
            if (e.key === ENTER_KEY) {
                handlePillClick(e);
            }
        };

        return (
            <div ref={ref} {...rest} {...block({ ...propsForBem, ...rest })}>
                {prioritySelector && 'priority'}
                <div
                    role="button"
                    {...elem('main')}
                    onClick={handlePillClick}
                    onKeyDown={handleKeyDownOnPill}
                    tabIndex={1}
                >
                    <span {...elem('name')}>{name}</span>
                    {!!content && (
                        <>
                            <span {...elem('separator')}>:</span>
                            <span {...elem('content')}>{content}</span>
                        </>
                    )}
                    <span {...elem('multiSelection')} title={multiSelectionTooltip}>
                        {multiSelectionLabel}
                    </span>
                </div>
                <div
                    role="button"
                    {...elem('button')}
                    onClick={handleButtonClick}
                    onKeyDown={handleKeyDownOnButton}
                    tabIndex={1}
                >
                    {buttonIcon}
                </div>
            </div>
        );
    }
);

PillButtonEnhanced.displayName = 'PillButtonEnhanced';
