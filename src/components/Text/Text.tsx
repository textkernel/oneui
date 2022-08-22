import * as React from 'react';
import { bem } from '../../utils';
import styles from './Text.scss';
import { Size, Context } from '../../constants';

export interface Props extends React.HTMLAttributes<HTMLElement> {
    /** Text content */
    children: NotEmptyReactNode;
    /** Text should be rendered inline */
    inline?: boolean;
    /** The context of the text, effecting its color (e.g. brand, primary, bad, good etc. 'muted' added as special context here) */
    context?: Context | 'muted' | 'default';
    /** Custom text sizes */
    size?: Size;
}

const { block } = bem('Text', styles);

export const Text = React.forwardRef<HTMLElement, Props>((props, ref) => {
    const { children, context, inline, size, ...rest } = props;
    const HtmlNodeType = inline ? 'span' : 'p';

    return (
        <HtmlNodeType ref={ref} {...rest} {...block(props)}>
            {children}
        </HtmlNodeType>
    );
});

Text.displayName = 'Text';

Text.defaultProps = {
    inline: false,
    context: 'default',
    size: 'normal',
};
