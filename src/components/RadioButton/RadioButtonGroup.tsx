import React, { forwardRef } from 'react';
import { bem } from '../../utils';
import styles from './RadioButtonGroup.scss';

export interface Props {
    /** The name of the group this radio button belongs to */
    name: string;
    /** common onChange handler that will be passed to all children */
    onChange?: () => void;
    /** The radio buttons */
    children: any;
}

const { block, elem } = bem('RadioButtonGroup', styles);

export const RadioButtonGroup = forwardRef<HTMLElement, Props>(
    ({ children, name, onChange, ...rest }, ref) => {
        const childProps = onChange === undefined ? { name } : { name, onChange };

        return (
            <div ref={ref} {...rest} {...block({ ...rest })}>
                {React.Children.map(children, (child) => {
                    if (child) {
                        return React.cloneElement(child, {
                            ...elem('option', {
                                elemClassName: child.props.className,
                            }),
                            ...childProps,
                        });
                    }
                    return null;
                })}
            </div>
        );
    }
);

RadioButtonGroup.displayName = 'RadioButtonGroup';
