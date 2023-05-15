import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Confirm } from '../Confirm';

describe('Confirm', () => {
    const mockOnAccept = jest.fn();
    const mockOnCancel = jest.fn();
    let view: RenderResult;

    beforeEach(() => {
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
        expect(view.container).toMatchSnapshot();
        expect(screen.queryAllByRole('heading')).toHaveLength(0);
        expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    it('should render correctly with title', () => {
        view.rerender(
            <Confirm
                isOpen
                acceptButton={{ onClick: mockOnAccept, label: 'OK' }}
                cancelButton={{ onClick: mockOnCancel, label: 'Cancel' }}
                ariaHideApp={false}
                contentLabel="Content Label"
                title="Title"
            >
                Body of the confirm
            </Confirm>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getAllByRole('heading')).toHaveLength(1);
    });

    it('should call onCancel callback when button is clicked', async () => {
        const user = userEvent.setup();
        await user.click(screen.getAllByRole('button')[1]);

        expect(mockOnAccept).toHaveBeenCalledTimes(1);
    });
    it('should call onCancel callback when button is clicked', async () => {
        const user = userEvent.setup();
        await user.click(screen.getAllByRole('button')[0]);

        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
});
