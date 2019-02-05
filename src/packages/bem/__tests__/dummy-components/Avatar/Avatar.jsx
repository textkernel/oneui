import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bem from '../../../';
import classnamesMap from './classnamesMap.json';

class Avatar extends Component {

    static displayName = 'Avatar';

    static propTypes = {
        match: PropTypes.number,
    }

    static defaultProps = {
        match: 0,
    }

    calculateOutlineColor() {
        const { match } = this.props;
        if (match > 77) return 'green';
        if (match > 33) return 'yellow';
        if (match >= 0) return 'red';
        return 'red';
    }

    calculateIsPerfect() {
        const { match } = this.props;
        return match === 100;
    }

    calculateUnmatchScore() {
        const { match } = this.props;
        return 100 - match;
    }

    render() {
        const outlineColor = this.calculateOutlineColor();
        const isPerfect = this.calculateIsPerfect();
        const unmatchScore = this.calculateUnmatchScore();
        const extraMods = {
            outlineColor, // String mod
            unmatchScore, // Number mod
            isPerfect, // Boolean mod
        };
        return (
            <div { ...this.block(extraMods) }>
                <div { ...this.elem('image', extraMods) }>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default bem(classnamesMap)(Avatar);
