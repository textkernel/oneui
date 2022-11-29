import React from 'react';
import toJson from 'enzyme-to-json';
import ReactModal from 'react-modal';
import { Modal } from '../Modal';

describe('Modal', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Modal isOpen contentLabel="Content label">
                Some children
            </Modal>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should apply classnames from props correctly', () => {
        const wrapper = shallow(
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

        expect(wrapper.find('Modal').prop('className')).toEqual(
            expect.objectContaining({ base: 'Modal__content content-class' })
        );
        expect(wrapper.find('Modal').prop('portalClassName')).not.toContain('content-class');
        expect(wrapper.find('Modal').prop('portalClassName')).toContain('portal-class');
        expect(wrapper.find('Modal').prop('overlayClassName')).toEqual(
            expect.objectContaining({ base: 'Modal__overlay overlay-class' })
        );
    });
    it('should set app element via react-modal', () => {
        const setElSpy = jest.spyOn(ReactModal, 'setAppElement');
        setElSpy.mockImplementationOnce((key) => key);

        Modal.setAppElement('main');
        expect(setElSpy).toHaveBeenCalledWith('main');
    });
});
