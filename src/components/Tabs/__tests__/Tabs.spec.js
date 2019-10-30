import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import Tabs from '../Tabs';
import Tab from '../Tab';

describe('<Tabs> that renders tab container with some tabs', () => {
    it('should render simple tabs', () => {
        const { container } = render(
            <Tabs activeTabId="1">
                <Tab id="1" label="First">
                    Some content
                </Tab>
                <Tab id="2" label="Second">
                    Some more content
                </Tab>
            </Tabs>
        );
        expect(container).toMatchSnapshot();
    });

    it('should switch tabs correctly', () => {
        const onChange = jest.fn();

        const { container } = render(
            <Tabs activeTabId="1" onChange={onChange}>
                <Tab id="1" label="First">
                    Some content
                </Tab>
                <Tab id="2" label="Second">
                    Some more content
                </Tab>
            </Tabs>
        );

        container
            .find('TabMenu')
            .find('TabItem')
            .at(1)
            .simulate('click');
        expect(container.activeTabId).toBe('2');
        expect(onChange).toHaveBeenCalledWith('2');
    });

    it('should switch tabs correctly (programmatically)', () => {
        const wrapper = mount(
            <Tabs activeTabId="1">
                <Tab id="1" label="First">
                    Some content
                </Tab>
                <Tab id="2" label="Second">
                    Some more content
                </Tab>
            </Tabs>
        );
        wrapper.setProps(
            {
                activeTabId: '2',
            },
            () => {
                expect(wrapper.state().activeTabId).toBe('2');
                expect(wrapper.state().derivedTabId).toBe('2');
                expect(wrapper.find('TabContent').text()).toEqual('Some more content');
            }
        );
    });
});
