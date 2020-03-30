import React from 'react';
import toJson from 'enzyme-to-json';
import { ListItem } from '../ListItem';
import { List, NOT_LIST_CHILD } from '../List';

describe('List component', () => {
    let consoleError;
    let wrapper;
    let listComponent;

    const itemNumbersArray = [0, 1, 2, 3, 4];
    const mockOnClick = jest.fn();

    const getListItemAt = (index) => wrapper.children().childAt(index);

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
        describe('enriching children with props', () => {
            it('should not overwrite classes on children', () => {
                wrapper = mount(
                    <List>
                        <li className="test">Item 1</li>
                    </List>
                );
                expect(wrapper.find('li').props().className).toContain('test');
            });
            it(`should not add extra class if has ${NOT_LIST_CHILD}`, () => {
                wrapper = mount(
                    <List>
                        <li className="test" data-list-exception>
                            Item 1
                        </li>
                    </List>
                );
                expect(wrapper.find('li').props().className).not.toContain('List__item');
            });
        });
    });

    describe('Keyboard navigation', () => {
        beforeEach(() => {
            wrapper = mount(
                <List>
                    {itemNumbersArray.map((number) => (
                        <ListItem>Item ${number}</ListItem>
                    ))}
                </List>
            );
            listComponent = wrapper.children();
        });

        it('should not have any item highlighted from the start', () => {
            itemNumbersArray.forEach((number) => {
                expect(getListItemAt(number).props().isHighlighted).toBe(false);
            });
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
    });

    describe('Callbacks', () => {
        beforeEach(() => {
            wrapper = mount(
                <List>
                    {itemNumbersArray.map((number) => (
                        <ListItem onClick={() => mockOnClick(number)}>Item ${number}</ListItem>
                    ))}
                </List>
            );
            listComponent = wrapper.children();
        });

        it('should call onClick after selecting the highlighted item', () => {
            listComponent.simulate('click');
            navigateDown();
            navigateDown();
            navigateDown();
            listComponent.simulate('keyDown', { key: 'Enter' });

            expect(mockOnClick).toBeCalledWith(2);
        });
        it('should not call onClick after navigating to the next highlighted item', () => {
            listComponent = wrapper.children();

            listComponent.simulate('click');
            navigateDown();
            navigateDown();
            navigateDown();
            listComponent.simulate('keyDown', { key: 'Enter' });

            expect(mockOnClick).toHaveBeenCalledTimes(1);
        });
        it('should call onClick after navigating to the next highlighted item with doSelectOnNavigate enabled', () => {
            wrapper = mount(
                <List doSelectOnNavigate>
                    {itemNumbersArray.map((number) => (
                        <ListItem onClick={() => mockOnClick(number)}>Item ${number}</ListItem>
                    ))}
                </List>
            );
            listComponent = wrapper.children();

            listComponent.simulate('click');
            navigateDown();
            navigateDown();
            navigateDown();
            listComponent.simulate('keyDown', { key: 'Enter' });

            expect(mockOnClick).toHaveBeenCalledTimes(4);
        });
    });
});
