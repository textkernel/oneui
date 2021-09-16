import React from 'react';
import toJson from 'enzyme-to-json';
import { Confirm } from '../Confirm';

describe('Confirm', () => {
    const mockOnAccept = jest.fn();
    const mockOnCancel = jest.fn();
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Confirm
                isOpen
                acceptButton={{ onClick: mockOnAccept, label: 'OK' }}
                cancelButton={{ onClick: mockOnCancel, label: 'Cancel' }}
                ariaHideApp={false}
            >
                Body of the confirm
            </Confirm>
        );
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('Heading')).toHaveLength(0);
        expect(wrapper.find('Button')).toHaveLength(2);
    });
    it('should render correctly with title', () => {
        wrapper.setProps({ title: 'Title' });
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('Heading')).toHaveLength(1);
    });
    it('should call onAccept cb when button is clicked', () => {
        wrapper.find('Button').at(1).simulate('click');
        expect(mockOnAccept).toHaveBeenCalledTimes(1);
    });
    it('should call onAccept cb when button is clicked', () => {
        wrapper.find('Button').at(0).simulate('click');
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
});
