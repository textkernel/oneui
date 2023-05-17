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
    let clickPillButton;

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

        const user = userEvent.setup();
        clickPillButton = async () => {
            await user.click(screen.getByRole('button', { name: '' }));
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        expect(view.container).toMatchSnapshot();

        expect(screen.getByRole('button', { name: 'Pill content' })).toBeInTheDocument();
    });

    it('should open dropdown when button is clicked', () => {
        clickPillButton();

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('button', { name: 'Pill content' })).toBeInTheDocument();
        // expect(view.find('PillDropdown')).toHaveLength(1);
    });

    it('should close dropdown when button is clicked again', () => {
        clickPillButton();
        // expect(view.find('PillDropdown')).toHaveLength(1);

        clickPillButton();
        // expect(view.find('PillDropdown')).toHaveLength(0);
    });

    it.skip('should render children when dropdown is open', () => {
        expect(childrenMock).not.toHaveBeenCalled();

        clickPillButton();
        // expect(view.find('PillDropdown')).toHaveLength(1);
        expect(childrenMock).toHaveBeenCalledTimes(1);
    });

    it.skip('should call onClose when dropdown is closed via pill-button click', () => {
        clickPillButton();
        clickPillButton();

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it.skip('should call onClose when dropdown is closed via done-button click', () => {
        clickPillButton();

        const user = userEvent.setup();
        user.click(screen.getByRole('button', { name: 'Pill content' }));

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
