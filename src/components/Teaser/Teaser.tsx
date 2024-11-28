import * as React from 'react';
import { bem } from '../../utils';
import { Text } from '../Text';
import { Checkbox } from '../Checkbox';
import { Link } from '../Link';
import { MatchingIndicator } from '../MatchingIndicator';
import { Tooltip, TooltipProps } from '../Tooltip';
import styles from './Teaser.scss';

type Info = {
    text: React.ReactElement | string;
    href?: string;
    icon?: React.ReactElement;
};

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** The title of entity. Note: it is rendered within a <span> */
    title: React.ReactElement | string;
    /** The subtitle of the entity. Note: it is rendered within a <span> */
    subtitle?: React.ReactElement | string;
    /** Define if checkbox is rendered or not */
    hasCheckbox?: boolean;
    /** Checkbox tooltip label */
    checkboxTooltip?: TooltipProps;
    /** Checkbox id */
    id?: string;
    /** Checkbox status */
    isSelected?: boolean;
    /** When checkbox status changes */
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    /** First line of information */
    primaryInfo?: Info;
    /** Second line of information */
    secondaryInfo?: Info;
    /** Third line of information */
    tercearyInfo?: Info;
    /** Line containing the source of the information */
    sourceInfo?: Info;
    /** Render visit indicator: `true` - little blue bubble | `false` - empty circle | `undefined` - nothing will be rendered */
    isVisited?: boolean;
    /** Render date information as text */
    date?: string;
    /** Matching indicator percentage */
    matchingIndicatorPercentage?: number;
    /** Matching indicator aria-label */
    matchingIndicatorAriaLabel?: string;
    /** Render bottom elements */
    bottom?: React.ReactNode;
    /** Disable the component */
    disabled?: boolean;
}

const { block, elem } = bem('Teaser', styles);

export const Teaser: React.FC<Props> = ({
    title,
    subtitle,
    hasCheckbox = false,
    checkboxTooltip,
    id,
    isSelected = false,
    onChange,
    primaryInfo,
    secondaryInfo,
    tercearyInfo,
    sourceInfo,
    isVisited,
    date,
    matchingIndicatorPercentage,
    matchingIndicatorAriaLabel,
    bottom,
    disabled = false,
    ...rest
}) => {
    const useId = React.useId();
    const checkboxId = id ?? useId;

    const InfoComponent = ({ text, icon, href }: Info) => {
        if (icon) {
            const iconComponent = (
                <div {...elem(['row', 'sourceContainer'])}>
                    {React.cloneElement(icon, { ...elem('sourceIcon') })}
                    <Text inline title={text} {...elem('caption')}>
                        {text}
                    </Text>
                </div>
            );

            if (href) {
                return (
                    <Link href={href} {...elem('link')}>
                        {iconComponent}
                    </Link>
                );
            }

            return iconComponent;
        }

        const textComponent =
            typeof text === 'string' ? (
                <Text inline title={text}>
                    {text}
                </Text>
            ) : (
                text
            );

        if (href) {
            return (
                <Link href={href} {...elem(['link', 'lineClamp'])}>
                    {textComponent}
                </Link>
            );
        }

        return React.cloneElement(textComponent, { ...elem(['info', 'lineClamp']) });
    };

    const CheckboxComponent = () => {
        const checkbox = (
            <Checkbox
                id={checkboxId}
                checked={isSelected}
                onChange={onChange}
                {...elem('checkbox')}
            />
        );

        if (checkboxTooltip) {
            return (
                <Tooltip content={checkboxTooltip.content} delay={checkboxTooltip.delay}>
                    {checkbox}
                </Tooltip>
            );
        }

        return checkbox;
    };

    return (
        <div {...rest} {...block({ ...rest })}>
            {hasCheckbox && <CheckboxComponent />}
            <div {...elem('column')}>
                <div {...elem(['row', 'titleRow'])}>
                    <div {...elem('row')}>
                        <Text inline title={title} {...elem(['title', 'lineClamp'], { disabled })}>
                            {title}
                        </Text>
                        {matchingIndicatorPercentage !== undefined && (
                            <div {...elem('matchingIndicator')}>
                                <MatchingIndicator
                                    percentage={matchingIndicatorPercentage}
                                    aria-label={matchingIndicatorAriaLabel}
                                />
                            </div>
                        )}
                    </div>
                    <div {...elem('row')}>
                        {date && (
                            <Text inline title={date} {...elem('caption')}>
                                {date}
                            </Text>
                        )}
                        {typeof isVisited !== 'undefined' && (
                            <div
                                {...elem('visibility', { isVisited })}
                                aria-label="Visibility indicator"
                            />
                        )}
                    </div>
                </div>
                {subtitle && (
                    <Text inline title={subtitle} {...elem(['subtitle', 'lineClamp'])}>
                        {subtitle}
                    </Text>
                )}
                {primaryInfo && <InfoComponent {...primaryInfo} />}
                {secondaryInfo && <InfoComponent {...secondaryInfo} />}
                {tercearyInfo && <InfoComponent {...tercearyInfo} />}
                {sourceInfo && <InfoComponent {...sourceInfo} />}
                {bottom && <div {...elem('bottom')}>{bottom}</div>}
            </div>
        </div>
    );
};
