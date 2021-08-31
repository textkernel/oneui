import React from 'react';
import toJson from 'enzyme-to-json';
import { StepperButton } from '../StepperButton';

describe('<StepperButton> component', () => {
    let wrapper;

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        wrapper = mount(<StepperButton icon="plus" />);

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('button')).toHaveLength(1);
    });
    it('should render all icons correctly', () => {
        wrapper = mount(<StepperButton icon="plus" />);
        // Plus is rendered by default
        expect(wrapper.find('FaPlus')).toHaveLength(1);

        wrapper.setProps({ icon: 'minus' });
        wrapper.update();
        expect(wrapper.find('FaMinus')).toHaveLength(1);
    });
    it('should set default attribute to button if disabled prop is set', () => {
        wrapper = mount(<StepperButton icon="plus" disabled />);
        expect(wrapper.find('button').prop('disabled')).toBe(true);
    });
});
