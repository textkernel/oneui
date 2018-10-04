import React, { Component } from 'react'
import PropTypes from 'prop-types'
import bem from 'bem'
import dummyStyles from './Dummy.scss'

@bem(dummyStyles)
class Dummy extends Component {

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

Dummy.displayName = 'Dummy';

Dummy.propTypes = {
    /** Dummy Children */
    children: PropTypes.node,
     /** Is active */
    isActive: PropTypes.bool,
};

Dummy.defaultProps = {
    children: null,
    isActive: false,
};

export default Dummy;
