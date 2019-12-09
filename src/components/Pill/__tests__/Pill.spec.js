import React from 'react';
import toJson from 'enzyme-to-json';
import Pill from '../Pill';

describe('<Pill> component', () => {
    const childrenMock = jest.fn();
    const onClearMock = jest.fn();
    const onCloseMock = jest.fn();
    const nameMock = 'Pill name';
    const contentMock = 'Pill content';

    let wrapper;
    let clickPillButton;

    beforeEach(() => {
        wrapper = mount(
            <Pill
                onClear={onClearMock}
                onClose={onCloseMock}
                name={nameMock}
                content={contentMock}
                doneLabel="Done"
            >
                {childrenMock}
            </Pill>
        );

        clickPillButton = () => wrapper.find('.PillButton__pill').simulate('click');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('PillButton')).toHaveLength(1);
        expect(wrapper.find('PillDropdown')).toHaveLength(0);
    });
    it('should open dropdown when button is clicked', () => {
        clickPillButton();
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('PillButton')).toHaveLength(1);
        expect(wrapper.find('PillDropdown')).toHaveLength(1);
    });
    it('should close dropdown when button is clicked again', () => {
        clickPillButton();
        expect(wrapper.find('PillDropdown')).toHaveLength(1);

        clickPillButton();
        expect(wrapper.find('PillDropdown')).toHaveLength(0);
    });
    it('should render children when dropdown is open', () => {
        expect(childrenMock).not.toHaveBeenCalled();

        clickPillButton();
        expect(wrapper.find('PillDropdown')).toHaveLength(1);
        expect(childrenMock).toHaveBeenCalledTimes(1);
    });
    it('should call onClose when dropdown is closed via pill-button click', () => {
        clickPillButton();
        clickPillButton();
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
    it('should call onClose when dropdown is closed via done-button click', () => {
        clickPillButton();
        wrapper.find('.PillDropdown__footer button').simulate('click');
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
