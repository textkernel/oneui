import * as React from 'react';
import { bem } from '../../utils';
import { Text } from '../Text';
import { Checkbox } from '../Checkbox';
import { Link } from '../Link';
import { TagProps } from '../Tag';
import styles from './Teaser.scss';

type Info = {
    text: string;
    href?: string;
    icon?: React.ReactElement;
};

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** The title of entity. Note: it is rendered within a <span> */
    title: string;
    /** The subtitle of the entity. Note: it is rendered within a <span> */
    subtitle?: string;
    /** Style the component as disabled */
    disabled?: boolean;
    /** Define if checkbox is rendered or not */
    hasCheckbox?: boolean;
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
    /** Render little blue bubble */
    isVisited?: boolean;
    /** Render timestamp information */
    timestamp?: string;
    /** Render tags */
    tags?: React.ReactElement<TagProps>[];
    /** Matching indicator percentage */
    matchingIndicatorPercentage?: number;
}

const { block, elem } = bem('Teaser', styles);

const InfoComponent = ({ text, href, icon }: Info) => {
    const textComponent = (
        <Text inline title={text}>
            {text}
        </Text>
    );

    if (icon) {
        return (
            <div {...elem(['row', 'sourceContainer'])}>
                {React.cloneElement(icon, { ...elem('sourceIcon') })}
                <Text inline title={text} {...elem('caption')}>
                    {text}
                </Text>
            </div>
        );
    }

    if (href) {
        return (
            <Link href={href} {...elem('link')}>
                {textComponent}
            </Link>
        );
    }

    return React.cloneElement(textComponent, { ...elem('info') });
};

export const Teaser: React.FC<Props> = ({
    title,
    subtitle,
    hasCheckbox = false,
    id,
    isSelected,
    onChange,
    primaryInfo,
    secondaryInfo,
    tercearyInfo,
    sourceInfo,
    isVisited,
    timestamp,
    tags,
    matchingIndicatorPercentage,
    ...rest
}) => {
    const useId = React.useId();
    const checkboxId = id ?? useId;

    const computeMatchingIndicatorPercentageColor = (value: number) => {
        if (value <= 30) {
            return 'var(--color-icon-critical-default)';
        }
        if (value <= 50) {
            return 'var(--color-icon-caution-default)';
        }
        return 'var(--color-icon-success-default)';
    };

    return (
        <div {...rest} {...block({ ...rest })}>
            {hasCheckbox && <Checkbox id={checkboxId} checked={isSelected} onChange={onChange} />}
            <div {...elem('column')}>
                <div {...elem(['row', 'titleRow'])}>
                    <div {...elem('row')}>
                        <Text inline title={title} {...elem('title')}>
                            {title}
                        </Text>
                        {matchingIndicatorPercentage !== undefined &&
                            matchingIndicatorPercentage >= 0 &&
                            matchingIndicatorPercentage <= 100 && (
                                <svg {...elem('matchIndicator')} aria-label="Matching indicator">
                                    <circle
                                        r="9"
                                        cx="50%"
                                        cy="50%"
                                        stroke="var(--color-background-neutral-subtle-default)"
                                        fill="none"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    <circle
                                        r="9"
                                        cx="50%"
                                        cy="50%"
                                        stroke={computeMatchingIndicatorPercentageColor(
                                            matchingIndicatorPercentage
                                        )}
                                        fill="none"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeDasharray={`${(matchingIndicatorPercentage / 100) * 56}, 56`}
                                    />
                                </svg>
                            )}
                    </div>

                    <div {...elem('row')}>
                        {timestamp && (
                            <Text inline title={timestamp} {...elem('caption')}>
                                {timestamp}
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
                    <Text inline title={subtitle} {...elem('subtitle')}>
                        {subtitle}
                    </Text>
                )}
                {primaryInfo && <InfoComponent text={primaryInfo.text} href={primaryInfo.href} />}
                {secondaryInfo && (
                    <InfoComponent text={secondaryInfo.text} href={secondaryInfo.href} />
                )}
                {tercearyInfo && (
                    <InfoComponent text={tercearyInfo.text} href={tercearyInfo.href} />
                )}
                {sourceInfo && <InfoComponent text={sourceInfo.text} icon={sourceInfo.icon} />}
                {tags && (
                    <div {...elem('tags')}>
                        {tags.map((tag) => React.cloneElement(tag, { size: 'small' }))}
                    </div>
                )}
            </div>
        </div>
    );
};
