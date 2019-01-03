import React from 'react';
import toJson from 'enzyme-to-json';
import TabMenu from '../TabMenu';
import TabItem from '../../TabItem';

describe('<TabMenu>', () => {
    it('should render tab menu wrapper correctly', () => {
        const wrapper = shallow(
            <TabMenu activeTabId="1">
                <TabItem id="1" label="Some tab" />
                <TabItem id="2" label="Another tab" />
            </TabMenu>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should add classes for props', () => {
        const wrapper = shallow(
            <TabMenu activeTabId="2" gutters>
                <TabItem id="1" label="Some tab" />
                <TabItem id="2" label="Another tab" />
            </TabMenu>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should fire onChange', () => {
        const onChange = jest.fn();

        const wrapper = shallow(
            <TabMenu activeTabId="2" onChange={onChange} gutters>
                <TabItem id="1" label="Some tab" />
                <TabItem id="2" label="Another tab" />
            </TabMenu>
        );

        wrapper
            .find(TabItem)
            .first()
            .simulate('click', null);
        expect(onChange).toHaveBeenCalledWith(null, '1');
    });
});
