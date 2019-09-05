/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import bem from 'bem';
import { Popup, Select, Button } from '../../index';
import styles from './NestedPopups.scss';

const { elem } = bem({
    name: 'NestedPopups',
    classnames: styles,
});

const countries = [
    'Afghanistan',
    'Albania',
    'Bahamas',
    'Bahrain',
    "Côte d'Ivoire",
    'Cabo Verde',
    'Cambodia',
    'Democratic Republic of the Congo',
    'Denmark',
    'Djibouti',
    'Ecuador',
    'Egypt',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Haiti',
    'Holy See',
    'Iceland',
    'India',
    'Jamaica',
    'Japan',
    'Kazakhstan',
    'Kenya',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Singapore',
    'Slovakia',
    'Suriname',
    'Sweden',
    'Uganda',
    'Ukraine',
    'Yemen',
    'Zimbabwe',
];

export default class NestedPopups extends React.Component {
    static displayName = 'NestedPopups';

    static propTypes = {};

    static defaultProps = {};

    state = {};

    createButtonOnClickHandler = (setPopupVisibility, isOpened) => () => {
        if (isOpened === false) {
            setPopupVisibility(true);
        }
    };

    renderAnchor(setPopupVisibility, isOpened) {
        return (
            <Button onClick={this.createButtonOnClickHandler(setPopupVisibility, isOpened)}>
                Click me
            </Button>
        );
    }

    // eslint-disable-next-line class-methods-use-this
    renderContent() {
        return (
            <div {...elem('content', {})}>
                Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem
                Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw.
                <hr />
                <Select items={countries} />
            </div>
        );
    }

    render() {
        return (
            <Popup
                placement="down"
                anchor={({ setPopupVisibility, isOpened }) =>
                    this.renderAnchor(setPopupVisibility, isOpened)
                }
                content={({ anchorWidth }) => this.renderContent(anchorWidth)}
            />
        );
    }
}
