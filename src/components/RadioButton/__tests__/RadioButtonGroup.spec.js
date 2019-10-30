import React from 'react';
import toJson from 'enzyme-to-json';
import RadioButton from '../RadioButton';
import RadioButtonGroup from '../RadioButtonGroup';

describe('<RadioButtonGroup> that renders a group of radio buttons', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(
            <RadioButtonGroup name="group_name">
                <RadioButton id="o1">Option 1</RadioButton>
                <RadioButton id="o2">Option 2</RadioButton>
            </RadioButtonGroup>
        );
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should pass name prop to children', () => {
        wrapper
            .find('RadioButton')
            .forEach(option => expect(option.prop('name')).toEqual('group_name'));
    });
});
