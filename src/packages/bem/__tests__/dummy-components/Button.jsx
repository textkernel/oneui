import React, { Component } from 'react';

export default class Button extends Component {

    static displayName = 'Button';
    static propsToMods = ['active'];
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
