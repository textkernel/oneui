import * as React from 'react';
import toJson from 'enzyme-to-json';
import { Checkbox } from '../Checkbox';

describe('<Checkbox> that renders a checkbox', () => {
    it('should render default checkbox correctly', () => {
        const wrapper = mount(<Checkbox id="c1">Check this out</Checkbox>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render checkbox with complex children', () => {
        const wrapper = mount(
            <Checkbox id="c1">
                <span>
                    Check this out <span>something else</span>
                </span>
            </Checkbox>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should call onChange function when clicked', () => {
        const onChange = jest.fn();
        const wrapper = mount(
            <Checkbox id="c2" onChange={onChange}>
                Check this out
            </Checkbox>
        );
        wrapper.find('input').simulate('change');
        expect(onChange).toHaveBeenCalledTimes(1);
    });
    it('should rendered disabled checkbox correctly', () => {
        const wrapper = mount(
            <Checkbox id="c3" disabled>
                Useless checkbox
            </Checkbox>
        );
        expect(wrapper.find('input[disabled]')).toHaveLength(1);
        expect(wrapper.find('.Text--context_muted')).toHaveLength(1);
    });
});
