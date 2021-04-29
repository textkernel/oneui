import React from 'react';
import toJson from 'enzyme-to-json';
import { Dropdown } from '../Dropdown';
import { Button } from '../../Buttons';
import { ListItem } from '../../List';

describe('Dropdown', () => {
    const mockOnChange = jest.fn();
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Dropdown
                items={['first-value']}
                button={<Button context="brand">Click me!</Button>}
                onChange={mockOnChange}
                placement="top-start"
            >
                {({ getItemPropsByIndex }) => (
                    <>
                        <ListItem disabled>Disabled</ListItem>
                        <ListItem {...getItemPropsByIndex(0)}>With value</ListItem>
                    </>
                )}
            </Dropdown>
        );
    });

    it('should render correctly closed', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('ListItem')).toHaveLength(0);
        wrapper.unmount();
    });

    it('should render correctly opened', () => {
        wrapper.find('button').simulate('click');
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('List')).toHaveLength(1);
        expect(wrapper.find('ListItem')).toHaveLength(2);
        wrapper.unmount();
    });

    it('should downshift only by enabled items with value', () => {
        wrapper = mount(
            <Dropdown
                items={['1', '2']}
                button={<Button context="brand">Click me!</Button>}
                onChange={mockOnChange}
                placement="top-start"
            >
                {({ getItemPropsByIndex }) => (
                    <>
                        <ListItem disabled>Disabled</ListItem>
                        <ListItem {...getItemPropsByIndex(0)}>With value 1</ListItem>
                        <ListItem>Without value</ListItem>
                        <div className="customDiv">Div</div>
                        <ListItem {...getItemPropsByIndex(1)}>With value 2</ListItem>
                    </>
                )}
            </Dropdown>
        );
        wrapper.find('button').simulate('click');
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('ul').children()).toHaveLength(5);

        const keyDown = () => wrapper.find('List').simulate('keyDown', { key: 'ArrowDown' });
        const findHighlighted = () =>
            wrapper
                .find('ul')
                .children()
                .filterWhere((component) => component.props().isHighlighted === true);

        // 1 keydown
        keyDown();
        const highlightedItem1 = findHighlighted();
        expect(highlightedItem1).toHaveLength(1);
        expect(highlightedItem1.text()).toContain('With value 1');

        // 2 keydown
        keyDown();
        const highlightedItem2 = findHighlighted();
        expect(highlightedItem2).toHaveLength(1);
        expect(highlightedItem2.text()).toContain('With value 2');

        // 3 keydown. Should be again last not disabled with value item => 'With value 2'
        keyDown();
        const highlightedItem3 = findHighlighted();
        expect(highlightedItem3).toHaveLength(1);
        expect(highlightedItem3.text()).toContain('With value 2');

        wrapper.unmount();
    });

    it('onChange should return passed value', () => {
        wrapper = mount(
            <Dropdown
                items={['testValue']}
                button={<Button context="brand">Click me!</Button>}
                onChange={mockOnChange}
                placement="top-start"
            >
                {({ getItemPropsByIndex }) => (
                    <>
                        <ListItem disabled>Disabled</ListItem>
                        <ListItem {...getItemPropsByIndex(0)}>With value</ListItem>
                    </>
                )}
            </Dropdown>
        );
        wrapper.find('button').simulate('click');

        wrapper.find('List').simulate('keyDown', { key: 'ArrowDown' });
        wrapper.find('List').simulate('keyDown', { key: 'Enter' });

        expect(mockOnChange).toBeCalledWith('testValue');

        wrapper.unmount();
    });

    it('should render correctly with mixed children: array and single ListItem', () => {
        wrapper = mount(
            <Dropdown
                items={['one', 'two']}
                button={<Button context="brand">Click me!</Button>}
                onChange={mockOnChange}
                placement="top-start"
            >
                {({ getItemPropsByIndex }) => (
                    <>
                        <ListItem disabled>Disabled</ListItem>
                        {['one', 'two'].map((value, index) => (
                            <ListItem key={value} {...getItemPropsByIndex(index)}>
                                {value}
                            </ListItem>
                        ))}
                    </>
                )}
            </Dropdown>
        );
        wrapper.find('button').simulate('click');
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('ListItem')).toHaveLength(3);
        wrapper.unmount();
    });

    it('isOpen should open and close list of items', () => {
        wrapper = mount(
            <Dropdown
                isOpen
                items={['testValue']}
                button={<Button context="brand">Click me!</Button>}
                onChange={mockOnChange}
                placement="top-start"
            >
                {({ getItemPropsByIndex }) => (
                    <ListItem {...getItemPropsByIndex(0)}>With value</ListItem>
                )}
            </Dropdown>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('ListItem')).toHaveLength(1);
        wrapper.setProps({ isOpen: false });
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('ListItem')).toHaveLength(0);
        wrapper.unmount();
    });

    it('onOpen and onClose should fired on button click', () => {
        const mockOnOpen = jest.fn();
        const mockOnClose = jest.fn();
        wrapper = mount(
            <Dropdown
                items={['testValue']}
                button={<Button context="brand">Click me!</Button>}
                onChange={mockOnChange}
                onOpen={mockOnOpen}
                onClose={mockOnClose}
                placement="top-start"
            >
                {({ getItemPropsByIndex }) => (
                    <ListItem {...getItemPropsByIndex(0)}>With value</ListItem>
                )}
            </Dropdown>
        );
        wrapper.find('button').simulate('click');

        expect(mockOnOpen).toBeCalledTimes(1);
        expect(mockOnClose).toBeCalledTimes(0);

        wrapper.find('button').simulate('click');

        expect(mockOnOpen).toBeCalledTimes(1);
        expect(mockOnClose).toBeCalledTimes(1);

        wrapper.unmount();
    });

    it('onClose should fired after selection item', () => {
        const mockOnClose = jest.fn();
        wrapper = mount(
            <Dropdown
                items={['testValue']}
                button={<Button context="brand">Click me!</Button>}
                onChange={mockOnChange}
                onClose={mockOnClose}
                placement="top-start"
            >
                {({ getItemPropsByIndex }) => (
                    <ListItem {...getItemPropsByIndex(0)}>With value</ListItem>
                )}
            </Dropdown>
        );
        wrapper.find('button').simulate('click');

        wrapper.find('List').simulate('keyDown', { key: 'ArrowDown' });
        wrapper.find('List').simulate('keyDown', { key: 'Enter' });

        expect(mockOnClose).toBeCalledTimes(1);

        wrapper.unmount();
    });

    it('should throw error while itemToString is missed and items are not strings', () => {
        expect(() =>
            shallow(
                <Dropdown
                    items={[{ value: 'testValue' }]}
                    button={<Button context="brand">Click me!</Button>}
                    onChange={mockOnChange}
                    placement="top-start"
                >
                    {({ getItemPropsByIndex }) => (
                        <ListItem {...getItemPropsByIndex(0)}>With value</ListItem>
                    )}
                </Dropdown>
            )
        ).toThrow('You need pass "itemToString" for non string "items"');
    });

    it('itemToString should correctly convert', () => {
        wrapper = mount(
            <Dropdown
                items={[{ value: 'testValue' }]}
                button={<Button context="brand">Click me!</Button>}
                onChange={mockOnChange}
                itemToString={(item) => item.value}
                placement="top-start"
            >
                {({ getItemPropsByIndex }) => (
                    <>
                        <ListItem disabled>Disabled</ListItem>
                        <ListItem {...getItemPropsByIndex(0)}>With value</ListItem>
                    </>
                )}
            </Dropdown>
        );
        wrapper.find('button').simulate('click');

        wrapper.find('List').simulate('keyDown', { key: 'ArrowDown' });
        wrapper.find('List').simulate('keyDown', { key: 'Enter' });

        expect(mockOnChange).toBeCalledWith({ value: 'testValue' });

        wrapper.unmount();
    });
});
