import * as React from 'react';
import { bem } from '../../utils';
import { Tooltip } from '../Tooltip';
import { Text } from '../Text';
import styles from './FieldWithValidation.scss';

export interface Props {
    /** a single form field, e.g. Input, TextArea, etc. It should support context=”danger” prop.
     * When useTooltip is set to true, children that are ReactComponents should support forwardRef */
    children: React.ReactElement;
    /** if this is not empty, this message will be rendered and context danger will be applied to the child */
    errorMessage?: string;
    /** if set to true the error message will be rendered as a tooltip. Otherwise it will be a text under the field */
    useTooltip?: boolean;
}

const { block } = bem('FieldWithValidation', styles);

export const FieldWithValidation: React.FC<Props> = ({
    children,
    errorMessage,
    useTooltip = false,
    ...rest
}) => {
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
                  context: 'danger',
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
        const clonedChild = React.cloneElement(children, { context: 'danger' });

        return (
            <>
                {clonedChild}
                <Text {...rest} {...block()} context="danger" size="small">
                    {errorMessage}
                </Text>
            </>
        );
    }

    return children;
};

FieldWithValidation.displayName = 'FieldWithValidation';
