import React from 'react';
import toJson from 'enzyme-to-json';
import PillDropdown from '../PillDropdown';

describe('<PillDropdown> component', () => {
    const childrenMock = jest.fn();
    const closeMock = jest.fn();

    let wrapper;

    beforeEach(() => {
        wrapper = mount(<PillDropdown close={closeMock}>{childrenMock}</PillDropdown>);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render correctly without padding', () => {
        wrapper.setProps({ noPadding: true });
        wrapper.update();

        expect(wrapper.find('.PillDropdown--noPadding')).toHaveLength(1);
    });
    it('should call children function with close as arguments', () => {
        expect(childrenMock).toHaveBeenCalledWith({
            close: closeMock,
        });
    });
});
