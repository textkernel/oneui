import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    let view;

    const getInteractiveListItemAt = (index) => screen.getAllByRole('option')[index];

    beforeEach(() => {
        view = render(
            <Dropdown
                button={<Button isPrimary>Click me!</Button>}
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
        expect(view.container).toMatchSnapshot();
        expect(screen.queryAllByRole('option')).toHaveLength(0);
        expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });

    it('should render correctly opened', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Click me!' }));

        expect(view.container).toMatchSnapshot();
        expect(screen.getAllByRole('listbox')).toHaveLength(1);
        expect(screen.getAllByRole('option')).toHaveLength(1);
        expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });
    it('should access only enabled items with value during keyboard navigation', async () => {
        const user = userEvent.setup();
        view.rerender(
            <Dropdown
                button={<Button isPrimary>Click me!</Button>}
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
        await user.click(screen.getByRole('button', { name: 'Click me!' }));
        expect(view.container).toMatchSnapshot();
        // focus list
        await user.click(screen.getByRole('listbox'));
        const navigateDown = async () => user.keyboard('[ArrowDown]');

        // 1 keydown
        await navigateDown();
        expect(getInteractiveListItemAt(0).getAttribute('aria-selected')).toBeTruthy();
        expect(getInteractiveListItemAt(0)).toHaveTextContent('With value 1');
        // 2 keydown
        await navigateDown();
        expect(getInteractiveListItemAt(1).getAttribute('aria-selected')).toBeTruthy();
        expect(getInteractiveListItemAt(1)).toHaveTextContent('With value 2');
        // 3 keydown. Should be again last not disabled with value item => 'With value 2'
        await navigateDown();
        expect(getInteractiveListItemAt(1).getAttribute('aria-selected')).toBeTruthy();
        expect(getInteractiveListItemAt(1)).toHaveTextContent('With value 2');
    });

    it('onChange should return passed value', async () => {
        const user = userEvent.setup();
        view.rerender(
            <Dropdown
                button={<Button isPrimary>Click me!</Button>}
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
        await user.click(screen.getByRole('button', { name: 'Click me!' }));

        await user.keyboard('[ArrowDown]');
        await user.keyboard('[Enter]');

        expect(mockOnChange).toBeCalledWith('testValue');
    });

    it('should render correctly with mixed children: array and single ListItem', async () => {
        const user = userEvent.setup();
        view.rerender(
            <Dropdown
                button={<Button isPrimary>Click me!</Button>}
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
        await user.click(screen.getByRole('button', { name: 'Click me!' }));
        expect(view.container).toMatchSnapshot();
        expect(screen.getAllByRole('listitem')).toHaveLength(1);
        expect(screen.getAllByRole('option')).toHaveLength(2);
    });

    it('should call cb when button is clicked', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Click me!' }));
        expect(mockOnButtonClick).toHaveBeenCalledWith(false);
        await user.click(screen.getByRole('button', { name: 'Click me!' }));
        expect(mockOnButtonClick).toHaveBeenCalledWith(true);
    });

    it('should call callback when menu is focused', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Click me!' }));
        await user.click(screen.getByRole('listbox'));

        expect(mockOnMenuFocus).toHaveBeenCalled();
    });

    it('should call callback when menu is blurred', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Click me!' }));
        await user.click(screen.getByRole('listbox'));
        await user.click(document.body);

        expect(mockOnMenuBlur).toHaveBeenCalled();
    });

    it('should call callback when menu state is changed', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Click me!' }));
        // Event for a successful mouse click on dropdown button
        expect(mockOnDropdownStateChange).toHaveBeenCalledWith({
            isOpen: true,
            type: '__togglebutton_click__',
        });

        await user.keyboard('[ArrowDown]');
        // Event for a successful arrow down press when menu is opened
        expect(mockOnDropdownStateChange).toHaveBeenCalledWith({
            highlightedIndex: 0,
            type: '__menu_keydown_arrow_down__',
        });

        await user.click(document.body);
        // Event for a successful dropdown blur
        expect(mockOnDropdownStateChange).toHaveBeenCalledWith({
            highlightedIndex: -1,
            isOpen: false,
            type: '__menu_blur__',
        });
    });

    it('should open dropdown by default if corresponding prop is set', async () => {
        view = render(
            <Dropdown
                button={<Button isPrimary>Click me!</Button>}
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
        // we need to wait for the popup state to finish updating
        await waitFor(() => screen.getByRole('listitem'));

        expect(screen.getAllByRole('listitem')).toHaveLength(1);
        expect(screen.getAllByRole('option')).toHaveLength(2);
    });

    it('should allow for conditional rendering of items', async () => {
        const user = userEvent.setup();
        const condition = false;
        view.rerender(
            <Dropdown
                button={<Button isPrimary>Click me!</Button>}
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
                {condition ? <ListItem key="3">should not render</ListItem> : null}
            </Dropdown>
        );
        await user.click(screen.getAllByRole('button', { name: 'Click me!' })[1]);

        expect(view.container).toMatchSnapshot();
        expect(screen.queryByText('false')).not.toBeInTheDocument();
    });
});
