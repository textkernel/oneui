import * as React from 'react';
import { Tooltip } from '../Tooltip';
import { Text } from '../Text';

interface Props {
    /** a single form field, e.g. Input, TextArea, etc. It should support context=”bad” prop */
    children: React.ReactElement;
    /** if this is not empty, this message will be rendered and context bad will be applied to the child */
    errorMessage?: string;
    /** if set to true the error message will be rendered as a tooltip. Otherwise it will be a text under the field */
    useTooltip?: boolean;
}

export const FieldWithValidation: React.FC<Props> = props => {
    const { children, errorMessage, useTooltip } = props;

    if (!errorMessage) {
        return children;
    }

    const clonedChild = React.cloneElement(children, { context: 'bad' });

    return useTooltip ? (
        <Tooltip content={errorMessage}>{clonedChild}</Tooltip>
    ) : (
        <>
            {clonedChild}
            <Text context="bad" size="small">
                {errorMessage}
            </Text>
        </>
    );
};

FieldWithValidation.defaultProps = {
    useTooltip: false,
};

FieldWithValidation.displayName = 'FieldWithValidation';
