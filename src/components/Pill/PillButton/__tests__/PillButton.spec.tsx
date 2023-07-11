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
    const imgRole = 'img';

    let view: RenderResult;

    const getButtonByName = (inputName) => {
        return screen.getByRole('button', { name: inputName });
    };

    const getButtonByNameQuerySearch = (inputName) => {
        return screen.queryByRole('button', { name: inputName });
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
            expect(getButtonByNameQuerySearch(upArrowLabel)).not.toBeInTheDocument();
            expect(getButtonByNameQuerySearch(clearLabel)).not.toBeInTheDocument();
        });

        it('should trigger toggle state once when clicked', async () => {
            const user = userEvent.setup();
            await user.click(getButtonByName(downArrowLabel));

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
            expect(getButtonByName(downArrowLabel)).toBeVisible();
            expect(getButtonByNameQuerySearch(upArrowLabel)).not.toBeInTheDocument();
            expect(getButtonByNameQuerySearch(clearLabel)).not.toBeInTheDocument();
        });

        it('should trigger toggle state once on keyboard interaction', async () => {
            const user = userEvent.setup();
            const button = getButtonByName(downArrowLabel);
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should have arrow down label', () => {
            expect(screen.getByRole(imgRole)).toBeVisible();
            expect(getButtonByName(downArrowLabel)).toBeVisible();
            expect(getButtonByNameQuerySearch(upArrowLabel)).not.toBeInTheDocument();
            expect(getButtonByNameQuerySearch(clearLabel)).not.toBeInTheDocument();
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
            expect(getButtonByName(upArrowLabel)).toBeVisible();
            expect(getButtonByNameQuerySearch(clearLabel)).not.toBeInTheDocument();
        });

        it('should have arrow up label', () => {
            expect(screen.getByRole(imgRole)).toBeVisible();
            expect(getButtonByName(upArrowLabel)).toBeVisible();
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
            expect(getButtonByName(clearLabel)).toBeVisible();
            expect(getButtonByNameQuerySearch(upArrowLabel)).not.toBeInTheDocument();
            expect(getButtonByNameQuerySearch(downArrowLabel)).not.toBeInTheDocument();
        });

        it('should not trigger toggle state but onClear only when button is clicked', async () => {
            const user = userEvent.setup();
            await user.click(getButtonByName(clearLabel));

            expect(onClearMock).toHaveBeenCalledTimes(1);
            expect(toggleDropdownMock).toHaveBeenCalledTimes(0);
        });

        it('should not clear content when clear button is clicked', async () => {
            const user = userEvent.setup();

            expect(screen.getByText(content)).toBeVisible();

            await user.click(getButtonByName(clearLabel));

            expect(screen.getByText(content)).toBeVisible();
            expect(onClearMock).toHaveBeenCalledTimes(1);
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
            expect(getButtonByName(upArrowLabel)).toBeVisible();
            expect(getButtonByNameQuerySearch(clearLabel)).not.toBeInTheDocument();
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

        it('should have arrow up label', () => {
            expect(screen.getByRole(imgRole, { name: upArrowLabel })).toBeVisible();
            expect(getButtonByName(upArrowLabel)).toBeVisible();
        });
    });
});
