import React from 'react';
import toJson from 'enzyme-to-json';
import PillDropdown from '../PillDropdown';

describe('<PillDropdown> component', () => {
    const childrenMock = jest.fn();
    const closeMock = jest.fn();
    const innerPaddingMock = '6px';

    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <PillDropdown close={closeMock} innerPadding={innerPaddingMock}>
                {childrenMock}
            </PillDropdown>
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should call children function with close and innerPadding as arguemnts', () => {
        expect(childrenMock).toHaveBeenCalledWith({
            close: closeMock,
            innerPadding: innerPaddingMock,
        });
    });
});
