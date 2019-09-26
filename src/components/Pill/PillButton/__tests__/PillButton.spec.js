import React from 'react';
import toJson from 'enzyme-to-json';
import PillButton from '../PillButton';
import { CROSS_CHAR } from '../../../../constants';

describe('<PillButton> component', () => {
    const togglePopupMock = jest.fn();
    const onClearMock = jest.fn();
    const name = 'Pill name';
    const label = 'This pill is in use';

    let wrapper;

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('with minimal props', () => {
        beforeEach(() => {
            wrapper = mount(
                <PillButton togglePopup={togglePopupMock} onClear={onClearMock} name={name} />
            );
        });

        it('should render correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('.PillButton__pill--isActive')).toHaveLength(0);
            expect(wrapper.find('.PillButton__pill--isOpen')).toHaveLength(0);
        });
        it('should trigger toggle state once when clicked', () => {
            wrapper.find('.PillButton').simulate('click');
            expect(togglePopupMock).toHaveBeenCalledTimes(1);
        });
        it('should have arrow down label', () => {
            expect(wrapper.find('IoIosArrowDown')).toHaveLength(1);
        });
        it('should trigger toggle state once when button is clicked', () => {
            wrapper.find('button').simulate('click');
            expect(togglePopupMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('in open state', () => {
        beforeEach(() => {
            wrapper = mount(
                <PillButton
                    togglePopup={togglePopupMock}
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
            expect(wrapper.find('IoIosArrowUp')).toHaveLength(1);
        });
        it('should trigger toggle state once when button is clicked', () => {
            wrapper.find('button').simulate('click');
            expect(togglePopupMock).toHaveBeenCalledTimes(1);
        });
    });
    describe('in active state (with label prop defined)', () => {
        beforeEach(() => {
            wrapper = mount(
                <PillButton
                    togglePopup={togglePopupMock}
                    onClear={onClearMock}
                    name={name}
                    label={label}
                />
            );
        });

        it('should render correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('.PillButton__pill--isActive')).toHaveLength(1);
            expect(wrapper.find('.PillButton__pill--isOpen')).toHaveLength(0);
        });
        it('should have x label', () => {
            expect(wrapper.find('button').text()).toBe(CROSS_CHAR);
        });
        it('should not trigger toggle state but onClear only when button is clicked', () => {
            wrapper.find('.PillButton__button').simulate('click');
            expect(onClearMock).toHaveBeenCalledTimes(1);
            expect(togglePopupMock).toHaveBeenCalledTimes(0);
        });
    });
    describe('in active and open state', () => {
        beforeEach(() => {
            wrapper = mount(
                <PillButton
                    togglePopup={togglePopupMock}
                    onClear={onClearMock}
                    name={name}
                    label={label}
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
            expect(wrapper.find('IoIosArrowUp')).toHaveLength(1);
        });
        it('should trigger toggle state once when button is clicked', () => {
            wrapper.find('button').simulate('click');
            expect(togglePopupMock).toHaveBeenCalledTimes(1);
        });
    });
});
