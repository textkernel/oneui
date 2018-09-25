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

    handleClick = (e) => {
        console.log('Dummy was clicked!')
    }

    render() {
        const { children } = this.props
        return (
            <div { ...this.block() }>
                <span { ...this.elem('label') }>
                    { children }
                </span>
            </div>
        )
    }
}
