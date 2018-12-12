import React, { Component } from 'react';
import bem from '../../../';
import classnamesMap from './classnamesMap.json';

class Button extends Component {

    static displayName = 'Button';
    static propsToMods = ['active', 'disabled', 'context'];
    static stateToMods = ['clicked'];

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
