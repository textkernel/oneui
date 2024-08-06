import * as React from 'react';
import { EmptyElement } from '@textkernel/oneui/customTypes/types';
import { bem } from '../../utils';
import styles from './ButtonGroup.scss';
import { ButtonContext, Size } from '../../constants';
import { ButtonProps } from '../Buttons';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** The buttons in this group */
    children: React.ReactElement<ButtonProps> | (React.ReactElement<ButtonProps> | EmptyElement)[];
    /** Should the button be in primary style or not */
    context?: ButtonContext;
    /** Whether or not to show block-level button group (full width) */
    isBlock?: boolean;
    /** The size of the buttons in the button group */
    size?: Size;
}

const { block, elem } = bem('ButtonGroup', styles);

export const ButtonGroup = ({
    children,
    context = 'primary',
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
                    size,
                    context,
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
