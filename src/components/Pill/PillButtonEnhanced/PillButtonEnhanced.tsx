import * as React from 'react';
import DownArrow from '@material-design-icons/svg/round/expand_more.svg';
import UpArrow from '@material-design-icons/svg/round/expand_less.svg';
import Clear from '@material-design-icons/svg/round/cancel.svg';
import { bem } from '../../../utils';
import { ENTER_KEY } from '../../../constants';
import { PillButtonBaseProps } from '../PillButton';
import { DropdownTrigger } from '../../Dropdown';
import { PrioritySelector, PrioritySelectorProps } from '../../PrioritySelector';
import styles from './PillButtonEnhanced.scss';
import { Tooltip } from '../../Tooltip';

export interface Props<PriorityItemValue = unknown> extends PillButtonBaseProps {
    /** Label/indicator in case of multiple selection, such as `+2` for instance */
    additionalContentLabel?: string;
    /** Tooltip content to be shown when multiple selections are shown */
    additionalContentTooltip?: React.ReactNode;
    /** Props needed for rendering optional priority selector */
    priority?: PrioritySelectorProps<PriorityItemValue>;
    /** max width of the button (excluding 20px of the trailing button), e.g. `fit-content`. If undefined will default to 220px */
    maxWidth?: string;
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
            ...rest
        }: Props<PriorityItemValue>,
        ref: React.Ref<HTMLElement>
    ) => {
        const isActive = !!content;
        const propsForBem = { isOpen, isActive };

        const getButtonIconAndHandler = () => {
            if (content) {
                return {
                    icon: (
                        <Clear
                            aria-label={clearLabel}
                            viewBox="0 0 24 24"
                            height="16px"
                            width="16px"
                        />
                    ),
                    onClick: (e: React.MouseEvent) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onClear();
                    },
                };
            }

            if (isOpen) {
                return {
                    icon: (
                        <UpArrow
                            aria-label={upArrowLabel}
                            viewBox="0 0 24 24"
                            height="16px"
                            width="16px"
                        />
                    ),
                    onClick: (e: React.MouseEvent) => {
                        e.stopPropagation();
                        e.preventDefault();
                    },
                };
            }
            return {
                icon: (
                    <DownArrow
                        aria-label={downArrowLabel}
                        viewBox="0 0 24 24"
                        height="16px"
                        width="16px"
                    />
                ),
                onClick: (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                },
            };
        };

        const { icon: buttonIcon, onClick: handleButtonClick } = getButtonIconAndHandler();

        const handleKeyDownOnButton = (e) => {
            if (e.key === ENTER_KEY) {
                handleButtonClick(e);
            }
        };

        const handlePillClick = (e) => {
            e.stopPropagation();
            e.preventDefault();
        };

        const handleKeyDownOnPill = (e) => {
            if (e.key === ENTER_KEY) {
                handlePillClick(e);
            }
        };

        return (
            <div ref={ref} {...rest} {...block({ ...propsForBem, ...rest })}>
                {priority?.list.length && (
                    <PrioritySelector
                        {...priority}
                        size="small"
                        triggerClassName={`${elem('priority').className} ${priority.triggerClassName}`}
                    />
                )}
                <DropdownTrigger>
                    <div
                        role="button"
                        {...elem('main')}
                        onClick={handlePillClick}
                        onKeyDown={handleKeyDownOnPill}
                        tabIndex={0}
                        style={{ maxWidth }}
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
                    </div>
                </DropdownTrigger>
                <div
                    role="button"
                    {...elem('button')}
                    onClick={handleButtonClick}
                    onKeyDown={handleKeyDownOnButton}
                    tabIndex={0}
                >
                    {buttonIcon}
                </div>
            </div>
        );
    }
) as <PriorityItemValue>(
    p: Props<PriorityItemValue> & { ref?: React.Ref<HTMLElement> }
) => React.ReactElement;
// See https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref solution 1
