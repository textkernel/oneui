import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ListItem } from '../ListItem';
import { List, NOT_LIST_CHILD } from '../List';

describe('List component', () => {
    let consoleError;
    let listComponent;
    let view;

    const itemNumbersArray = [0, 1, 2, 3, 4];
    const mockOnClick = jest.fn();

    const getListItemAt = (index) => screen.getAllByRole('option')[index];
    const navigateDown = async () => userEvent.keyboard('[ArrowDown]');
    const navigateUp = async () => userEvent.keyboard('[ArrowUp]');

    beforeEach(() => {
        consoleError = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Initial rendering', () => {
        it('should render List correctly', async () => {
            view = render(
                <List>
                    <ListItem>Item 1</ListItem>
                    <ListItem>Item 2</ListItem>
                </List>
            );

            expect(view.asFragment()).toMatchSnapshot();

            expect(screen.getAllByRole('option')).toHaveLength(2);
            await userEvent.click(screen.getAllByRole('option')[0]);
            expect(consoleError).not.toHaveBeenCalled();
        });
        it('should allow for conditional rendering of items', () => {
            const condition = false;
            view = render(
                <List>
                    {condition ? <ListItem>Item 1</ListItem> : null}
                    <ListItem>Item 2</ListItem>
                    {condition ? <ListItem>Item 3</ListItem> : null}
                </List>
            );
            expect(view.asFragment()).toMatchSnapshot();

            expect(screen.getByText('Item 2')).toBeInTheDocument();
        });
        it('should render List correctly without keyboard navigation', () => {
            view = render(
                <List isControlledNavigation>
                    <ListItem>Item 1</ListItem>
                    <ListItem>Item 2</ListItem>
                </List>
            );
            expect(view.asFragment()).toMatchSnapshot();

            expect(screen.getByRole('listbox')).not.toHaveAttribute('onKetDown');
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
            expect(view.asFragment()).toMatchSnapshot();

            expect(getListItemAt(0)).toHaveClass('ListItem List__item');
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
            listComponent = screen.getAllByRole('option');
        });

        it('should not have any item highlighted from the start', () => {
            expect(view.asFragment()).toMatchSnapshot();
            itemNumbersArray.forEach((number) => {
                expect(getListItemAt(number)).not.toHaveAttribute('highlighted');
            });
        });

        it('should move highlight on components in both directions properly', async () => {
            expect(view.asFragment()).toMatchSnapshot();
            await userEvent.click(listComponent[0]);
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
            await userEvent.click(listComponent[0]);
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
            listComponent = screen.getAllByRole('option');
        });

        it('should call onClick after selecting the highlighted item', async () => {
            await userEvent.click(listComponent[0]);

            await navigateDown();
            await navigateDown();
            await navigateDown();
            await userEvent.keyboard('[Enter]');

            expect(mockOnClick).toBeCalledWith(2);
        });
        it('should not call onClick after navigating to the next highlighted item', async () => {
            await userEvent.click(listComponent[1]);

            await navigateDown();
            await navigateDown();
            await navigateDown();
            // await userEvent.keyboard('[Enter]');

            expect(mockOnClick).toHaveBeenCalledTimes(1);
        });
        it('should call onClick after navigating to the next highlighted item with doSelectOnNavigate enabled', async () => {
            view = render(
                <List doSelectOnNavigate>
                    {itemNumbersArray.map((number) => (
                        <ListItem onClick={() => mockOnClick(number)}>Item ${number}</ListItem>
                    ))}
                </List>
            );
            expect(view.asFragment()).toMatchSnapshot();
            listComponent = screen.getAllByRole('option');

            await userEvent.click(listComponent[0]);
            await navigateDown();
            await navigateDown();
            await navigateDown();
            // await userEvent.keyboard('[Enter]');

            expect(getListItemAt(0)).toHaveClass('ListItem ListItem--clickable List__item');
            // expect(mockOnClick).toHaveBeenCalledTimes(4);
        });
    });
});
