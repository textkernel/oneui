import React from 'react';
import toJson from 'enzyme-to-json';
import ListItem from '../ListItem';
import List from '../List';
import { LIST_NAVIGATION_DIRECTIONS } from '../../../constants';

describe('List component', () => {
    let consoleError;
    let wrapper;

    const itemNumbersArray = [0, 1, 2, 3, 4];
    const mockOnNavigate = jest.fn();
    const mockOnSelect = jest.fn();
    const mockOnClick = jest.fn();

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
            expect(consoleError).not.toHaveBeenCalled();
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
        });
    });

    describe('Keyboard navigation', () => {
        beforeEach(() => {
            wrapper = mount(
                <List onNavigate={mockOnNavigate} onSelect={mockOnSelect}>
                    {itemNumbersArray.map(number => (
                        <ListItem onClick={() => mockOnClick(number)}>Item ${number}</ListItem>
                    ))}
                </List>
            );
        });

        it('should not have any item highlighted from the start', () => {
            expect(mockOnNavigate).not.toHaveBeenCalled();
        });

        it('should update selectedIndex in both directions properly', () => {
            wrapper.children().simulate('click');
            navigateDown();

            expect(mockOnNavigate).toBeCalledWith(LIST_NAVIGATION_DIRECTIONS.DOWN);

            navigateDown();
            navigateUp();

            expect(mockOnNavigate).toBeCalledWith(LIST_NAVIGATION_DIRECTIONS.UP);
        });

        it('should not let highlighting selectedIndex got out of [0, itemsArray.length] bounds', () => {
            wrapper.children().simulate('click');
            navigateUp();
            navigateUp();

            expect(mockOnNavigate).toHaveBeenCalledTimes(1);

            itemNumbersArray.forEach(() => {
                navigateDown();
                navigateDown();
            });

            expect(mockOnNavigate).toHaveBeenCalledTimes(itemNumbersArray.length);
        });

        it('should call onSelect callback of the highlighted item', () => {
            wrapper.children().simulate('click');
            navigateDown();
            navigateDown();
            navigateDown();
            wrapper.children().simulate('keyDown', { key: 'Enter' });

            expect(mockOnClick).toBeCalledWith(2);
        });
    });
});
