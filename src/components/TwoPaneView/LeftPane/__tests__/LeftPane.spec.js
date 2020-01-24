import React from 'react';
import toJson from 'enzyme-to-json';
import { LeftPane } from '../LeftPane';

describe('<LeftPane> that renders a left pane of a two pane view', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<LeftPane>Some content</LeftPane>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
