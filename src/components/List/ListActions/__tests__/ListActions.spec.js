import React from 'react';
import toJson from 'enzyme-to-json';
import { ListActions } from '../ListActions';

describe('<ListActions>', () => {
    it('should render ListActions', () => {
        const wrapper = shallow(<ListActions>action</ListActions>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
