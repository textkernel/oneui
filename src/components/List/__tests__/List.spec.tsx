import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ListItem } from '../ListItem';
import { List, NOT_LIST_CHILD } from '../List';

describe('List component', () => {
    let view;
    const itemNumbersArray = [0, 1, 2, 3, 4];
    const mockOnClick = jest.fn();

    const getListItemAt = (index) => screen.getAllByRole('option')[index];
    const navigateDown = async (user) => {
        await user.keyboard('[ArrowDown]');
    };
    const navigateUp = async (user) => {
        await user.keyboard('[ArrowUp]');
    };

    describe('Initial rendering', () => {
        it('should render List correctly', async () => {
            view = render(
                <List>
                    <ListItem>Item 1</ListItem>
                    <ListItem>Item 2</ListItem>
                </List>
            );

            expect(view.container).toMatchSnapshot();
            expect(screen.getAllByRole('listbox')).toHaveLength(1);
            expect(screen.getByRole('listbox')).toHaveAttribute('tabindex', '0');
            expect(screen.getAllByRole('option')).toHaveLength(2);
        });
        it('should allow for conditional rendering of items', () => {
            const condition = false;
            view = render(
                <List>
                    {condition ? <ListItem>Item 1</ListItem> : null}
                    <ListItem>Item 2</ListItem>
                </List>
            );
            expect(view.container).toMatchSnapshot();

            expect(screen.queryByText('false')).not.toBeInTheDocument();
            expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
            expect(screen.getByText('Item 2')).toBeInTheDocument();
        });
        it('should render List correctly without keyboard navigation', () => {
            view = render(
                <List isControlledNavigation>
                    <ListItem>Item 1</ListItem>
                    <ListItem>Item 2</ListItem>
                </List>
            );
            expect(view.container).toMatchSnapshot();

            expect(screen.getByRole('list')).not.toHaveAttribute('tabindex', '0');
        });
    });
    describe('enriching children with props', () => {
        it('should not overwrite classes on children', () => {
            view = render(
                <List>
                    <ListItem className="test">Item 1</ListItem>
                    <ListItem className="test">Item 1</ListItem>
                </List>
            );
            expect(view.container).toMatchSnapshot();

            expect(getListItemAt(0)).toHaveClass('ListItem List__item');
            expect(getListItemAt(0)).toHaveClass('test');
        });
        it(`should not add extra class if has ${NOT_LIST_CHILD}`, () => {
            view = render(
                <List>
                    <ListItem className="test" data-list-exception>
                        Item 1
                    </ListItem>
                    <ListItem className="test">Item 1</ListItem>
                </List>
            );

            expect(getListItemAt(0)).not.toHaveClass('List__item');
            expect(getListItemAt(1)).toHaveClass('List__item');
        });
    });

    describe('Keyboard navigation', () => {
        beforeEach(() => {
            view = render(
                <List>
                    {itemNumbersArray.map((number) => (
                        <ListItem key={number}>Item ${number}</ListItem>
                    ))}
                </List>
            );
        });

        it('should not have any item selected by default', () => {
            itemNumbersArray.forEach((number) => {
                expect(getListItemAt(number)).toHaveAttribute('aria-selected', 'false');
            });
        });
        it('should focus list on Tab navigation', async () => {
            const user = userEvent.setup();
            expect(screen.getByRole('listbox')).not.toHaveFocus();
            await user.keyboard('[Tab]');
            expect(screen.getByRole('listbox')).toHaveFocus();
        });
        it('should focus list on click', async () => {
            const user = userEvent.setup();
            expect(screen.getByRole('listbox')).not.toHaveFocus();
            await user.click(getListItemAt(0));
            expect(screen.getByRole('listbox')).toHaveFocus();
        });
        it('should move selection of children in both directions properly', async () => {
            const user = userEvent.setup();
            await user.keyboard('[Tab]');

            await navigateDown(user);
            itemNumbersArray.forEach((number) => {
                if (number === 0) {
                    expect(getListItemAt(number)).toHaveAttribute('aria-selected', 'true');
                } else {
                    expect(getListItemAt(number)).toHaveAttribute('aria-selected', 'false');
                }
            });

            await navigateDown(user);
            expect(getListItemAt(0)).toHaveAttribute('aria-selected', 'false');
            expect(getListItemAt(1)).toHaveAttribute('aria-selected', 'true');

            await navigateUp(user);
            expect(getListItemAt(0)).toHaveAttribute('aria-selected', 'true');
            expect(getListItemAt(1)).toHaveAttribute('aria-selected', 'false');
        });

        it('should not let highlighted item got out of list bounds', async () => {
            const user = userEvent.setup();
            await user.keyboard('[Tab]');
            await navigateUp(user);
            await navigateUp(user);

            expect(getListItemAt(0)).toHaveAttribute('aria-selected', 'true');

            await navigateDown(user);
            await navigateDown(user);
            await navigateDown(user);
            await navigateDown(user);
            await navigateDown(user);

            expect(getListItemAt(itemNumbersArray.length - 1)).toHaveAttribute(
                'aria-selected',
                'true'
            );
        });
    });

    describe('Callbacks', () => {
        it('should call onClick only after selecting the highlighted item with clicking Enter', async () => {
            const user = userEvent.setup();
            view = render(
                <List>
                    {itemNumbersArray.map((number) => (
                        <ListItem key={number} onClick={() => mockOnClick(number)}>
                            Item ${number}
                        </ListItem>
                    ))}
                </List>
            );

            await user.keyboard('[Tab]');
            expect(mockOnClick).toHaveBeenCalledTimes(0);

            await navigateDown(user);
            await navigateDown(user);
            await navigateDown(user);
            expect(mockOnClick).toHaveBeenCalledTimes(0);

            await user.keyboard('[Enter]');

            expect(mockOnClick).toHaveBeenCalledTimes(1);
            expect(mockOnClick).toHaveBeenCalledWith(2);
        });

        it('should call onClick after navigating to the next highlighted item with doSelectOnNavigate enabled', async () => {
            const user = userEvent.setup();
            view = render(
                <List doSelectOnNavigate>
                    {itemNumbersArray.map((number) => (
                        <ListItem key={number} onClick={() => mockOnClick(number)}>
                            Item ${number}
                        </ListItem>
                    ))}
                </List>
            );

            await user.keyboard('[Tab]');
            await navigateDown(user);
            expect(mockOnClick).toHaveBeenLastCalledWith(0);

            await navigateDown(user);
            expect(mockOnClick).toHaveBeenLastCalledWith(1);

            await navigateDown(user);
            expect(mockOnClick).toHaveBeenLastCalledWith(2);

            expect(mockOnClick).toHaveBeenCalledTimes(3);
        });
    });
});
