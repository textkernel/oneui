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
    const dialogRole = 'dialog';
    const downArrowLabel = 'Open';
    const upArrowLabel = 'Close';
    const clearLabel = 'Clear';

    let view: RenderResult;
    const getButtonByName = (inputName) =>
        screen.getByRole('button', { name: new RegExp(inputName) });

    beforeEach(() => {
        view = render(
            <Pill
                onClear={onClearMock}
                onClose={onCloseMock}
                name={nameMock}
                content={contentMock}
                doneLabel="Done"
                downArrowLabel={downArrowLabel}
                upArrowLabel={upArrowLabel}
                clearLabel={clearLabel}
            >
                {childrenMock}
            </Pill>
        );
    });

    it('should render correctly', () => {
        expect(view.container).toMatchSnapshot();
        expect(getButtonByName(contentMock)).toBeVisible();
        expect(screen.queryByRole(dialogRole)).not.toBeInTheDocument();
    });

    it('should open dropdown when button is clicked', async () => {
        const user = userEvent.setup();
        await user.click(getButtonByName(contentMock));

        expect(view.container).toMatchSnapshot();
        expect(getButtonByName(contentMock)).toBeVisible();
        expect(screen.getByRole(dialogRole)).toBeVisible();
    });

    it('should close dropdown when button is clicked again', async () => {
        const user = userEvent.setup();
        await user.click(getButtonByName(contentMock));

        expect(screen.getByRole(dialogRole)).toBeVisible();

        await user.click(getButtonByName(contentMock));

        expect(screen.queryByRole(dialogRole)).not.toBeInTheDocument();
    });

    it('should call onClear when button is clicked', async () => {
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', { name: clearLabel }));
        expect(onClearMock).toHaveBeenCalledTimes(1);
    });

    it('should render children when dropdown is open', async () => {
        expect(childrenMock).not.toHaveBeenCalled();

        const user = userEvent.setup();
        await user.click(getButtonByName(contentMock));

        expect(screen.getByRole(dialogRole)).toBeVisible();
        expect(childrenMock).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when dropdown is closed via pill-button click', async () => {
        const user = userEvent.setup();
        await user.click(getButtonByName(contentMock));
        await user.click(getButtonByName(contentMock));

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
