/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { Popup, Input } from '../../index';
import styles from './Select.scss';

const { elem } = bem({
    name: 'Select',
    classnames: styles,
});

export default class Select extends React.Component {
    static displayName = 'Select';

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.string),
    };

    static defaultProps = {
        items: [],
    };

    state = {
        inputValue: '',
    };

    createInputOnClickHandler = (setPopupVisibility, isOpened) => () => {
        if (isOpened === false) {
            setPopupVisibility(true);
        }
    };

    createItemClickHandler = (setPopupVisibility, value) => () => {
        this.setState({ inputValue: value }, () => setPopupVisibility(false));
    };

    handleInputChange = event => {
        this.setState({ inputValue: event.target.value });
    };

    // eslint-disable-next-line class-methods-use-this
    renderAnchor(setPopupVisibility, isOpened) {
        const { inputValue } = this.state;
        return (
            <Input
                value={inputValue}
                onChange={this.handleInputChange}
                onClick={this.createInputOnClickHandler(setPopupVisibility, isOpened)}
            />
        );
    }

    renderContent(setPopupVisibility, anchorWidth) {
        const { items } = this.props;
        const { inputValue } = this.state;
        const contentStyle = { width: `${anchorWidth}px` };
        return (
            <ul {...elem('list', {})} style={contentStyle}>
                {items
                    .filter(item => item.toLowerCase().includes(inputValue.toLowerCase()))
                    .map(item => (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                        <li
                            {...elem('listItem', {})}
                            key={item}
                            onClick={this.createItemClickHandler(setPopupVisibility, item)}
                        >
                            {item}
                        </li>
                    ))}
            </ul>
        );
    }

    render() {
        return (
            <Popup
                placement="down"
                anchor={({ setPopupVisibility, isOpened }) =>
                    this.renderAnchor(setPopupVisibility, isOpened)
                }
                content={({ setPopupVisibility, anchorWidth }) =>
                    this.renderContent(setPopupVisibility, anchorWidth)
                }
            />
        );
    }
}
