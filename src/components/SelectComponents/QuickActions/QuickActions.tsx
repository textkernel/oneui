import React from 'react';
import { Button, ButtonProps } from '../../Buttons';
import { bem } from '../../../utils/bem/bem';
import styles from './QuickActions.scss';
import { Context } from '@textkernel/oneui/constants';
import { ActionsButton } from '../ActionsButton';
import { IoMdArrowDropdown } from 'react-icons/io';

const { elem } = bem('QuickActions', styles);

interface Props<V> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    children: NotEmptyReactNode;
    button: React.ReactElement<ButtonProps>;
    onChange: (value?: V | null) => void;
    context?: Context;
}

export function QuickActions<V>(props: Props<V>) {
    const {
        button,
        children,
        onChange,
        context,
        ...rest
    } = props;

    return (
        <div { ...elem('main') } {...rest}>
            {React.cloneElement(button, { ...elem('button'), context })}
            <ActionsButton
                button={(
                    <Button context={context} {...elem('arrowButton')}>
                        <IoMdArrowDropdown />
                    </Button>
                )}
                onChange={onChange}
                {...elem('actions')}
            >
                {children}
            </ActionsButton>
        </div>
    );
}

QuickActions.displayName = 'ActionsButton';

QuickActions.defaultProps = {
    context: 'brand',
};
