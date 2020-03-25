import React from 'react';
import toJson from 'enzyme-to-json';
import { PillButton } from '../PillButton';
import { ENTER_KEY } from '../../../../constants';

describe('<PillButton> component', () => {
    const toggleDropdownMock = jest.fn();
    const onClearMock = jest.fn();
    const name = 'Pill name';
    const content = 'This pill is in use';

    let wrapper;

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('in inactive, collapsed state (with minimal props)', () => {
        beforeEach(() => {
            wrapper = mount(
                <PillButton toggleDropdown={toggleDropdownMock} onClear={onClearMock} name={name} />
            );
        });

        it('should render correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('.PillButton__pill--isActive')).toHaveLength(0);
            expect(wrapper.find('.PillButton__pill--isOpen')).toHaveLength(0);
        });
        it('should trigger toggle state once when clicked', () => {
            wrapper.find('.PillButton__pill').simulate('click');
            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });
        it('should trigger toggle state once on keyboard interaction', () => {
            wrapper
                .find('.PillButton__pill')
                .simulate('focus')
                .simulate('keyDown', { key: ENTER_KEY });
            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });
        it('should have arrow down label', () => {
            expect(wrapper.find('IoIosArrowDown')).toHaveLength(1);
        });
        it('should trigger toggle state once when button is clicked', () => {
            wrapper.find('button').simulate('click');
            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });
        it('should trigger toggle state once on keyboard interaction with button', () => {
            wrapper.find('button').simulate('focus').simulate('keyDown', { key: ENTER_KEY });
            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('in inactive, open state (isOpen prop)', () => {
        beforeEach(() => {
            wrapper = mount(
                <PillButton
                    toggleDropdown={toggleDropdownMock}
                    onClear={onClearMock}
                    name={name}
                    isOpen
                />
            );
        });

        it('should render correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('.PillButton__pill--isActive')).toHaveLength(0);
            expect(wrapper.find('.PillButton__pill--isOpen')).toHaveLength(1);
        });
        it('should have arrow up label', () => {
            expect(wrapper.find('IoIosArrowDown.PillButton__arrowIcon--isOpen')).toHaveLength(1);
        });
        it('should trigger toggle state once when button is clicked', () => {
            wrapper.find('button').simulate('click');
            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });
        it('should trigger toggle state once on keyboard interaction with button', () => {
            wrapper.find('button').simulate('focus').simulate('keyDown', { key: ENTER_KEY });
            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('in active, collapsed state (with content prop)', () => {
        beforeEach(() => {
            wrapper = mount(
                <PillButton
                    toggleDropdown={toggleDropdownMock}
                    onClear={onClearMock}
                    name={name}
                    content={content}
                />
            );
        });

        it('should render correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('.PillButton__pill--isActive')).toHaveLength(1);
            expect(wrapper.find('.PillButton__pill--isOpen')).toHaveLength(0);
        });
        it('should not trigger toggle state but onClear only when button is clicked', () => {
            wrapper.find('.PillButton__button').simulate('click');
            expect(onClearMock).toHaveBeenCalledTimes(1);
            expect(toggleDropdownMock).toHaveBeenCalledTimes(0);
        });
        it('should not trigger toggle state but onClear only on keyboard interaction with button', () => {
            wrapper.find('button').simulate('focus').simulate('keyDown', { key: ENTER_KEY });
            expect(onClearMock).toHaveBeenCalledTimes(1);
            expect(toggleDropdownMock).toHaveBeenCalledTimes(0);
        });
    });
    describe('in active, open state (content and isOpen prop)', () => {
        beforeEach(() => {
            wrapper = mount(
                <PillButton
                    toggleDropdown={toggleDropdownMock}
                    onClear={onClearMock}
                    name={name}
                    content={content}
                    isOpen
                />
            );
        });

        it('should render correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('.PillButton__pill--isActive')).toHaveLength(1);
            expect(wrapper.find('.PillButton__pill--isOpen')).toHaveLength(1);
        });
        it('should have arrow up label', () => {
            expect(wrapper.find('IoIosArrowDown.PillButton__arrowIcon--isOpen')).toHaveLength(1);
        });
        it('should trigger toggle state once when button is clicked', () => {
            wrapper.find('button').simulate('click');
            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });
        it('should trigger toggle state once on keyboard interaction with button', () => {
            wrapper.find('button').simulate('focus').simulate('keyDown', { key: ENTER_KEY });
            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });
    });
});
