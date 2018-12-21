import React from 'react';
import toJson from 'enzyme-to-json';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';

describe('<Dropdown> that renders a dropdown element', () => {
    it('should render a basic dropdown correctly', () => {
        const onChange = jest.fn();
        const onClose = jest.fn();
        const wrapper = mount(
            <Dropdown label="My dropdown" onChange={onChange} onClose={onClose}>
                <DropdownItem value="1">Some item</DropdownItem>
                <DropdownItem value="2">Another item</DropdownItem>
                <DropdownItem value="3">More items</DropdownItem>
            </Dropdown>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.state().selection).toBeNull();

        // Expand the dropdown
        wrapper.find('Button').simulate('click');
        expect(wrapper.state().expanded).toBe(true);

        // Select an item and make sure state is updated and callback fired
        wrapper
            .find(DropdownItem)
            .first()
            .simulate('click');
        expect(onChange).toHaveBeenCalledWith('1');
        expect(wrapper.state().selection).toBe('1');

        // Verify that callback is fired on dropdown collapse
        wrapper.find('Button').simulate('click');
        expect(onClose).toHaveBeenCalledWith('1');
        expect(wrapper.state().expanded).toBe(false);
    });

    it('should add classes when props are changed', () => {
        const wrapper = shallow(
            <Dropdown
                label="My dropdown"
                context="primary"
                size="large"
                disabled
                isBlock
                initiallyOpened
                maxHeight={100}
                minWidth={300}
            >
                <DropdownItem value="1" disabled>
                    Some item
                </DropdownItem>
                <DropdownItem value="2">Another item</DropdownItem>
                <DropdownItem value="3">More items</DropdownItem>
            </Dropdown>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should filter items correctly', () => {
        const wrapper = mount(
            <Dropdown
                label="My dropdown"
                filter={{
                    placeholder: 'Test filtering options'
                }}
            >
                <DropdownItem value="1">test capitalization</DropdownItem>
                <DropdownItem value="2">Téšṫ diacritics</DropdownItem>
                <DropdownItem value="3">Match positioning test</DropdownItem>
            </Dropdown>
        );
        wrapper.setState({
            expanded: true
        });
        expect(toJson(wrapper)).toMatchSnapshot();

        const filterInput = wrapper.find('input');
        filterInput.simulate('change', { target: { value: 'Test' } });
        expect(wrapper.find(DropdownItem).length).toBe(3);

        wrapper.setProps({
            filter: {
                matchCase: true,
                matchPosition: 'start'
            }
        });
        filterInput.simulate('change', { target: { value: 'test' } });
        expect(wrapper.find(DropdownItem).length).toBe(1);
    });
});
