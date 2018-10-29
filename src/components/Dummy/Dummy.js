import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem'; // eslint-disable-line import/no-unresolved
import dummyStyles from './Dummy.scss';

@bem(dummyStyles)
class Dummy extends Component {
    static propsToMods = ['isActive'];

    static stateToMods = ['isClicked'];

    state = {
        isClicked: false
    };

    handleClick = () => {
        const { isClicked } = this.state;

        this.setState({ isClicked: !isClicked });
    };

    render() {
        const { children } = this.props;
        return (
            <button type="button" {...this.block()} onClick={this.handleClick}>
                <span {...this.elem('label')}>{children}</span>
            </button>
        );
    }
}

Dummy.displayName = 'Dummy';

Dummy.propTypes = {
    /** Dummy Children */
    children: PropTypes.node,
    /** Is active */
    isActive: PropTypes.bool
};

Dummy.defaultProps = {
    children: null,
    isActive: false
};

export default Dummy;
