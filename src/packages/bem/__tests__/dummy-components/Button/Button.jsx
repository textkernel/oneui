import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bem from '../../../';
import classnamesMap from './classnamesMap.json';

class Button extends Component {

    static displayName = 'Button';

    static propsToMods = ['active', 'disabled', 'context', 'size'];

    static stateToMods = ['clicked'];

    static propTypes = {
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        context: PropTypes.string,
        size: PropTypes.oneOf([1, 2, 3]),
    }

    static defaultProps = {
        active: false,
        disabled: false,
        context: 'default',
        size: 1,
    }

    state = { clicked: false };

    handleClick = () => {
        const { clicked } = this.state;
        this.setState({ clicked: !clicked });
    };

    render() {
        return (
            <button { ...this.block() } type="button" onClick={this.handleClick}>
                <span { ...this.elem('icon') } />
                <span { ...this.elem('label') }>
                    {this.props.children}
                </span>
            </button>
        );
    }
}

export default bem(classnamesMap)(Button);
