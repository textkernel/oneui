import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { PillButton } from '../PillButton';
import { ENTER_KEY } from '../../../../constants';

describe('<PillButton> component', () => {
    const toggleDropdownMock = jest.fn();
    const onClearMock = jest.fn();
    const name = 'Pill name';
    const content = 'This pill is in use';
    const downArrowLabel = 'down arrow';
    const upArrowLabel = 'up arrow';
    const clearLabel = 'clear label';

    let view: RenderResult;

    const getButtonByName = (inputName) => {
        return screen.getByRole('button', { name: `${inputName}` });
    };

    describe('in inactive, collapsed state (with minimal props)', () => {
        beforeEach(() => {
            view = render(
                <PillButton
                    toggleDropdown={toggleDropdownMock}
                    onClear={onClearMock}
                    name={name}
                    downArrowLabel={downArrowLabel}
                    upArrowLabel={upArrowLabel}
                    clearLabel={clearLabel}
                />
            );
        });

        it('should render correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(getButtonByName(downArrowLabel)).not.toHaveClass(
                'PillButton__button PillButton__button--isOpen'
            );
            expect(getButtonByName(downArrowLabel)).not.toHaveClass('PillButton__button--isOpen');
        });

        it('should trigger toggle state once when clicked', async () => {
            const user = userEvent.setup();
            await user.click(getButtonByName(downArrowLabel));

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
            expect(getButtonByName(downArrowLabel)).toBeInTheDocument();
            expect(screen.queryByText(upArrowLabel)).not.toBeInTheDocument();
        });

        it('should trigger toggle state once on keyboard interaction', async () => {
            const user = userEvent.setup();
            const button = getButtonByName(downArrowLabel);
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should have arrow down label', () => {
            expect(screen.getByRole('img')).toBeInTheDocument();
            expect(getButtonByName(downArrowLabel)).toBeInTheDocument();
        });
    });

    describe('in inactive, open state (isOpen prop)', () => {
        beforeEach(() => {
            view = render(
                <PillButton
                    toggleDropdown={toggleDropdownMock}
                    onClear={onClearMock}
                    name={name}
                    isOpen
                    downArrowLabel={downArrowLabel}
                    upArrowLabel={upArrowLabel}
                    clearLabel={clearLabel}
                />
            );
        });

        it('should render correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(getButtonByName(upArrowLabel)).toHaveClass(
                'PillButton__button PillButton__button--isOpen'
            );
            expect(getButtonByName('Pill name up arrow')).not.toHaveClass(
                'PillButton__button--isOpen'
            );
        });

        it('should have arrow up label', () => {
            expect(screen.getByRole('img')).toBeInTheDocument();
            expect(getButtonByName(upArrowLabel)).toBeInTheDocument();
        });
    });

    describe('in active, collapsed state (with content prop)', () => {
        beforeEach(() => {
            view = render(
                <PillButton
                    toggleDropdown={toggleDropdownMock}
                    onClear={onClearMock}
                    name={name}
                    content={content}
                    downArrowLabel={downArrowLabel}
                    upArrowLabel={upArrowLabel}
                    clearLabel={clearLabel}
                />
            );
        });

        it('should render correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(getButtonByName(clearLabel)).not.toHaveClass('PillButton__button--isOpen');
            expect(getButtonByName('This pill is in use clear label')).toHaveClass(
                'PillButton__pill PillButton__pill--isActive'
            );
        });

        it('should not trigger toggle state but onClear only when button is clicked', async () => {
            const user = userEvent.setup();
            await user.click(getButtonByName(clearLabel));

            expect(onClearMock).toHaveBeenCalledTimes(1);
            expect(toggleDropdownMock).toHaveBeenCalledTimes(0);
        });

        it('should not trigger toggle state but onClear only on keyboard interaction with button', async () => {
            const user = userEvent.setup();
            const button = getButtonByName(clearLabel);
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(onClearMock).toHaveBeenCalledTimes(1);
            expect(toggleDropdownMock).toHaveBeenCalledTimes(0);
        });
    });

    describe('in active, open state (content and isOpen prop)', () => {
        beforeEach(() => {
            view = render(
                <PillButton
                    toggleDropdown={toggleDropdownMock}
                    onClear={onClearMock}
                    name={name}
                    content={content}
                    isOpen
                    downArrowLabel={downArrowLabel}
                    upArrowLabel={upArrowLabel}
                    clearLabel={clearLabel}
                />
            );
        });

        it('should render correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(getButtonByName(upArrowLabel)).toHaveClass(
                'PillButton__button PillButton__button--isOpen'
            );
            expect(getButtonByName('This pill is in use up arrow')).toHaveClass(
                'PillButton__pill PillButton__pill--isOpen PillButton__pill--isActive'
            );
        });

        it('should trigger toggle state once when button is clicked', async () => {
            const user = userEvent.setup();
            await user.click(getButtonByName(upArrowLabel));

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger toggle state once on keyboard interaction with button', async () => {
            const user = userEvent.setup();
            getButtonByName(upArrowLabel).focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });
    });
});
