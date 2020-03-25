import * as React from 'react';
import { bem } from '../../utils';
import { Tooltip } from '../Tooltip';
import { Text } from '../Text';
import styles from './FieldWithValidation.scss';

interface Props {
    /** a single form field, e.g. Input, TextArea, etc. It should support context=”bad” prop */
    children: React.ReactElement;
    /** if this is not empty, this message will be rendered and context bad will be applied to the child */
    errorMessage?: string;
    /** if set to true the error message will be rendered as a tooltip. Otherwise it will be a text under the field */
    useTooltip?: boolean;
}

const { block } = bem('FieldWithValidation', styles);

export const FieldWithValidation: React.FC<Props> = (props) => {
    const { children, errorMessage, useTooltip, ...rest } = props;
    const [isChildInFocus, setIsChildInFocus] = React.useState(false);

    const handleFocus = () => {
        setIsChildInFocus(true);
    };

    const handleBlur = () => {
        setIsChildInFocus(false);
    };

    if (errorMessage && useTooltip) {
        const clonedChild = errorMessage
            ? React.cloneElement(children, {
                  context: 'bad',
                  onFocus: handleFocus,
                  onBlur: handleBlur,
              })
            : children;

        return (
            <Tooltip {...rest} content={errorMessage} visible={isChildInFocus}>
                {clonedChild}
            </Tooltip>
        );
    }

    if (errorMessage) {
        const clonedChild = React.cloneElement(children, { context: 'bad' });

        return (
            <>
                {clonedChild}
                <Text {...rest} {...block(props)} context="bad" size="small">
                    {errorMessage}
                </Text>
            </>
        );
    }

    return children;
};

FieldWithValidation.defaultProps = {
    useTooltip: false,
};

FieldWithValidation.displayName = 'FieldWithValidation';
