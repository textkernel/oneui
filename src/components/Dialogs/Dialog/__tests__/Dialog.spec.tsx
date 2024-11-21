import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Dialog } from '../Dialog';
import { ResizeObserverMock } from '../../../../__mocks__/resizeObserverMock';

describe('Dialog', () => {
    const mockOnAccept = jest.fn();
    const mockOnCancel = jest.fn();
    const mockOnClose = jest.fn();

    const dialogBody = 'Body of the dialog';
    const dialogTitle = 'Title';
    const acceptButtonProps = {
        onClick: mockOnAccept,
        label: 'OK',
    };
    const cancelButtonProps = { onClick: mockOnCancel, label: 'Cancel' };
    const closeButtonProps = { onClick: mockOnClose, label: 'Close' };

    let view: RenderResult;

    beforeEach(() => {
        global.ResizeObserver = ResizeObserverMock;
        view = render(
            <Dialog
                isOpen
                title={dialogTitle}
                contentLabel="Content Label"
                acceptButton={acceptButtonProps}
                cancelButton={cancelButtonProps}
                closeButton={closeButtonProps}
                ariaHideApp={false}
            >
                {dialogBody}
            </Dialog>
        );
    });

    it('should render correctly with a title', () => {
        expect(view.baseElement).toMatchSnapshot();
        expect(screen.getByText(/Title/i)).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(3);
    });

    it('should not render either a title nor a close-button when title is not provided', () => {
        view.rerender(
            <Dialog
                isOpen
                acceptButton={acceptButtonProps}
                cancelButton={cancelButtonProps}
                ariaHideApp={false}
                contentLabel="Content Label"
            >
                {dialogBody}
            </Dialog>
        );
        expect(view.baseElement).toMatchSnapshot();
        expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    it('should not show buttons when no acceptButton has been passed', () => {
        view.rerender(
            <Dialog
                isOpen
                closeButton={closeButtonProps}
                ariaHideApp={false}
                contentLabel="Content Label"
                title={dialogTitle}
            >
                {dialogBody}
            </Dialog>
        );

        expect(screen.getAllByRole('heading')).toHaveLength(1);
        expect(screen.getAllByRole('button')).toHaveLength(1);
    });

    it('should render buttons with context critical state', () => {
        view.rerender(
            <Dialog
                isOpen
                closeButton={closeButtonProps}
                ariaHideApp={false}
                contentLabel="Content Label"
                title={dialogTitle}
                variant="critical"
                acceptButton={acceptButtonProps}
                cancelButton={cancelButtonProps}
            >
                {dialogBody}
            </Dialog>
        );
        expect(screen.getByRole('button', { name: /OK/i })).toHaveClass('Button--context_critical');
    });

    it('should render buttons with context primary state when no variant is passed', () => {
        view.rerender(
            <Dialog
                isOpen
                ariaHideApp={false}
                contentLabel="Content Label"
                acceptButton={acceptButtonProps}
                cancelButton={cancelButtonProps}
            >
                {dialogBody}
            </Dialog>
        );
        expect(screen.getByRole('button', { name: /OK/i })).toHaveClass('Button--context_primary');
    });

    it('should call onAccept callback when button is clicked', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: /OK/i }));

        expect(mockOnAccept).toHaveBeenCalledTimes(1);
    });

    it('should call onCancel callback when button is clicked', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: /Cancel/i }));

        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('should call onClose callback when x is clicked', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByLabelText('Close'));

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});
