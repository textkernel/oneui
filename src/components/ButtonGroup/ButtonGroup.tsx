import * as React from 'react';
import { EmptyElement } from '@textkernel/oneui/customTypes/customTypes';
import { bem } from '../../utils';
import styles from './ButtonGroup.scss';
import { Context, Size } from '../../constants';
import { ButtonProps } from '../Buttons';

export interface Props {
    /** The buttons in this group */
    children: React.ReactElement<ButtonProps> | (React.ReactElement<ButtonProps> | EmptyElement)[];
    /** The context for all buttons in this group (e.g. brand, primary, bad, good etc.) */
    context?: Context | 'link';
    /** Whether or not to show block-level button group (full width) */
    isBlock?: boolean;
    /** The size of the buttons in the button group */
    size?: Size;
}

const { block, elem } = bem('ButtonGroup', styles);

export const ButtonGroup = ({
    children,
    context = 'neutral',
    size = 'normal',
    isBlock = false,
    ...rest
}: Props) => {
    const totalNumberOfButtons = React.Children.count(children);

    return (
        <div {...rest} {...block({ isBlock, ...rest })} role="group">
            {React.Children.map(children, (button, i) => {
                if (!React.isValidElement(button)) {
                    return button;
                }

                if (totalNumberOfButtons === 1) {
                    return React.cloneElement(button, {
                        ...button.props,
                        context,
                        size,
                        isBlock,
                    });
                }

                return React.cloneElement(button, {
                    ...button.props,
                    context,
                    size,
                    ...elem('button', {
                        isBlock,
                        context,
                        first: i === 0,
                        last: i + 1 === totalNumberOfButtons,
                    }),
                });
            })}
        </div>
    );
};

ButtonGroup.displayName = 'ButtonGroup';
