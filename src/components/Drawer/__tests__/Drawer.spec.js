import React from 'react';
import toJson from 'enzyme-to-json';
import Drawer from '../Drawer';

describe('Drawer', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<Drawer title="some title">some text</Drawer>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should pass initial open status', () => {
        const wrapper = shallow(
            <Drawer initialIsOpen title="some title">
                some text
            </Drawer>
        );

        expect(wrapper.find('.Drawer').hasClass('Drawer--isOpen')).toBe(true);
        expect(wrapper.find('.Drawer__extendButton').hasClass('Drawer__extendButton--isOpen')).toBe(
            true
        );
    });

    it('should pass initial close status', () => {
        const wrapper = shallow(<Drawer title="some title">some text</Drawer>);

        expect(wrapper.find('.Drawer').hasClass('Drawer--isOpen')).toBe(false);
        expect(wrapper.find('.Drawer__extendButton').hasClass('Drawer__extendButton--isOpen')).toBe(
            false
        );
    });

    it('should open and close correctly', () => {
        const wrapper = shallow(<Drawer title="some title">some text</Drawer>);
        // Open Drawer
        wrapper.find('.Drawer__extendButton').simulate('click');

        expect(wrapper.find('.Drawer').hasClass('Drawer--isOpen')).toBe(true);
        expect(wrapper.find('.Drawer__extendButton').hasClass('Drawer__extendButton--isOpen')).toBe(
            true
        );

        // Close Drawer
        wrapper.find('.Drawer__extendButton').simulate('click');

        expect(wrapper.find('.Drawer').hasClass('Drawer--isOpen')).toBe(false);
        expect(wrapper.find('.Drawer__extendButton').hasClass('Drawer__extendButton--isOpen')).toBe(
            false
        );
    });
});
