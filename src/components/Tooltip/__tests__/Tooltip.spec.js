import React from 'react';
import toJson from 'enzyme-to-json';
import { Tooltip } from '../Tooltip';

describe('<Tooltip> that renders a Tooltip', () => {
    it('should render default Tooltip correctly', () => {
        const wrapper = shallow(
            <Tooltip placement="bottom" content="content">
                Hover me
            </Tooltip>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render Tooltip in disabled mode if content is empty', () => {
        const wrapper1 = shallow(<Tooltip content="foo">Hover me</Tooltip>);
        expect(wrapper1.prop('disabled')).toBeFalsy();
        const wrapper2 = shallow(<Tooltip content="">Hover me</Tooltip>);
        expect(wrapper2.prop('disabled')).toBe(true);
        const wrapper3 = shallow(
            <Tooltip content="" disabled={false}>
                Hover me
            </Tooltip>
        );
        expect(wrapper3.prop('disabled')).toBe(false);
        const wrapper4 = shallow(
            <Tooltip content="" disabled>
                Hover me
            </Tooltip>
        );
        expect(wrapper4.prop('disabled')).toBe(true);
    });
});
