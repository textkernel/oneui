import React from 'react';
import Dummy from '../Dummy';

describe('<Dummy />', () => {
    it('matches with snapshot', () => {
        const wrapper = shallow(<Dummy />);
        expect(wrapper).toMatchSnapshot();
    });
});
