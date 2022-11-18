import React from 'react';
import toJson from 'enzyme-to-json';
import { Drawer } from '../Drawer';

jest.mock('react-transition-group', () => {
    const FakeTransition = jest.fn(({ children }) => children({ state: 'entered' }));
    return { Transition: FakeTransition };
});

describe('Drawer', () => {
    it('should render correctly', () => {
        const wrapper = mount(<Drawer title="some title">some text</Drawer>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should pass initial expand status', () => {
        const wrapper = mount(
            <Drawer initialIsExpanded title="some title">
                some text
            </Drawer>
        );

        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndExpanded')).toBe(true);
        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndClosed')).toBe(false);
        expect(
            wrapper.find('.Drawer__expandButton').hasClass('Drawer__expandButton--isExpanded')
        ).toBe(true);
    });

    it('should pass initial close status', () => {
        const wrapper = mount(<Drawer title="some title">some text</Drawer>);

        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndClosed')).toBe(true);
        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndExpanded')).toBe(false);
        expect(
            wrapper.find('.Drawer__expandButton').hasClass('Drawer__expandButton--isExpanded')
        ).toBe(false);
    });

    it('should expand and close correctly', () => {
        const wrapper = mount(<Drawer title="some title">some text</Drawer>);
        // Expand Drawer
        wrapper.find('.Drawer__expandButton').simulate('click');

        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndExpanded')).toBe(true);
        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndClosed')).toBe(false);
        expect(
            wrapper.find('.Drawer__expandButton').hasClass('Drawer__expandButton--isExpanded')
        ).toBe(true);

        // Close Drawer
        wrapper.find('.Drawer__expandButton').simulate('click');

        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndClosed')).toBe(true);
        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndExpanded')).toBe(false);
        expect(
            wrapper.find('.Drawer__expandButton').hasClass('Drawer__expandButton--isExpanded')
        ).toBe(false);
    });

    it('should be hidden when isShown is false', () => {
        const wrapper = mount(
            <Drawer isShown={false} title="some title">
                some text
            </Drawer>
        );

        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndExpanded')).toBe(false);
        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndClosed')).toBe(false);
    });

    it('should be still hidden when drawer expanted and isShown is false', () => {
        const wrapper = mount(
            <Drawer isShown={false} isExpanded title="some title">
                some text
            </Drawer>
        );

        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndExpanded')).toBe(false);
        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndClosed')).toBe(false);
    });

    it('should be expand then isExpanded is true', () => {
        const wrapper = mount(
            <Drawer isExpanded title="some title">
                some text
            </Drawer>
        );

        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndExpanded')).toBe(true);
        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndClosed')).toBe(false);
    });

    it('should fire callback function correctly on click expand/close button', () => {
        const onClickMock = jest.fn();
        const wrapper = mount(
            <Drawer onClick={onClickMock} title="some title">
                some text
            </Drawer>
        );

        wrapper.find('.Drawer__expandButton').simulate('click');

        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndExpanded')).toBe(false);
        expect(wrapper.find('.Drawer').hasClass('Drawer--isShownAndClosed')).toBe(true);
        expect(onClickMock).toHaveBeenCalled();
    });
});
