import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Button from '../Button';
import styles from './Alert.scss';
import { CONTEXTS } from '../../constants';

const { block, elem } = bem({
    name: 'Alert',
    classnames: styles,
    propsToMods: ['context']
});

const Alert = props => {
    const { action, children, context, title, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            <div {...elem('content', props)}>
                {!!title && <strong {...elem('title', props)}>{title}</strong>}
                {children}
            </div>
            {!!action && (
                <div {...elem('action', props)}>
                    <Button onClick={action.onClick} context={action.context || 'link'}>
                        {action.label}
                    </Button>
                </div>
            )}
        </div>
    );
};

Alert.displayName = 'Alert';

Alert.propTypes = {
    /** Action button for this alert */
    action: PropTypes.shape({
        context: PropTypes.oneOf(['link', ...CONTEXTS]),
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }),
    /** The alert content */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /** The alert context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context: PropTypes.oneOf(CONTEXTS),
    /** The alert title */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

Alert.defaultProps = {
    action: null,
    context: 'brand',
    title: null
};

export default Alert;
