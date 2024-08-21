import React from 'react';
import '@testing-library/jest-dom';
import { RenderResult, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toaster, toast } from '../Toaster';

window.HTMLElement.prototype.setPointerCapture = jest.fn();

describe('<Toast>', () => {
    let view: RenderResult;
    beforeEach(async () => {
        view = render(<Toaster>{}</Toaster>);
    });

    it('should render toast correctly', async () => {
        expect(view.container).toBeEmptyDOMElement();
        toast({
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
            toast({
                description: 'Description',
                context: 'cautious',
            });
            await waitFor(() => {
                expect(screen.getByTestId('cautious-icon')).toBeInTheDocument();
            });
        });

        it('should render info icon', async () => {
            toast({
                description: 'Description',
                context: 'info',
            });
            await waitFor(() => {
                expect(screen.getByTestId('info-icon')).toBeInTheDocument();
            });
        });

        it('should render critical icon', async () => {
            toast({
                description: 'Description',
                context: 'critical',
            });
            await waitFor(() => {
                expect(screen.getByTestId('critical-icon')).toBeInTheDocument();
            });
        });

        it('should render success icon', async () => {
            toast({
                description: 'Description',
                context: 'success',
            });
            await waitFor(() => {
                expect(screen.getByTestId('success-icon')).toBeInTheDocument();
            });
        });
    });

    it('should close automatically after 2500ms', async () => {
        toast({
            title: 'Test',
            description: 'Description',
        });

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
        });

        await waitFor(
            () => {
                expect(view.container).toBeEmptyDOMElement();
            },
            { timeout: 3000 }
        );
    });

    it('should stay open on hover', async () => {
        toast({
            title: 'Test',
            description: 'Description',
        });
        await waitFor(() => {
            expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
        });
        const title = screen.getByRole('heading', { name: 'Test' });
        fireEvent.mouseEnter(title);
        await waitFor(
            () => {
                expect(view.container).not.toBeEmptyDOMElement();
                expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
            },
            { timeout: 3000 }
        );
    });

    it('should close toast when clicking on the close button', async () => {
        toast({
            description: 'Description',
            closeButtonLabel: 'closeButton',
        });
        await waitFor(() => {
            expect(screen.getByRole('button')).toBeInTheDocument();
        });
        const button = screen.getByLabelText('closeButton');

        const user = userEvent.setup();
        await user.click(button);
        await waitFor(() => {
            expect(view.container).toBeEmptyDOMElement();
        });
    });

    it('should not be focused when not actionable', async () => {
        toast({
            description: 'Description',
        });
        await waitFor(() => {
            expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
        });
    });

    it('should be focused when actionable', async () => {
        toast({
            description: 'Description',
            actions: [
                {
                    text: 'action1',
                    callback: () => {},
                },
            ],
        });
        await waitFor(() => {
            expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'assertive');
        });
    });

    it('should close when action item callback is clicked', async () => {
        toast({
            description: 'Description',
            actions: [
                {
                    text: 'action1',
                    callback: () => {},
                },
            ],
        });
        await waitFor(() => {
            expect(screen.getByText('action1')).toBeInTheDocument();
        });
        const user = userEvent.setup();
        const actionButton = screen.getByText('action1');
        await user.click(actionButton);
        await waitFor(() => {
            expect(view.container).toBeEmptyDOMElement();
        });
    });

    it('should close when action item href is clicked', async () => {
        toast({
            description: 'Description',
            actions: [{ text: 'action1', href: '/login' }],
        });
        await waitFor(() => {
            expect(screen.getByText('action1')).toBeInTheDocument();
        });
        const user = userEvent.setup();
        const actionButton = screen.getByText('action1');
        await user.click(actionButton);
        await waitFor(() => {
            expect(view.container).toBeEmptyDOMElement();
        });
    });

    it('should close 2500ms after end hover', async () => {
        toast({
            title: 'Test',
            description: 'Description',
        });
        await waitFor(() => {
            expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
        });

        const title = screen.getByRole('heading', { name: 'Test' });
        fireEvent.mouseEnter(title);

        await waitFor(
            () => {
                expect(view.container).not.toBeEmptyDOMElement();
                expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
            },
            { timeout: 3000 }
        );

        fireEvent.mouseLeave(title);

        await waitFor(
            () => {
                expect(view.container).toBeEmptyDOMElement();
            },
            { timeout: 3000 }
        );
    });
});
