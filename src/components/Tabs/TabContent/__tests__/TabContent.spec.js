import React from 'react';
import toJson from 'enzyme-to-json';
import TabContent from '../TabContent';

describe('<TabContent>', () => {
    it('should render tab content correctly', () => {
        const wrapper = shallow(
            <TabContent>
                <h1>Tab content</h1>
                Some content
            </TabContent>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
