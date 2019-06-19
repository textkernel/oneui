/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './ItemTag.scss';

const { block } = bem({
    name: 'ItemTag',
    classnames: styles
});

class ItemTag extends React.Component {
    button = React.createRef();

    focusButton = () => this.button.current.focus();

    render() {
        const { children, buttonProps } = this.props;
        return (
            <div onClick={this.focusButton} {...block(this.props)}>
                {children}
                {buttonProps.onClick ? (
                    <button ref={this.button} {...buttonProps}>
                        x
                    </button>
                ) : null}
            </div>
        );
    }
}

ItemTag.propTypes = {
    children: PropTypes.node.isRequired,
    buttonProps: PropTypes.object
};

ItemTag.defaultProps = {
    buttonProps: {}
};

export default ItemTag;
