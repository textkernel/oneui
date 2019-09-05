import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { Popup } from '../../index';
import styles from './Tooltip.scss';

const { elem } = bem({
    name: 'Tooltip',
    classnames: styles,
});

export default class Tooltip extends React.Component {
    static displayName = 'Tooltip';

    static propTypes = {
        anchor: PropTypes.node.isRequired,
        content: PropTypes.node.isRequired,
        placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    };

    static defaultProps = {
        placement: 'bottom',
    };

    createMouseEnterHandler = setPopupVisibility => () => {
        setPopupVisibility(true);
    };

    createMouseLeaveHandler = setPopupVisibility => () => {
        setPopupVisibility(false);
    };

    // eslint-disable-next-line class-methods-use-this
    renderAnchor(setPopupVisibility) {
        const { anchor } = this.props;
        return (
            <div
                {...elem('anchor', {})}
                onMouseEnter={this.createMouseEnterHandler(setPopupVisibility)}
                onMouseLeave={this.createMouseLeaveHandler(setPopupVisibility)}
            >
                {anchor}
            </div>
        );
    }

    renderContent() {
        const { content } = this.props;
        return <div {...elem('content', {})}>{content}</div>;
    }

    render() {
        const { placement } = this.props;
        return (
            <Popup
                placement={placement}
                anchor={({ setPopupVisibility }) => this.renderAnchor(setPopupVisibility)}
                content={({ setPopupVisibility }) => this.renderContent(setPopupVisibility)}
            />
        );
    }
}
