import React from 'react';
import toJson from 'enzyme-to-json';
import IconMatch from '../IconMatch';

describe('<IconMatch>', () => {
    it('should render an Match! icon', () => {
        const wrapper = shallow(<IconMatch />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
