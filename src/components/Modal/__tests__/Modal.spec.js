import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import ReactModal from 'react-modal';
import Modal from '../Modal';

describe('Modal', () => {
    it('should render correctly', () => {
        const { container } = render(
            <Modal isOpen contentLabel="Content label">
                Some children
            </Modal>
        );
        expect(container).toMatchSnapshot();
    });
    it('should set app element via react-modal', () => {
        const setElSpy = jest.spyOn(ReactModal, 'setAppElement');
        setElSpy.mockImplementationOnce(key => key);

        Modal.setAppElement('main');
        expect(setElSpy).toHaveBeenCalledWith('main');
    });
});
