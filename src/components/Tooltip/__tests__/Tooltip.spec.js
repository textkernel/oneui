import React from 'react';
import toJson from 'enzyme-to-json';
import Tooltip from '../Tooltip';

describe('<Tooltip> that renders a Tooltip', () => {
    it('should render default Tooltip correctly', () => {
        const wrapper = mount(
            <Tooltip placement="bottom" content="content">
                Hover me
            </Tooltip>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should display a tooltip on hover', () => {
        const wrapper = mount(
            <Tooltip placement="bottom" content="content">
                Hover me
            </Tooltip>
        );

        wrapper.childAt(0).simulate('mouseenter');
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('div[data-popup="true"]')).toHaveLength(1);
    });
    it('should display proper text inside a tooltip', () => {
        const tooltipText = 'Tooltip text';
        const wrapper = mount(
            <Tooltip placement="bottom" content={tooltipText}>
                Hover me
            </Tooltip>
        );

        wrapper.childAt(0).simulate('mouseenter');
        expect(
            wrapper
                .childAt(0)
                .childAt(1)
                .text()
        ).toEqual(tooltipText);
    });
    it('should hide a tooltip on mouse leave', () => {
        const wrapper = mount(
            <Tooltip placement="bottom" content="content">
                Hover me
            </Tooltip>
        );

        wrapper.childAt(0).simulate('mouseenter');
        wrapper.childAt(0).simulate('mouseleave');
        expect(wrapper.find('div[data-popup="true"]')).toHaveLength(0);
    });
});
