import React from 'react';
import toJson from 'enzyme-to-json';
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
});
