import React, { Component } from 'react'
import PropTypes from 'prop-types'
import bem from 'bem'
import dummyStyles from './Dummy.scss'

@bem(dummyStyles)
export default class Dummy extends Component {

    static propTypes = {
        children: PropTypes.node,
        isActive: PropTypes.bool,
    }

    static defaultProps = {
        children: null,
        isActive: false,
    }

    static propsToMods = [ 'isActive' ]
    static stateToMods = [ 'isClicked' ]

    state = {
        isClicked: false,
    };

    handleClick = (e) => {
        this.setState({ isClicked: !this.state.isClicked })
    }

    render() {
        const { children } = this.props
        return (
            <div { ...this.block() } onClick={this.handleClick}>
                <span { ...this.elem('label') }>
                    { children }
                </span>
            </div>
        )
    }
}
