import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TabItem } from '../TabItem';

describe('<TabItem>', () => {
    const onSelectMock = jest.fn();

    let view: RenderResult;

    it('should render a tab item correctly with minimum props', () => {
        view = render(<TabItem tabId="1">Tab label</TabItem>);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('tab', { name: 'Tab label' })).toBeInTheDocument();
    });

    it('should render correctly with all props', () => {
        view = render(
            <TabItem tabId="1" isBlock isActive onSelect={onSelectMock}>
                Tab label <span style={{ color: 'grey' }}>(3)</span>
            </TabItem>
        );

        const tab = screen.getByRole('tab', { name: 'Tab label (3)' });

        expect(view.container).toMatchSnapshot();
        expect(tab).toBeInTheDocument();
        expect(tab).toHaveAttribute('aria-selected', 'true');
    });

    describe('callbacks', () => {
        it('should call onSelect on simple tab', async () => {
            const user = userEvent.setup();
            view = render(
                <TabItem tabId="1" onSelect={onSelectMock}>
                    Tab label
                </TabItem>
            );

            await user.click(screen.getByRole('tab'));

            expect(onSelectMock).toHaveBeenCalledTimes(1);
        });

        it('should not call onSelect on active tab', async () => {
            const user = userEvent.setup();
            view = render(
                <TabItem tabId="1" isActive onSelect={onSelectMock}>
                    Tab label
                </TabItem>
            );

            await user.click(screen.getByRole('tab'));

            expect(onSelectMock).toHaveBeenCalledTimes(0);
        });

        it('should not call onSelect on disabled tab', async () => {
            const user = userEvent.setup();
            view = render(
                <TabItem tabId="1" disabled onSelect={onSelectMock}>
                    Tab label
                </TabItem>
            );

            await user.click(screen.getByRole('tab'));

            expect(onSelectMock).toHaveBeenCalledTimes(0);
        });
    });
});
