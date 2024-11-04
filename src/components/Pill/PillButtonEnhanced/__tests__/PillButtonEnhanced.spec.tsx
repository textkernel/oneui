import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { PillButtonEnhanced } from '../PillButtonEnhanced';
import { ENTER_KEY } from '../../../../constants';

describe('<PillButtonEnhanced> component', () => {
    const toggleDropdownMock = jest.fn();
    const onClearMock = jest.fn();
    const name = 'Pill name';
    const content = 'This pill is in use';
    const additionalContentLabel = '+2';
    const additionalContentTooltip = 'more\ncontent';
    const downArrowLabel = 'down arrow';
    const upArrowLabel = 'up arrow';
    const clearLabel = 'clear label';

    let view: RenderResult;

    const getButtonByName = (inputName) => screen.getByRole('button', { name: inputName });

    const getButtonByNameQuerySearch = (inputName) =>
        screen.queryByRole('button', { name: inputName });

    describe('in inactive, collapsed state (with minimal props)', () => {
        beforeEach(() => {
            view = render(
                <PillButtonEnhanced
                    toggleDropdown={toggleDropdownMock}
                    onClear={onClearMock}
                    name={name}
                    downArrowLabel={downArrowLabel}
                    upArrowLabel={upArrowLabel}
                    clearLabel={clearLabel}
                    additionalContentLabel={additionalContentLabel}
                    additionalContentTooltip={additionalContentTooltip}
                />
            );
        });

        it('should render correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(getButtonByName(downArrowLabel)).toBeVisible();
            expect(getButtonByNameQuerySearch(upArrowLabel)).not.toBeInTheDocument();
            expect(getButtonByNameQuerySearch(clearLabel)).not.toBeInTheDocument();
        });

        it('should trigger toggle state once when arrow button clicked', async () => {
            const user = userEvent.setup();
            await user.click(getButtonByName(downArrowLabel));

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger toggle state once when pill button clicked', async () => {
            const user = userEvent.setup();
            await user.click(getButtonByName(/name/i));

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger toggle state once on keyboard interaction with arrow button', async () => {
            const user = userEvent.setup();
            const button = getButtonByName(downArrowLabel);
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger toggle state once on keyboard interaction with whole pill', async () => {
            const user = userEvent.setup();
            const button = getButtonByName(/name/i);
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('in inactive, open state (isOpen prop)', () => {
        beforeEach(() => {
            view = render(
                <PillButtonEnhanced
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
            expect(getButtonByName(upArrowLabel)).toBeVisible();
            expect(getButtonByNameQuerySearch(clearLabel)).not.toBeInTheDocument();
        });

        it('should trigger toggle state once when arrow button clicked', async () => {
            const user = userEvent.setup();
            await user.click(getButtonByName(upArrowLabel));

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger toggle state once when pill button clicked', async () => {
            const user = userEvent.setup();
            await user.click(getButtonByName(name));

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger toggle state once on keyboard interaction with arrow button', async () => {
            const user = userEvent.setup();
            const button = getButtonByName(upArrowLabel);
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger toggle state once on keyboard interaction with whole pill', async () => {
            const user = userEvent.setup();
            const button = getButtonByName(name);
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('in active, collapsed state (with content prop)', () => {
        beforeEach(() => {
            view = render(
                <PillButtonEnhanced
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

        it('should clear content when clear button is clicked', async () => {
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
                <PillButtonEnhanced
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
            expect(getButtonByName(clearLabel)).toBeVisible();
            expect(getButtonByNameQuerySearch(upArrowLabel)).not.toBeInTheDocument();
        });

        it('should trigger toggle state once whole button is clicked', async () => {
            const user = userEvent.setup();
            await user.click(getButtonByName(/name/i));

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger onClear callback once when clear button is clicked', async () => {
            const user = userEvent.setup();
            await user.click(getButtonByName(clearLabel));

            expect(toggleDropdownMock).toHaveBeenCalledTimes(0);
            expect(onClearMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger toggle state once on keyboard interaction with whole button', async () => {
            const user = userEvent.setup();
            const button = getButtonByName(/name/i);
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger onClear callback once on keyboard interaction with clear button', async () => {
            const user = userEvent.setup();
            const button = getButtonByName(clearLabel);
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(onClearMock).toHaveBeenCalledTimes(1);
            expect(toggleDropdownMock).toHaveBeenCalledTimes(0);
        });
    });

    describe('with additional props', () => {
        it('should set style according to prop', () => {
            view = render(
                <PillButtonEnhanced
                    toggleDropdown={toggleDropdownMock}
                    onClear={onClearMock}
                    name={name}
                    content={content}
                    maxWidth="fit-content"
                    downArrowLabel={downArrowLabel}
                    upArrowLabel={upArrowLabel}
                    clearLabel={clearLabel}
                />
            );

            expect(view.container).toMatchSnapshot();
            expect(getButtonByName(/name/i)).toHaveStyle('max-width: fit-content');
        });
    });
});
