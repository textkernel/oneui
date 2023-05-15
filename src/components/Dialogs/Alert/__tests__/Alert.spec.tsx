import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Alert } from '../Alert';

describe('Alert', () => {
    const mockOnAccept = jest.fn();
    let view: RenderResult;

    beforeEach(() => {
        view = render(
            <Alert
                isOpen
                acceptButton={{ onClick: mockOnAccept, label: 'OK' }}
                ariaHideApp={false}
                contentLabel="Content label"
            >
                Body of the alert
            </Alert>
        );
    });

    it('should render correctly', () => {
        expect(view.container).toMatchSnapshot();
        expect(screen.queryAllByRole('heading')).toHaveLength(0);
        expect(screen.getAllByRole('button')).toHaveLength(1);
    });

    it('should render correctly with title', () => {
        view.rerender(
            <Alert
                isOpen
                acceptButton={{ onClick: mockOnAccept, label: 'OK' }}
                ariaHideApp={false}
                contentLabel="Content label"
                title="Title"
            >
                Body of the alert
            </Alert>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getAllByRole('heading')).toHaveLength(1);
    });

    it('should call onAccept cb when button is clicked', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button'));

        expect(mockOnAccept).toHaveBeenCalledTimes(1);
    });
});
