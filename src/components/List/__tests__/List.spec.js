import React from 'react';
import toJson from 'enzyme-to-json';
import ListItem from '../ListItem';
import List from '../List';
import { LIST_NAVIGATION_DIRECTIONS } from '../../../constants';

describe('List component', () => {
    let consoleError;
    let wrapper;
    let listComponent;

    const itemNumbersArray = [0, 1, 2, 3, 4];
    const mockOnNavigate = jest.fn();
    const mockOnSelect = jest.fn();
    const mockOnClick = jest.fn();

    const getListItemAt = index => wrapper.children().childAt(index);

    const navigateUp = () => wrapper.children().simulate('keyDown', { key: 'ArrowUp' });
    const navigateDown = () => wrapper.children().simulate('keyDown', { key: 'ArrowDown' });

    beforeEach(() => {
        consoleError = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Initial rendering', () => {
        it('should render List correctly', () => {
            wrapper = mount(
                <List>
                    <ListItem>Item 1</ListItem>
                    <ListItem>Item 2</ListItem>
                </List>
            );

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('ul')).toHaveLength(1);
            expect(wrapper.find('ul').props()).toHaveProperty('onKeyDown');
            expect(consoleError).not.toHaveBeenCalled();
        });
        it('should render List correctly without keyboard navigation', () => {
            wrapper = mount(
                <List isControlledNavigation>
                    <ListItem>Item 1</ListItem>
                    <ListItem>Item 2</ListItem>
                </List>
            );

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('ul').props()).not.toHaveProperty('onKeyDown');
        });
        it('should render correctly with ref', () => {
            const ref = React.createRef();
            mount(
                <List ref={ref}>
                    <ListItem>Item 1</ListItem>
                    <ListItem>Item 2</ListItem>
                </List>
            );

            expect(ref.current.props.Component.displayName).toEqual('List');
        });
        it('should warn if children are not ListItem nor li', () => {
            mount(
                <List>
                    <a href="/">Item 1</a>
                    <a href="/">Item 2</a>
                </List>
            );
            expect(consoleError).toHaveBeenCalled();
            expect(consoleError.mock.calls[0][0]).toContain(
                "Failed prop type: 'List' children should be of type 'ListItem' or 'li'"
            );
        });
        it('should not warn if children marked with data-list-child', () => {
            mount(
                <List>
                    <a href="/" data-list-child>
                        Item 1
                    </a>
                </List>
            );
            expect(consoleError).not.toHaveBeenCalled();
        });
    });

    describe('Keyboard navigation', () => {
        beforeEach(() => {
            wrapper = mount(
                <List>
                    {itemNumbersArray.map(number => (
                        <ListItem>Item ${number}</ListItem>
                    ))}
                </List>
            );
            listComponent = wrapper.children();
        });

        it('should not have any item highlighted from the start', () => {
            itemNumbersArray.forEach(number => {
                expect(getListItemAt(number).props().isHighlighted).toBe(false);
            });
            expect(mockOnNavigate).not.toHaveBeenCalled();
        });

        it('should move highlight on components in both directions properly', () => {
            listComponent.simulate('click');
            navigateDown();

            expect(getListItemAt(0).props().isHighlighted).toBe(true);

            navigateDown();

            expect(getListItemAt(0).props().isHighlighted).toBe(false);
            expect(getListItemAt(1).props().isHighlighted).toBe(true);

            navigateUp();

            expect(getListItemAt(0).props().isHighlighted).toBe(true);
            expect(getListItemAt(1).props().isHighlighted).toBe(false);
        });

        it('should not let highlighted item got out of list bounds', () => {
            listComponent.simulate('click');
            navigateUp();
            navigateUp();

            expect(getListItemAt(0).props().isHighlighted).toBe(true);

            itemNumbersArray.forEach(() => {
                navigateDown();
                navigateDown();
            });

            expect(getListItemAt(itemNumbersArray.length - 1).props().isHighlighted).toBe(true);
        });

        it('should highlight an item by hovering on it', () => {
            expect(getListItemAt(0).props().isHighlighted).toBe(false);

            getListItemAt(0).simulate('mouseenter');

            expect(getListItemAt(0).props().isHighlighted).toBe(true);
        });

        it('should highlight items by using the combination of keyboard navigation and mouse enter event properly', () => {
            const itemIndexToHover = 3;

            listComponent.simulate('click');
            navigateDown();

            expect(getListItemAt(0).props().isHighlighted).toBe(true);

            getListItemAt(itemIndexToHover).simulate('mouseenter');

            expect(getListItemAt(0).props().isHighlighted).toBe(false);
            expect(getListItemAt(itemIndexToHover).props().isHighlighted).toBe(true);

            navigateDown();

            expect(getListItemAt(itemIndexToHover).props().isHighlighted).toBe(false);
            expect(getListItemAt(itemIndexToHover + 1).props().isHighlighted).toBe(true);
        });
    });

    describe('Callbacks', () => {
        beforeEach(() => {
            wrapper = mount(
                <List onNavigate={mockOnNavigate} onSelect={mockOnSelect}>
                    {itemNumbersArray.map(number => (
                        <ListItem onClick={() => mockOnClick(number)}>Item ${number}</ListItem>
                    ))}
                </List>
            );
            listComponent = wrapper.children();
        });

        it('should call onSelect callback of the highlighted item', () => {
            listComponent.simulate('click');
            navigateDown();
            navigateDown();
            listComponent.simulate('keyDown', { key: 'Enter' });

            expect(mockOnSelect).toBeCalledWith(1);
        });

        it('should call onClick after selecting the highlighted item', () => {
            listComponent.simulate('click');
            navigateDown();
            navigateDown();
            navigateDown();
            listComponent.simulate('keyDown', { key: 'Enter' });

            expect(mockOnClick).toBeCalledWith(2);
        });

        it('should call onNavigation callback', () => {
            listComponent.simulate('click');
            navigateDown();

            expect(mockOnNavigate).toBeCalledWith(0, LIST_NAVIGATION_DIRECTIONS.DOWN);

            navigateDown();
            navigateDown();
            navigateUp();

            expect(mockOnNavigate).toBeCalledWith(1, LIST_NAVIGATION_DIRECTIONS.UP);
        });
    });
});
