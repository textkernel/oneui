import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactModal from 'react-modal';
import { Modal } from '../Modal';

describe('Modal', () => {
    let view: RenderResult;

    it('should render correctly', () => {
        view = render(
            <Modal isOpen contentLabel="Content label">
                Some children
            </Modal>
        );

        const dialog = screen.getByRole('dialog');

        expect(view.baseElement).toMatchSnapshot();
        expect(dialog).toBeInTheDocument();
    });

    it('should apply classnames from props correctly', () => {
        view = render(
            <Modal
                isOpen
                contentLabel="Content label"
                className="content-class"
                overlayClassName="overlay-class"
                portalClassName="portal-class"
            >
                Some children
            </Modal>
        );

        const dialog = screen.getByRole('dialog');

        expect(view.baseElement).toMatchSnapshot();
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveClass('Modal__content content-class Modal__content--entered');
    });

    it('should set app element via react-modal', () => {
        const setElSpy = jest.spyOn(ReactModal, 'setAppElement');
        setElSpy.mockImplementationOnce((key) => key);

        Modal.setAppElement('main');
        expect(setElSpy).toHaveBeenCalledWith('main');
    });
});
