import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TabsBar } from '../TabsBar';
import { TabItem } from '../../TabItem';

describe('<TabsBar>', () => {
    let view: RenderResult;

    it('should render tabs bar with minimal correctly', () => {
        view = render(
            <TabsBar>
                <TabItem tabId="1">Some tab</TabItem>
                <TabItem tabId="2">Another tab</TabItem>
            </TabsBar>
        );

        expect(view.container).toMatchSnapshot();
    });

    it('should pass isBlock prop to TabItem children', () => {
        view = render(
            <TabsBar isBlock>
                <TabItem tabId="1">Some tab</TabItem>
                <TabItem tabId="2">Another tab</TabItem>
                <span>something else</span>
            </TabsBar>
        );

        const tabs = screen.getAllByRole('tab');
        const tabList = screen.getByRole('tablist');

        expect(tabs).toHaveLength(2);
        expect(tabList).toBeInTheDocument();
        expect(tabList.children).toHaveLength(3);
        expect(tabs[0]).toHaveClass('TabItem TabItem--isBlock');
        expect(tabs[1]).toHaveClass('TabItem TabItem--isBlock');
        expect(tabList.children[2].textContent).toBe('something else');
    });

    it('should set isActive prop on children', () => {
        view = render(
            <TabsBar activeTabId="1">
                <TabItem tabId="1">Some tab</TabItem>
                <TabItem tabId="2">Another tab</TabItem>
            </TabsBar>
        );

        const tabs = screen.getAllByRole('tab');

        expect(tabs[0]).toHaveClass('TabItem TabItem--isActive');
        expect(tabs[1]).toHaveClass('TabItem');
    });

    it('should pass onSelect prop to children', async () => {
        const user = userEvent.setup();
        const onSelectMock = jest.fn();
        view = render(
            <TabsBar onSelect={onSelectMock}>
                <TabItem tabId="1">Some tab</TabItem>
                <TabItem tabId="2">Another tab</TabItem>
            </TabsBar>
        );

        const tabs = screen.getAllByRole('tab');
        await user.click(tabs[0]);
        await user.click(tabs[1]);

        expect(onSelectMock).toHaveBeenCalledTimes(2);
    });

    it('should allow for conditional rendering of items', () => {
        const condition = false;
        view = render(
            <TabsBar>
                {condition ? <TabItem tabId="1">Some tab</TabItem> : null}
                <TabItem tabId="2">Another tab</TabItem>
                {condition ? <TabItem tabId="3">Another tab</TabItem> : null}
            </TabsBar>
        );

        expect(view.container).toMatchSnapshot();
        expect(view.container.children[0].textContent).not.toContain('false');
    });
});
