import React from 'react';
import toJson from 'enzyme-to-json';
import RadioButton from '../RadioButton';

describe('<RadioButton> that renders a radio button', () => {
    it('should render default radio button correctly', () => {
        const wrapper = mount(<RadioButton id="c1">Choose me</RadioButton>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should call onChange function when clicked', () => {
        const onChange = jest.fn();
        const wrapper = mount(
            <RadioButton id="c2" onChange={onChange}>
                Choose me
            </RadioButton>
        );
        wrapper.find('input').simulate('change');
        expect(onChange).toHaveBeenCalledTimes(1);
    });
    it('should rendered disabled radio button correctly', () => {
        const wrapper = mount(
            <RadioButton id="c3" disabled>
                Useless radio button
            </RadioButton>
        );
        expect(wrapper.find('input[disabled]')).toHaveLength(1);
        expect(wrapper.find('label[disabled]')).toHaveLength(1);
        expect(wrapper.find('.Text--muted')).toHaveLength(1);
    });
});
