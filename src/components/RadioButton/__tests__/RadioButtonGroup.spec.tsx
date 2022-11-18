import React from 'react';
import toJson from 'enzyme-to-json';
import { RadioButton } from '../RadioButton';
import { RadioButtonGroup } from '../RadioButtonGroup';

describe('<RadioButtonGroup> that renders a group of radio buttons', () => {
    let wrapper;
    const onChangeChildMock = jest.fn();

    beforeEach(() => {
        wrapper = mount(
            <RadioButtonGroup name="group_name">
                <RadioButton onChange={onChangeChildMock} id="o1">
                    Option 1
                </RadioButton>
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
            .forEach((option) => expect(option.prop('name')).toEqual('group_name'));
    });
    it('should not modify onChange prop of children if they are no defined on the group level', () => {
        const child1OnChange = wrapper.find('RadioButton').first().prop('onChange');
        const child2OnChange = wrapper.find('RadioButton').at(1).prop('onChange');

        expect(child1OnChange).toEqual(onChangeChildMock);
        expect(child2OnChange).toEqual(undefined);
    });
    it('should pass onChange prop to children', () => {
        const onChangeGlobalMock = jest.fn();
        wrapper.setProps({ onChange: onChangeGlobalMock });
        wrapper.update();

        const child1OnChange = wrapper.find('RadioButton').first().prop('onChange');
        const child2OnChange = wrapper.find('RadioButton').at(1).prop('onChange');

        expect(child1OnChange).toEqual(onChangeGlobalMock);
        expect(child2OnChange).toEqual(onChangeGlobalMock);
    });
});
