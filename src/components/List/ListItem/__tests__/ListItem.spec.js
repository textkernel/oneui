import React from 'react';
import toJson from 'enzyme-to-json';
import { ListItem } from '../ListItem';
import { Text } from '../../../Text';

describe('ListItem component', () => {
    it('should render ListItem correctly', () => {
        const ref = React.createRef();
        const wrapper = mount(
            <ListItem ref={ref}>
                <Text>An item</Text>
            </ListItem>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should turn string items to Text', () => {
        const wrapper = mount(<ListItem>Simple string</ListItem>);

        expect(wrapper.find('Text')).toHaveLength(1);
    });
    it('should not add clickable class when onClick is not defined', () => {
        const wrapper = mount(<ListItem>An item</ListItem>);

        expect(wrapper.find('.ListItem--clickable')).toHaveLength(0);
    });
    it('should add clickable class when onClick is defined', () => {
        const wrapper = mount(<ListItem onClick={jest.fn()}>An item</ListItem>);

        expect(wrapper.find('.ListItem--clickable')).toHaveLength(1);
    });
    it('should call onClick function when clicked', () => {
        const onClick = jest.fn();
        const wrapper = mount(<ListItem onClick={onClick}>An item</ListItem>);
        wrapper.find('div').simulate('click');

        expect(onClick).toHaveBeenCalledTimes(1);
    });
    it('should render correctly when disabled', () => {
        const wrapper = mount(<ListItem disabled>An item</ListItem>);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('li').prop('className')).toBe('ListItem ListItem--disabled');
        expect(wrapper.find('li').prop('disabled')).toBeUndefined();
    });
    it('should set disabled prop on li when required', () => {
        const wrapper = mount(
            <ListItem disabled passDisabledToLi>
                An item
            </ListItem>
        );
        expect(wrapper.find('li').prop('disabled')).toBeTruthy();

        wrapper.setProps({ disabled: false });
        wrapper.update();
        expect(wrapper.find('li').prop('disabled')).toBeFalsy();
    });
});
