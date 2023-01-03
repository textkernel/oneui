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
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('input[disabled]')).toHaveLength(1);
        expect(wrapper.find('.Text--context_neutral')).toHaveLength(1);
    });

    it('should render the indeterminate svg when checked is false and indeterminate true', () => {
        const wrapper = mount(
            <Checkbox id="c4" checked={false} indeterminate onChange={() => {}}>
                Useless checkbox
            </Checkbox>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('svg polyline')).toHaveLength(0);
        expect(wrapper.find('svg line')).toHaveLength(1);
    });

    it('should render the checked svg when checked is true and indeterminate false', () => {
        const wrapper = mount(
            <Checkbox id="c5" checked indeterminate={false} onChange={() => {}}>
                Useless checkbox
            </Checkbox>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('svg polyline')).toHaveLength(1);
        expect(wrapper.find('svg line')).toHaveLength(0);
    });

    it('should render the indeterminate svg when checked and indeterminate are true', () => {
        const wrapper = mount(
            <Checkbox id="c6" checked indeterminate onChange={() => {}}>
                Useless checkbox
            </Checkbox>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('svg polyline')).toHaveLength(0);
        expect(wrapper.find('svg line')).toHaveLength(1);
    });

    it('should not render any svg when checked and indeterminate are both false', () => {
        const wrapper = mount(
            <Checkbox id="c7" checked={false} indeterminate={false} onChange={() => {}}>
                Useless checkbox
            </Checkbox>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('svg polyline')).toHaveLength(0);
        expect(wrapper.find('svg line')).toHaveLength(0);
    });
});
