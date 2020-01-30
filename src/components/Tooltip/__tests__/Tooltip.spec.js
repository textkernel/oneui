import React from 'react';
import toJson from 'enzyme-to-json';
import { Tooltip } from '../Tooltip';

describe('<Tooltip> that renders a Tooltip', () => {
    it('should render default Tooltip correctly', () => {
        const wrapper = mount(
            <Tooltip placement="bottom" content="content">
                Hover me
            </Tooltip>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should display proper text inside a tooltip', () => {
        const tooltipText = 'Tooltip text';
        const wrapper = mount(
            <Tooltip placement="bottom" content={tooltipText}>
                Hover me
            </Tooltip>
        );

        wrapper.childAt(0).simulate('mouseover');
        expect(
            wrapper
                .childAt(0)
                .childAt(1)
                .text()
        ).toEqual(tooltipText);
    });
    it('should not display a tooltip if there is no content defined', () => {
        const wrapper = mount(<Tooltip placement="bottom">Hover me</Tooltip>);

        wrapper.childAt(0).simulate('mouseover');
        expect(wrapper.find('div[data-popup="true"]')).toHaveLength(0);
    });
    describe('tooltip on hover', () => {
        it('should display a tooltip on hover', () => {
            const wrapper = mount(
                <Tooltip placement="bottom" content="content">
                    Hover me
                </Tooltip>
            );

            wrapper.childAt(0).simulate('mouseover');
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('div[data-popup="true"]')).toHaveLength(1);
        });

        it('should hide a tooltip on mouse leave', () => {
            const wrapper = mount(
                <Tooltip placement="bottom" content="content">
                    Hover me
                </Tooltip>
            );

            wrapper.childAt(0).simulate('mouseover');
            wrapper.childAt(0).simulate('mouseleave');
            expect(wrapper.find('div[data-popup="true"]')).toHaveLength(0);
        });
    });
    describe('always visible tooltip', () => {
        it('should show the tooltip over simple text', () => {
            const wrapper = mount(
                <Tooltip placement="bottom" content="content" alwaysVisible>
                    I have a tooltip
                </Tooltip>
            );

            expect(wrapper.find('div[data-popup="true"]')).toHaveLength(1);
        });
        it('should show the tooltip over complex element', () => {
            const wrapper = mount(
                <Tooltip placement="bottom" content="content" alwaysVisible>
                    <p>I have a tooltip</p>
                </Tooltip>
            );

            expect(wrapper.find('div[data-popup="true"]')).toHaveLength(1);
        });
        it('should correctly open and close the tooltip if content changes', () => {
            const wrapper = mount(
                <Tooltip placement="bottom" alwaysVisible>
                    I have a tooltip
                </Tooltip>
            );
            expect(wrapper.find('div[data-popup="true"]')).toHaveLength(0);

            // Since popper.js is mocked, we cannot see the popup properties such as placement in the wrapper
            // instead we are going to spy on it to see if it was correctly opened/closed
            const visibilitySpy = jest.spyOn(
                wrapper.find('PopupBase').instance(),
                'setPopupVisibility'
            );

            wrapper.setProps({ content: 'content' });
            wrapper.update();
            expect(visibilitySpy).toHaveBeenLastCalledWith(true);
            expect(wrapper.find('div[data-popup="true"]')).toHaveLength(1);

            wrapper.setProps({ content: undefined });
            wrapper.update();
            expect(visibilitySpy).toHaveBeenLastCalledWith(false);
            expect(wrapper.find('div[data-popup="true"]')).toHaveLength(0);
        });
    });
});
