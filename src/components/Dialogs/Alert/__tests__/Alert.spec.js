import React from 'react';
import toJson from 'enzyme-to-json';
import { Alert } from '../Alert';

describe('Alert', () => {
    const mockOnAccept = jest.fn();
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Alert isOpen acceptButton={{ onClick: mockOnAccept, label: 'OK' }} ariaHideApp={false}>
                Body of the alert
            </Alert>
        );
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('Heading')).toHaveLength(0);
        expect(wrapper.find('Button')).toHaveLength(1);
    });
    it('should render correctly with title', () => {
        wrapper.setProps({ title: 'Title' });
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('Heading')).toHaveLength(1);
    });
    it('should call onAccept cb when button is clicked', () => {
        wrapper.find('Button').simulate('click');
        expect(mockOnAccept).toHaveBeenCalledTimes(1);
    });
});
