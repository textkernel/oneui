/* eslint-disable react/display-name */
import * as React from 'react';
import { bem } from '../../utils';
import { Text } from '../Text';
import styles from './Teaser.scss';
import { Checkbox } from '../Checkbox';
import { Link } from '../Link';

type Status = {
    label: string;
    tooltip: string;
};

type InfoText = {
    text: string;
    href?: string;
};

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** The title of entity. Note: it is rendered within a <span> */
    title: string;
    /** The subtitle of the entity. Note: it is rendered within a <span> */
    subtitle?: string;
    /** Details related to the entity. Note: it is rendered within a <span> */
    details?: React.ReactNode;
    /** Statuses of entity containing status label and tooltip message */
    statuses?: Status[];
    /** Style the component as disabled */
    disabled?: boolean;
    /** Define if checkbox is rendered or not */
    hasCheckbox?: boolean;
    isSelected?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    primaryInfo?: InfoText;
    secondaryInfo?: InfoText;
    tercearyInfo?: InfoText;
    isVisited?: boolean;
    timestamp?: string;
}

const { block, elem } = bem('Teaser', styles);

const InfoComponent = ({ text, href }: InfoText) => {
    if (!text) {
        return <div {...elem('emptyPlaceholder')} />;
    }

    const textComponent = (
        <Text inline title={text}>
            {text}
        </Text>
    );

    if (href) {
        return (
            <Link href={href} {...elem('link')}>
                {textComponent}
            </Link>
        );
    }

    return React.cloneElement(textComponent, { ...elem('infoText') });
};

export const Teaser: React.FC<Props> = ({
    title,
    subtitle = '',
    statuses,
    hasCheckbox = false,
    isSelected,
    onChange,
    primaryInfo = { text: '' },
    secondaryInfo = { text: '' },
    tercearyInfo = { text: '' },
    isVisited,
    timestamp,
    ...rest
}) => {
    const id = React.useId();

    return (
        <div {...rest} {...block({ ...rest })}>
            {hasCheckbox && <Checkbox id={id} checked={isSelected} onChange={onChange} />}
            <div {...elem('column')}>
                <div {...elem(['row', 'titleRow'])}>
                    <Text inline title={title} {...elem('title')}>
                        {title}
                    </Text>
                    <div {...elem('row')}>
                        {timestamp && (
                            <Text inline title={timestamp} {...elem('timestamp')}>
                                {timestamp}
                            </Text>
                        )}
                        {typeof isVisited !== 'undefined' && (
                            <div {...elem('visibility', { isVisited })} />
                        )}
                    </div>
                </div>
                {subtitle && (
                    <Text inline title={subtitle} {...elem('subtitle')}>
                        {subtitle}
                    </Text>
                )}
                <InfoComponent text={primaryInfo.text} href={primaryInfo.href} />
                <InfoComponent text={secondaryInfo.text} href={secondaryInfo.href} />
                <InfoComponent text={tercearyInfo.text} href={tercearyInfo.href} />
            </div>
        </div>
    );
};

Teaser.displayName = 'Teaser';
