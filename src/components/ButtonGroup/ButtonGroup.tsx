import * as React from 'react';
import { bem } from '../../utils';
import styles from './ButtonGroup.scss';
import { Size } from '../../constants';
import { ButtonProps } from '../Buttons';

export interface Props {
    /** The buttons in this group */
    children: React.ReactElement<ButtonProps> | (React.ReactElement<ButtonProps> | EmptyElement)[];
    isPrimary?: boolean;
    /** Whether or not to show block-level button group (full width) */
    isBlock?: boolean;
    /** The size of the buttons in the button group */
    size?: Size;
}

const { block, elem } = bem('ButtonGroup', styles);

export const ButtonGroup = ({
    children,
    isPrimary = true,
    size = 'normal',
    isBlock = false,
    ...rest
}: Props) => {
    const totalNumberOfButtons = React.Children.count(children);

    if (totalNumberOfButtons === 1) {
        return (
            <div {...rest} {...block({ isBlock, ...rest })} role="group">
                {React.isValidElement(children)
                    ? React.cloneElement(children, {
                          ...children.props,
                          isPrimary,
                          size,
                          isBlock,
                      })
                    : children}
            </div>
        );
    }

    return (
        <div {...rest} {...block({ isBlock, ...rest })} role="group">
            {React.Children.map(children, (button, i) => {
                if (!React.isValidElement(button)) {
                    return button;
                }

                return React.cloneElement(button, {
                    ...button.props,
                    size,
                    isPrimary,
                    ...elem('button', {
                        isBlock,
                        first: i === 0,
                        last: i + 1 === totalNumberOfButtons,
                    }),
                });
            })}
        </div>
    );
};

ButtonGroup.displayName = 'ButtonGroup';
