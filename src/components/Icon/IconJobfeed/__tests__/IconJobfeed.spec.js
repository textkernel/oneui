import React from 'react';
import toJson from 'enzyme-to-json';
import IconJobfeed from '../IconJobfeed';

describe('<IconJobfeed>', () => {
    it('should render an Jobfeed icon', () => {
        const wrapper = shallow(<IconJobfeed />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
