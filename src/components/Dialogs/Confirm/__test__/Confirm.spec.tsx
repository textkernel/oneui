import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Confirm } from '../Confirm';

describe('Confirm', () => {
    let mockOnAccept: jest.Mock;
    let mockOnCancel: jest.Mock;
    let mockOnClose: jest.Mock;
    let view: RenderResult;

    beforeEach(() => {
        mockOnAccept = jest.fn();
        mockOnCancel = jest.fn();
        mockOnClose = jest.fn();

        view = render(
            <Confirm
                isOpen
                acceptButton={{ onClick: mockOnAccept, label: 'OK' }}
                cancelButton={{ onClick: mockOnCancel, label: 'Cancel' }}
                ariaHideApp={false}
                contentLabel="Content Label"
            >
                Body of the confirm
            </Confirm>
        );
    });

    it('should render correctly', () => {
        expect(view.baseElement).toMatchSnapshot();
        expect(screen.queryAllByRole('heading')).toHaveLength(0);
        expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    it('should render correctly with title', () => {
        view.rerender(
            <Confirm
                isOpen
                acceptButton={{ onClick: mockOnAccept, label: 'OK' }}
                cancelButton={{ onClick: mockOnCancel, label: 'Cancel' }}
                closeButton={{ onClick: mockOnClose, label: 'Close' }}
                ariaHideApp={false}
                contentLabel="Content Label"
                title="Title"
            >
                Body of the confirm
            </Confirm>
        );

        expect(view.baseElement).toMatchSnapshot();
        expect(screen.getAllByRole('heading')).toHaveLength(1);
    });

    it('should call onAccept callback when OK button is clicked', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'OK' }));

        expect(mockOnAccept).toHaveBeenCalledTimes(1);
    });

    it('should call onCancel callback when cancel button is clicked', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Cancel' }));

        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('should call onCancel callback when button is clicked', async () => {
        view.rerender(
            <Confirm
                isOpen
                acceptButton={{ onClick: mockOnAccept, label: 'OK' }}
                cancelButton={{ onClick: mockOnCancel, label: 'Cancel' }}
                closeButton={{ onClick: mockOnClose, label: 'Close' }}
                ariaHideApp={false}
                contentLabel="Content Label"
                title="Title"
            >
                Body of the confirm
            </Confirm>
        );

        const user = userEvent.setup();
        await user.click(screen.getByLabelText('Close'));

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});
