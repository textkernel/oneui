import * as React from 'react';
import { FaPlus } from 'react-icons/fa';
import { bem } from '../../utils/bem/bem';
import { Button } from '../Buttons';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Text } from '../Text';
import { PopupBase } from '../PopupBase';
import { ENTER_KEY } from '../../constants';
import styles from './LabelPicker.scss';

const { elem } = bem('LabelPicker', styles);

export type Label = {
    /** the display name to be shown to the user */
    name: string;
    /** state of the label: selected or not */
    isSelected: boolean;
    /** the number of occurrences will be shown next to the name */
    count?: number;
};

export interface Props<L extends Label> {
    /** a list of available labels and their attributes */
    labels: L[];
    /** a button like element that supports onClick handler and ref forwarding. It will be used as the trigger. */
    children: React.ReactElement<{ onClick: (event: React.MouseEvent) => void }>;
    /** callback to be called when the user clicks the checkbox - updating the state of the checkbox is up to the consuming application */
    onChange: (label: L, event: React.ChangeEventHandler<HTMLInputElement>) => void;
    /** callback to add new label */
    onAdd: (name: string) => void;
    /** callback fired when the component closes, outer click or through the trigger button */
    onClose?: () => void;
    /** text to be shown as input placeholder for adding labels */
    inputPlaceholder: string;
}

export function LabelPicker<L extends Label>(props: Props<L>) {
    const { labels, children, onChange, onAdd, onClose, inputPlaceholder } = props;
    const [inputValue, setInputValue] = React.useState('');

    const getChangeHandler = (label) => (event) => {
        onChange(label, event);
    };

    const handleAdd = () => {
        onAdd(inputValue);
        setInputValue('');
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputValue(value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ENTER_KEY) {
            handleAdd();
        }
    };

    const renderAnchor = ({ setPopupVisibility, isOpen }) => {
        const toggleDropdown = (event) => {
            // call the onClick function that might have been set on the child
            children.props?.onClick?.(event);
            if (isOpen && onClose) {
                onClose();
            }
            setPopupVisibility(!isOpen);
        };

        return React.cloneElement(children, {
            onClick: toggleDropdown,
        });
    };

    const renderDialog = ({ isOpen }) => (
        <div {...elem('dialog')} role="dialog">
            {isOpen ? (
                <div {...elem('container')}>
                    <div {...elem('scrollBox')}>
                        {labels.map((label) => (
                            <Checkbox
                                key={label.name}
                                id={label.name}
                                checked={label.isSelected}
                                onChange={getChangeHandler(label)}
                                {...elem('checkbox')}
                                asFlexbox
                                role="checkbox"
                            >
                                <Text inline {...elem('label')}>
                                    <Text inline {...elem('labelText')} title={label.name}>
                                        {label.name}
                                    </Text>
                                    {label.count ? (
                                        <Text inline context="neutral" {...elem('count')}>
                                            ({label.count})
                                        </Text>
                                    ) : null}
                                </Text>
                            </Checkbox>
                        ))}
                    </div>
                    <div {...elem('inputLine')}>
                        <Input
                            placeholder={inputPlaceholder}
                            size="small"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            value={inputValue}
                            {...elem('input')}
                            isBlock
                        />
                        <Button
                            context="primary"
                            size="medium"
                            onClick={handleAdd}
                            disabled={!inputValue}
                            {...elem('addButton')}
                        >
                            <FaPlus width="24px" height="24px" />
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    );

    return (
        <PopupBase
            anchorRenderer={renderAnchor}
            popupRenderer={renderDialog}
            onClose={onClose}
            popperOptions={{
                modifiers: [
                    {
                        name: 'offset',
                        options: { offset: [0, 3] },
                    },
                ],
            }}
            placement="bottom-end"
        />
    );
}

LabelPicker.displayName = 'LabelPicker';
