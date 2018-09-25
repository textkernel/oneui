import React, { Component } from 'react';

export default class Dummy extends Component {

    static propTypes = {
        children: PropTypes.node,
    };
    
    static defaultProps = {
        children: null,
    };

    handleClick = (e) => {
        console.log('Dummy was clicked!')
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                { children }
            </div>
        )
    }
}
