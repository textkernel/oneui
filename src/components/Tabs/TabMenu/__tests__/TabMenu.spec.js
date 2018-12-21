import React from 'react';
import toJson from 'enzyme-to-json';
import TabMenu from '../TabMenu';
import TabItem from '../../TabItem';

describe('<TabMenu>', () => {
    it('should render tab menu wrapper correctly', () => {
        const wrapper = shallow(
            <TabMenu>
                <TabItem label="Some tab" isActive />
                <TabItem label="Another tab" />
            </TabMenu>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
