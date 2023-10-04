import * as React from 'react';
import { bem } from '../../../utils';
import { Text, Props as TextProps } from '../Text';
import styles from './MarkedText.scss';

const { block, elem } = bem('MarkedText', styles);

interface Props extends Omit<TextProps, 'size' | 'children'> {
    /** String that will be rendered as text */
    children: string;
    /** Part of the text that will be bolded */
    marker: string;
}

export const MarkedText = (props: Props) => {
    const { marker, children, ...rest } = props;

    let result: string | (string | React.JSX.Element)[] = children;

    if (marker) {
        const escapedMarker = marker.replace(/[-[\]{}()*+?.,^$|#]/g, '\\$&');
        const re = new RegExp(`(${escapedMarker})`, 'gi');
        result = children.split(re).map((part, i) =>
            part.toLowerCase() === marker.toLowerCase() ? (
                // eslint-disable-next-line react/no-array-index-key
                <mark key={`match${i}`} {...elem('marked', props)} role="contentinfo">
                    {part}
                </mark>
            ) : (
                part
            )
        );
    }

    return (
        <Text {...rest} {...block(props)}>
            {result}
        </Text>
    );
};

MarkedText.displayName = 'MarkedText';
