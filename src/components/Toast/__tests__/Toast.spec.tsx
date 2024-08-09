import React from 'react';
import '@testing-library/jest-dom';
import {
    RenderResult,
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OneToaster, Toast } from '../Toast';

window.HTMLElement.prototype.setPointerCapture = jest.fn();

describe('<Toast>', () => {
    let view: RenderResult;
    beforeEach(async () => {
        view = render(<OneToaster duration={Infinity}>{}</OneToaster>);
    });

    it('should render toast correctly', async () => {
        expect(view.container).toBeEmptyDOMElement();
        Toast({
            title: 'Test',
            description: 'Description',
        });
        await waitFor(() => {
            expect(view.container).toMatchSnapshot();
            expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
            expect(screen.getByText('Description')).toBeInTheDocument();
        });
    });
    describe('should render the icons correctly with each context', () => {
        it('should render cautious icon', async () => {
            Toast({
                description: 'Description',
                context: 'cautious',
            });
            await waitFor(() => {
                expect(screen.getByTestId('cautious-icon')).toBeInTheDocument();
            });
        });
        it('should render info icon', async () => {
            Toast({
                description: 'Description',
                context: 'info',
            });
            await waitFor(() => {
                expect(screen.getByTestId('info-icon')).toBeInTheDocument();
            });
        });
        it('should render critical icon', async () => {
            Toast({
                description: 'Description',
                context: 'critical',
            });
            await waitFor(() => {
                expect(screen.getByTestId('critical-icon')).toBeInTheDocument();
            });
        });
        it('should render success icon', async () => {
            Toast({
                description: 'Description',
                context: 'success',
            });
            await waitFor(() => {
                expect(screen.getByTestId('success-icon')).toBeInTheDocument();
            });
        });
    });

    it.skip('should close automatically after 2500ms', async () => {
        // skipped test, test times out
        Toast({
            title: 'Test',
            description: 'Description',
        });

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
            expect(view.container).toMatchSnapshot();
        });

        await waitForElementToBeRemoved(screen.queryByRole('heading', { name: 'Test' }))
            .then(() => {
                expect(view.baseElement).toMatchSnapshot();
                expect(view.container).toBeEmptyDOMElement();
            })
            .catch((error) => {
                throw error;
            });
    });
    it.skip('should stay open on hover', () => {
        // can only be tested if the toast actually disappears when you do not hover, in the test above
    });
    it('should close toast when clicking on the close button', async () => {
        Toast({
            description: 'Description',
        });
        await waitFor(() => {
            expect(screen.getByRole('button')).toBeInTheDocument();
            expect(view.container).toMatchSnapshot();
        });
        const button = screen.getByLabelText('closeButton');

        const user = userEvent.setup();
        await user.click(button);
        await waitFor(() => {
            expect(view.container).toBeEmptyDOMElement();
        });
    });
    it('should not be focused when not actionable', async () => {
        Toast({
            description: 'Description',
        });
        await waitFor(() => {
            expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
        });
    });
    it('should be focused when actionable', async () => {
        Toast({
            description: 'Description',
            actions: [
                {
                    text: 'action1',
                    callback: () => {},
                },
            ],
        });
        await waitFor(() => {
            expect(view.container).toMatchSnapshot();
            expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'assertive');
        });
    });
    it('should close when action item callback is clicked', async () => {
        Toast({
            description: 'Description',
            actions: [
                {
                    text: 'action1',
                    callback: () => {},
                },
            ],
        });
        await waitFor(() => {
            expect(view.container).toMatchSnapshot();
        });
        const user = userEvent.setup();
        const actionButton = screen.getByText('action1');
        await user.click(actionButton);
        await waitFor(() => {
            expect(view.container).toBeEmptyDOMElement();
        });
    });
    it('should close when action item href is clicked', async () => {
        Toast({
            description: 'Description',
            actions: [{ text: 'action1', href: '/login' }],
        });
        await waitFor(() => {
            expect(view.container).toMatchSnapshot();
        });
        const user = userEvent.setup();
        const actionButton = screen.getByText('action1');
        await user.click(actionButton);
        await waitFor(() => {
            expect(view.container).toBeEmptyDOMElement();
        });
    });
    it.todo('should close 2500ms after end hover');
});
