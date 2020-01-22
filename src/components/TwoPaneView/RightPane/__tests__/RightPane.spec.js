import React from 'react';
import toJson from 'enzyme-to-json';
import { RightPane } from '../RightPane';

describe('<RightPane> that renders a right pane of a two pane view', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<RightPane>Some content</RightPane>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
