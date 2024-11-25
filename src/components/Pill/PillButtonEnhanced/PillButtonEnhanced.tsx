import * as React from 'react';
import DownArrow from '@material-design-icons/svg/round/expand_more.svg';
import UpArrow from '@material-design-icons/svg/round/expand_less.svg';
import Close from '@material-design-icons/svg/round/close.svg';
import { bem } from '../../../utils';
import { ENTER_KEY } from '../../../constants';
import { PillButtonBaseProps } from '../PillButton';
import { DropdownTrigger } from '../../Dropdown';
import { PrioritySelector, PrioritySelectorProps } from '../../PrioritySelector';
import styles from './PillButtonEnhanced.scss';
import { Tooltip } from '../../Tooltip';
import { IconButton } from '../../Buttons';

export interface Props<PriorityItemValue = unknown> extends PillButtonBaseProps {
    /** Label/indicator in case of multiple selection, such as `+2` for instance */
    additionalContentLabel?: string;
    /** Tooltip content to be shown when multiple selections are shown */
    additionalContentTooltip?: React.ReactNode;
    /** Props needed for rendering optional priority selector */
    priority?: PrioritySelectorProps<PriorityItemValue>;
    /** max width of the button (excluding 20px of the trailing button), e.g. `fit-content`. If undefined will default to 220px */
    maxWidth?: string;
    /** Boolean indicating whether the whole pill should be disabled. */
    isDisabled?: boolean;
}

const { block, elem } = bem('PillButtonEnhanced', styles);

export const PillButtonEnhanced = React.forwardRef(
    /* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint */
    <PriorityItemValue extends unknown>(
        {
            isOpen = false,
            onClear,
            name,
            content = null,
            downArrowLabel,
            upArrowLabel,
            clearLabel,
            priority,
            additionalContentLabel,
            additionalContentTooltip,
            maxWidth,
            isDisabled,
            ...rest
        }: Props<PriorityItemValue>,
        ref: React.Ref<HTMLElement>
    ) => {
        const isActive = !!content;
        const propsForBem = { isOpen, isActive };

        const buttonIcon = isOpen ? (
            <UpArrow aria-label={upArrowLabel} viewBox="0 0 24 24" height="16px" width="16px" />
        ) : (
            <DownArrow aria-label={downArrowLabel} viewBox="0 0 24 24" height="16px" width="16px" />
        );

        const handleOnClear = (e) => {
            e.stopPropagation();
            e.preventDefault();
            onClear();
        };

        const handlePillClick = (e) => {
            e.stopPropagation();
            e.preventDefault();
        };

        const handleKeyDownOnPill = (e) => {
            if (isDisabled) {
                return;
            }
            if (e.key === ENTER_KEY) {
                handlePillClick(e);
            }
        };

        return (
            <div ref={ref} {...rest} {...block({ ...propsForBem, ...rest })}>
                {priority?.list.length && (
                    <PrioritySelector
                        {...priority}
                        triggerClassName={`${elem('priority').className} ${priority.triggerClassName}`}
                        isDisabled={isDisabled}
                    />
                )}
                <DropdownTrigger disabled={isDisabled}>
                    <div
                        role="button"
                        {...elem('main', { isActive })}
                        onClick={handlePillClick}
                        onKeyDown={handleKeyDownOnPill}
                        tabIndex={0}
                        style={{ maxWidth }}
                        disabled={isDisabled}
                    >
                        <span {...elem('name')}>{name}</span>
                        {!!content && (
                            <>
                                <span {...elem('valueSeparator')}>:</span>
                                <span {...elem('content')} title={content}>
                                    {content}
                                </span>
                            </>
                        )}
                        {additionalContentLabel && (
                            <>
                                <span {...elem('contentSeparator')}>,</span>
                                <Tooltip content={additionalContentTooltip}>
                                    <span {...elem('additionalContent')}>
                                        {additionalContentLabel}
                                    </span>
                                </Tooltip>
                            </>
                        )}
                        <div {...elem('arrowIcon')}>{buttonIcon}</div>
                    </div>
                </DropdownTrigger>
                {!!content && (
                    <IconButton
                        {...elem('clear')}
                        onClick={handleOnClear}
                        variant="ghost"
                        onKeyDown={handleOnClear}
                        tabIndex={0}
                        disabled={isDisabled}
                    >
                        <Close
                            aria-label={clearLabel}
                            viewBox="0 0 24 24"
                            height="16px"
                            width="16px"
                        />
                    </IconButton>
                )}
            </div>
        );
    }
) as <PriorityItemValue>(
    p: Props<PriorityItemValue> & { ref?: React.Ref<HTMLElement> }
) => React.ReactElement;
// See https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref solution 1
