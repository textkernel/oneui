import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Alert } from '../Alert';
import { ResizeObserverMock } from '../../../../__mocks__/resizeObserverMock';

describe('Alert', () => {
    const mockOnAccept = jest.fn();
    const mockOnClose = jest.fn();
    let view: RenderResult;

    beforeEach(() => {
        global.ResizeObserver = ResizeObserverMock;

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
        expect(view.baseElement).toMatchSnapshot();
        expect(screen.queryAllByRole('heading')).toHaveLength(0);
        expect(screen.getAllByRole('button')).toHaveLength(1);
    });

    it('should render correctly with title', () => {
        view.rerender(
            <Alert
                isOpen
                acceptButton={{ onClick: mockOnAccept, label: 'OK' }}
                closeButton={{ onClick: mockOnClose, label: 'Close' }}
                ariaHideApp={false}
                contentLabel="Content label"
                title="Title"
            >
                Body of the alert
            </Alert>
        );

        expect(view.baseElement).toMatchSnapshot();
        expect(screen.getAllByRole('heading')).toHaveLength(1);
    });

    it('should call onAccept cb when button is clicked', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: /OK/i }));

        expect(mockOnAccept).toHaveBeenCalledTimes(1);
    });
});
