import React from 'react';
import toJson from 'enzyme-to-json';
import { TabsBar } from '../TabsBar';
import { TabItem } from '../../TabItem';

describe('<TabsBar>', () => {
    it('should render tabs bar with minimal correctly', () => {
        const wrapper = mount(
            <TabsBar>
                <TabItem tabId="1">Some tab</TabItem>
                <TabItem tabId="2">Another tab</TabItem>
            </TabsBar>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should pass isBlock prop to TabItem children', () => {
        const wrapper = mount(
            <TabsBar isBlock>
                <TabItem tabId="1">Some tab</TabItem>
                <TabItem tabId="2">Another tab</TabItem>
                <span>something else</span>
            </TabsBar>
        );

        const tab1Props = wrapper.find('TabItem').first().props();
        const tab2Props = wrapper.find('TabItem').at(1).props();
        const otherChildProps = wrapper.find('span').props();

        expect(tab1Props.isBlock).toBeTruthy();
        expect(tab2Props.isBlock).toBeTruthy();
        expect(otherChildProps.isBlock).toBeFalsy();
    });
    it('should set isActive prop on children', () => {
        const wrapper = mount(
            <TabsBar activeTabId="1">
                <TabItem tabId="1">Some tab</TabItem>
                <TabItem tabId="2">Another tab</TabItem>
            </TabsBar>
        );

        const tab1Props = wrapper.find('TabItem').first().props();
        const tab2Props = wrapper.find('TabItem').at(1).props();

        expect(tab1Props.isActive).toBeTruthy();
        expect(tab2Props.isActive).toBeFalsy();
    });
    it('should pass onSelect prop to children', () => {
        const onSelectMock = jest.fn();
        const wrapper = mount(
            <TabsBar onSelect={onSelectMock}>
                <TabItem tabId="1">Some tab</TabItem>
                <TabItem tabId="2">Another tab</TabItem>
            </TabsBar>
        );

        const tab1Props = wrapper.find('TabItem').first().props();
        const tab2Props = wrapper.find('TabItem').at(1).props();

        expect(tab1Props.onSelect).toEqual(onSelectMock);
        expect(tab2Props.onSelect).toEqual(onSelectMock);
    });
});
