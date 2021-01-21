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
                button={<Button context="brand">Click me!</Button>}
                onChange={mockOnChange}
                placement="top-start"
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
        expect(highlightedItem1.key()).toContain('key-2');

        // 2 keydown
        keyDown();
        const highlightedItem2 = findHighlighted();
        expect(highlightedItem2).toHaveLength(1);
        expect(highlightedItem2.key()).toContain('key-5');

        // 3 keydown. Should be again last not disabled with value item => 'key-5'
        keyDown();
        const highlightedItem3 = findHighlighted();
        expect(highlightedItem3).toHaveLength(1);
        expect(highlightedItem3.key()).toContain('key-5');

        wrapper.unmount();
    });

    it('onChange should return passed value', () => {
        wrapper = mount(
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
        wrapper.find('button').simulate('click');

        wrapper.find('List').simulate('keyDown', { key: 'ArrowDown' });
        wrapper.find('List').simulate('keyDown', { key: 'Enter' });

        expect(mockOnChange).toBeCalledWith('testValue');

        wrapper.unmount();
    });
});
