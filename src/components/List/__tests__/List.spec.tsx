import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ListItem } from '../ListItem';
import { List, NOT_LIST_CHILD } from '../List';

describe('List component', () => {
    let consoleError;
    let listItems;
    let view;

    const itemNumbersArray = [0, 1, 2, 3, 4];
    const mockOnClick = jest.fn();

    const getListItemAt = (index) => screen.getAllByRole('option')[index];
    const navigateDown = async () => {
        const user = userEvent.setup();
        await user.keyboard('[ArrowDown]');
    };
    const navigateUp = async () => {
        const user = userEvent.setup();
        await user.keyboard('[ArrowUp]');
    };

    describe('Initial rendering', () => {
        it('should render List correctly', async () => {
            const user = userEvent.setup();
            consoleError = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
            view = render(
                <List>
                    <ListItem>Item 1</ListItem>
                    <ListItem>Item 2</ListItem>
                </List>
            );

            expect(view.container).toMatchSnapshot();

            expect(screen.getAllByRole('option')).toHaveLength(2);
            await user.click(screen.getAllByRole('option')[0]);
            expect(consoleError).not.toHaveBeenCalled();
            jest.clearAllMocks();
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

            expect(screen.getByRole('list')).not.toHaveAttribute('onKeyDown');
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
                    <ListItem className="test" data-list-exception>
                        Item 1
                    </ListItem>
                </List>
            );

            expect(getListItemAt(0)).not.toHaveClass('List__item');
        });
    });

    describe('Keyboard navigation', () => {
        beforeEach(() => {
            view = render(
                <List>
                    {itemNumbersArray.map((number) => (
                        <ListItem>Item ${number}</ListItem>
                    ))}
                </List>
            );
            listItems = screen.getAllByRole('option');
        });

        it('should not have any item highlighted from the start', () => {
            expect(view.container).toMatchSnapshot();
            itemNumbersArray.forEach((number) => {
                expect(getListItemAt(number)).not.toHaveAttribute('isHighlighted');
            });
        });

        it('should move highlight on components in both directions properly', async () => {
            const user = userEvent.setup();
            expect(view.container).toMatchSnapshot();
            await user.click(listItems[0]);
            await navigateDown();

            expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected');

            await navigateDown();

            expect(getListItemAt(0)).toHaveAttribute('aria-selected', 'false');
            expect(getListItemAt(1)).toHaveAttribute('aria-selected', 'true');

            await navigateUp();

            expect(getListItemAt(0)).toHaveAttribute('aria-selected', 'true');
            expect(getListItemAt(1)).toHaveAttribute('aria-selected', 'false');
        });

        it('should not let highlighted item got out of list bounds', async () => {
            const user = userEvent.setup();
            await user.click(listItems[0]);
            await navigateUp();
            await navigateUp();

            expect(getListItemAt(0)).toHaveAttribute('aria-selected', 'true');

            await navigateDown();
            await navigateDown();
            await navigateDown();
            await navigateDown();
            await navigateDown();

            expect(getListItemAt(itemNumbersArray.length - 1)).toHaveAttribute(
                'aria-selected',
                'true'
            );
        });
    });

    describe('Callbacks', () => {
        beforeEach(() => {
            view = render(
                <List>
                    {itemNumbersArray.map((number) => (
                        <ListItem onClick={() => mockOnClick(number)}>Item ${number}</ListItem>
                    ))}
                </List>
            );
            listItems = screen.getAllByRole('option');
        });

        it('should call onClick after selecting the highlighted item', async () => {
            const user = userEvent.setup();
            await user.click(listItems[0]);

            await navigateDown();
            await navigateDown();
            await navigateDown();
            await userEvent.keyboard('[Enter]');

            expect(mockOnClick).toBeCalledWith(2);
        });
        it.skip('should not call onClick after navigating to the next highlighted item', async () => {
            const user = userEvent.setup();
            listItems = screen.getAllByRole('option');
            await user.click(listItems[0]);

            await navigateDown();
            await navigateDown();
            await navigateDown();
            await user.keyboard('[Enter]');

            expect(mockOnClick).toHaveBeenCalledTimes(1);
        });
        it.skip('should call onClick after navigating to the next highlighted item with doSelectOnNavigate enabled', async () => {
            const user = userEvent.setup();
            view = render(
                <List doSelectOnNavigate>
                    {itemNumbersArray.map((number) => (
                        <ListItem onClick={() => mockOnClick(number)}>Item ${number}</ListItem>
                    ))}
                </List>
            );
            expect(view.container).toMatchSnapshot();
            listItems = screen.getAllByRole('option');

            await user.click(listItems[0]);
            await navigateDown();
            await navigateDown();
            await navigateDown();
            await user.keyboard('[Enter]');

            expect(getListItemAt(0)).toHaveClass('ListItem ListItem--clickable List__item');
            expect(mockOnClick).toHaveBeenCalledTimes(4);
        });
    });
});
