import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import { Dropdown } from '../Dropdown';
import { Button } from '../../Buttons';
import { ListItem } from '../../List';
import '@testing-library/jest-dom';

describe('Dropdown', () => {
    const mockOnChange = jest.fn();
    const mockOnButtonClick = jest.fn();
    const mockOnMenuFocus = jest.fn();
    const mockOnMenuBlur = jest.fn();
    const mockOnDropdownStateChange = jest.fn();
    let wrapper;

    beforeEach(() => {
        wrapper = render(
            <Dropdown
                button={<Button context="brand">Click me!</Button>}
                onChange={mockOnChange}
                placement="top-start"
                onToggleClick={mockOnButtonClick}
                onMenuFocus={mockOnMenuFocus}
                onMenuBlur={mockOnMenuBlur}
                additionalSelectProps={{
                    onStateChange: mockOnDropdownStateChange,
                }}
            >
                <ListItem key="disabled-key" disabled>
                    Disabled
                </ListItem>
                <ListItem key="first-key" value="first-value">
                    With value
                </ListItem>
            </Dropdown>
        );
    });

    it('should render correctly closed', () => {
        expect(wrapper.asFragment()).toMatchSnapshot();
        expect(screen.queryAllByRole('presentation')).toHaveLength(0);
    });

    it('should render correctly opened', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Click me!' }));
        expect(wrapper.asFragment()).toMatchSnapshot();
        expect(screen.getAllByRole('listbox')).toHaveLength(1);
        expect(screen.getAllByRole('presentation')).toHaveLength(2);
    });
    it('should downshift only by enabled items with value', () => {
        wrapper = render(
            <Dropdown
                button={<Button context="brand">Click me!</Button>}
                onChange={mockOnChange}
                placement="top-start"
            >
                <ListItem key="key-1" disabled>
                    Disabled
                </ListItem>
                <ListItem key="key-2" value="1">
                    With value 1
                </ListItem>
                <ListItem key="key-3">Without value</ListItem>
                <div className="customDiv" key="key-4">
                    Div
                </div>
                <ListItem key="key-5" value="2">
                    With value 2
                </ListItem>
            </Dropdown>
        );
        fireEvent.click(screen.getAllByRole('button', { name: 'Click me!' }).at(1));
        expect(wrapper.asFragment()).toMatchSnapshot();
        const keyDown = () =>
            fireEvent.keyDown(screen.getAllByRole('listbox')[1], { key: 'ArrowDown' });

        // 1 keydown
        keyDown();
        expect(screen.getAllByRole('presentation')[1].getAttribute('aria-selected')).toBeTruthy();
        expect(screen.getAllByRole('presentation')[1]).toHaveTextContent('With value 1');
        // 2 keydown
        keyDown();
        expect(screen.getAllByRole('presentation')[3].getAttribute('aria-selected')).toBeTruthy();
        expect(screen.getAllByRole('presentation')[3]).toHaveTextContent('With value 2');
        // 3 keydown. Should be again last not disabled with value item => 'With value 2'
        keyDown();
        expect(screen.getAllByRole('presentation')[3].getAttribute('aria-selected')).toBeTruthy();
        expect(screen.getAllByRole('presentation')[3]).toHaveTextContent('With value 2');
    });

    it('onChange should return passed value', () => {
        wrapper = render(
            <Dropdown
                button={<Button context="brand">Click me!</Button>}
                onChange={mockOnChange}
                placement="top-start"
            >
                <ListItem key="key-1" disabled>
                    Disabled
                </ListItem>
                <ListItem key="key-2" value="testValue">
                    With value
                </ListItem>
            </Dropdown>
        );
        fireEvent.click(screen.getAllByRole('button', { name: 'Click me!' }).at(1));

        fireEvent.keyDown(screen.getAllByRole('listbox')[1], { key: 'ArrowDown' });
        fireEvent.keyDown(screen.getAllByRole('presentation')[0], { key: 'Enter' });

        expect(mockOnChange).toBeCalledWith('testValue');
    });

    it('should render correctly with mixed children: array and single ListItem', () => {
        wrapper = render(
            <Dropdown
                button={<Button context="brand">Click me!</Button>}
                onChange={mockOnChange}
                placement="top-start"
            >
                <ListItem key="disabled-key" disabled>
                    Disabled
                </ListItem>
                {['one', 'two'].map((value) => (
                    <ListItem key={value} value={value}>
                        {value}
                    </ListItem>
                ))}
            </Dropdown>
        );
        fireEvent.click(screen.getAllByRole('button', { name: 'Click me!' }).at(1));
        expect(wrapper.asFragment()).toMatchSnapshot();
        expect(screen.getAllByRole('presentation')).toHaveLength(3);
    });

    it('should call cb when button is clicked', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Click me!' }));
        expect(mockOnButtonClick).toHaveBeenCalledWith(false);
        fireEvent.click(screen.getByRole('button', { name: 'Click me!' }));
        expect(mockOnButtonClick).toHaveBeenCalledWith(true);
    });

    it('should call callback when menu is focused', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Click me!' }));
        fireEvent.focus(screen.getByRole('listbox'));

        expect(mockOnMenuFocus).toHaveBeenCalled();
    });

    it('should call callback when menu is blurred', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Click me!' }));
        fireEvent.focus(screen.getByRole('listbox'));
        fireEvent.blur(screen.getByRole('listbox'));

        expect(mockOnMenuBlur).toHaveBeenCalled();
    });

    it('should call callback when menu state is changed', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Click me!' }));
        // Event for a successful mouse click on dropdown button
        expect(mockOnDropdownStateChange).toHaveBeenCalledWith({
            isOpen: true,
            type: '__togglebutton_click__',
        });

        fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' });
        // Event for a successful arrow down press when menu is opened
        expect(mockOnDropdownStateChange).toHaveBeenCalledWith({
            highlightedIndex: 0,
            type: '__menu_keydown_arrow_down__',
        });

        fireEvent.blur(screen.getByRole('listbox'));
        // Event for a successful dropdown blur
        expect(mockOnDropdownStateChange).toHaveBeenCalledWith({
            highlightedIndex: -1,
            isOpen: false,
            type: '__menu_blur__',
        });
    });

    it('should open dropdown by default if corresponding prop is set', () => {
        wrapper = render(
            <Dropdown
                button={<Button context="brand">Click me!</Button>}
                onChange={mockOnChange}
                placement="top-start"
                additionalSelectProps={{
                    initialIsOpen: true,
                }}
            >
                <ListItem key="disabled-key" disabled>
                    Disabled
                </ListItem>
                {['one', 'two'].map((value) => (
                    <ListItem key={value} value={value}>
                        {value}
                    </ListItem>
                ))}
            </Dropdown>
        );

        expect(screen.getAllByRole('presentation')).toHaveLength(3);
    });

    it('should allow for conditional rendering of items', () => {
        const condition = false;
        wrapper = render(
            <Dropdown
                button={<Button context="brand">Click me!</Button>}
                onChange={mockOnChange}
                placement="top-start"
            >
                {condition ? (
                    <ListItem key="key-1" disabled>
                        Disabled
                    </ListItem>
                ) : null}
                <ListItem key="key-2" value="testValue">
                    With value
                </ListItem>
                {condition && <ListItem key="3">should not render</ListItem>}
            </Dropdown>
        );
        fireEvent.click(screen.getAllByRole('button', { name: 'Click me!' }).at(1));

        expect(wrapper.asFragment()).toMatchSnapshot();
        expect(screen.queryByText('false')).toBeNull();
    });
});
