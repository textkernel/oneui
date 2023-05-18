import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Pill } from '../Pill';

describe('<Pill> component', () => {
    const childrenMock = jest.fn();
    const onClearMock = jest.fn();
    const onCloseMock = jest.fn();
    const nameMock = 'Pill name';
    const contentMock = 'Pill content';

    let view: RenderResult;

    beforeEach(() => {
        view = render(
            <Pill
                onClear={onClearMock}
                onClose={onCloseMock}
                name={nameMock}
                content={contentMock}
                doneLabel="Done"
            >
                {childrenMock}
            </Pill>
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('button', { name: 'Pill content' })).toBeInTheDocument();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should open dropdown when button is clicked', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Pill content' }));

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('button', { name: 'Pill content' })).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should close dropdown when button is clicked again', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Pill content' }));

        expect(screen.getByRole('dialog')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Pill content' }));

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render children when dropdown is open', async () => {
        expect(childrenMock).not.toHaveBeenCalled();

        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Pill content' }));

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(childrenMock).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when dropdown is closed via pill-button click', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Pill content' }));
        await user.click(screen.getByRole('button', { name: 'Pill content' }));

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it.skip('should call onClose when dropdown is closed via done-button click', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Done' }));

        // wrapper.find('.PillDropdown__footer button').simulate('click');
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
