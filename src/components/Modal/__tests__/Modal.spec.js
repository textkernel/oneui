import React from 'react';
import toJson from 'enzyme-to-json';
import ReactModal from 'react-modal';
import Modal from '../Modal';

describe('Modal', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Modal isOpen contentLabel="Content label">
                Some children
            </Modal>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should set app element via react-modal', () => {
        const setElSpy = jest.spyOn(ReactModal, 'setAppElement');
        setElSpy.mockImplementationOnce(key => key);

        Modal.setAppElement('main');
        expect(setElSpy).toHaveBeenCalledWith('main');
    });
});
