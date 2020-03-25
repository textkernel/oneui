import * as React from 'react';
import { bem } from '../../utils';
import styles from './ButtonGroup.scss';
import { Context, Size } from '../../constants';
import { ButtonProps } from '../Buttons';

interface Props {
    /** The buttons in this group */
    children: React.ReactElement<ButtonProps> | React.ReactElement<ButtonProps>[];
    /** The context for all buttons in this group (e.g. brand, primary, bad, good etc.) */
    context?: Context | 'link';
    /** Whether or not to show block-level button group (full width) */
    isBlock?: boolean;
    /** The size of the buttons in the button group */
    size?: Size;
}

const { block, elem } = bem('ButtonGroup', styles);

export const ButtonGroup: React.FC<Props> = (props) => {
    const { children, context, size, isBlock, ...rest } = props;

    return (
        <div {...rest} {...block(props)} role="group">
            {React.Children.map(children, (button) => {
                if (!React.isValidElement(button)) {
                    return button;
                }

                return React.cloneElement(button, {
                    ...button.props,
                    context,
                    size,
                    ...elem('button', props),
                });
            })}
        </div>
    );
};

ButtonGroup.displayName = 'ButtonGroup';

ButtonGroup.defaultProps = {
    context: 'neutral',
    size: 'normal',
    isBlock: false,
};
