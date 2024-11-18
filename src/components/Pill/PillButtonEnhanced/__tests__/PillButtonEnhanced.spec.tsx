import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { PillButtonEnhanced } from '../PillButtonEnhanced';
import { DropdownRoot } from '../../../Dropdown';
import { PriorityItemType } from '../../../PrioritySelector';
import { ENTER_KEY } from '../../../../constants';

describe('<PillButtonEnhanced> component', () => {
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
                <DropdownRoot>
                    <PillButtonEnhanced
                        onClear={onClearMock}
                        name={name}
                        downArrowLabel={downArrowLabel}
                        upArrowLabel={upArrowLabel}
                        clearLabel={clearLabel}
                        additionalContentLabel={additionalContentLabel}
                        additionalContentTooltip={additionalContentTooltip}
                    />
                </DropdownRoot>
            );
        });

        it('should render correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(getButtonByName(downArrowLabel)).toBeVisible();
            expect(getButtonByNameQuerySearch(upArrowLabel)).not.toBeInTheDocument();
            expect(getButtonByNameQuerySearch(clearLabel)).not.toBeInTheDocument();
        });
    });

    describe('in inactive, open state (isOpen prop)', () => {
        beforeEach(() => {
            view = render(
                <DropdownRoot>
                    <PillButtonEnhanced
                        onClear={onClearMock}
                        name={name}
                        isOpen
                        downArrowLabel={downArrowLabel}
                        upArrowLabel={upArrowLabel}
                        clearLabel={clearLabel}
                    />
                </DropdownRoot>
            );
        });

        it('should render correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(getButtonByName(upArrowLabel)).toBeVisible();
            expect(getButtonByNameQuerySearch(clearLabel)).not.toBeInTheDocument();
        });
    });

    describe('in active, collapsed state (with content prop)', () => {
        beforeEach(() => {
            view = render(
                <DropdownRoot>
                    <PillButtonEnhanced
                        onClear={onClearMock}
                        name={name}
                        content={content}
                        downArrowLabel={downArrowLabel}
                        upArrowLabel={upArrowLabel}
                        clearLabel={clearLabel}
                    />
                </DropdownRoot>
            );
        });

        it('should render correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(getButtonByName(clearLabel)).toBeVisible();
            expect(getButtonByNameQuerySearch(upArrowLabel)).not.toBeInTheDocument();
            expect(getButtonByNameQuerySearch(downArrowLabel)).not.toBeInTheDocument();
        });

        it('should call onClear when clear button is clicked', async () => {
            const user = userEvent.setup();
            await user.click(getButtonByName(clearLabel));

            expect(onClearMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger onClear on keyboard interaction with button', async () => {
            const user = userEvent.setup();
            const button = getButtonByName(clearLabel);
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(onClearMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('in active, open state (content and isOpen prop)', () => {
        beforeEach(() => {
            view = render(
                <DropdownRoot>
                    <PillButtonEnhanced
                        onClear={onClearMock}
                        name={name}
                        content={content}
                        isOpen
                        downArrowLabel={downArrowLabel}
                        upArrowLabel={upArrowLabel}
                        clearLabel={clearLabel}
                    />
                </DropdownRoot>
            );
        });

        it('should render correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(getButtonByName(clearLabel)).toBeVisible();
            expect(getButtonByNameQuerySearch(upArrowLabel)).not.toBeInTheDocument();
        });

        it('should trigger onClear callback once when clear button is clicked', async () => {
            const user = userEvent.setup();
            await user.click(getButtonByName(clearLabel));

            expect(onClearMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger onClear callback once on keyboard interaction with clear button', async () => {
            const user = userEvent.setup();
            const button = getButtonByName(clearLabel);
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(onClearMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('with additional props', () => {
        it('should set style according to prop', () => {
            view = render(
                <DropdownRoot>
                    <PillButtonEnhanced
                        onClear={onClearMock}
                        name={name}
                        content={content}
                        maxWidth="fit-content"
                        downArrowLabel={downArrowLabel}
                        upArrowLabel={upArrowLabel}
                        clearLabel={clearLabel}
                    />
                </DropdownRoot>
            );

            expect(view.container).toMatchSnapshot();
            expect(getButtonByName(/name/i)).toHaveStyle('max-width: fit-content');
        });

        it('should render correctly with priority selector', () => {
            const priorityList: PriorityItemType<string>[] = [
                { priority: 'mandatory', label: 'Mandatory', value: 'required' },
                { priority: 'important', label: 'Important', value: 'strongly_favored' },
                { priority: 'optional', label: 'Optional', value: 'favored' },
                { priority: 'exclude', label: 'Exclude', value: 'banned' },
            ];

            view = render(
                <DropdownRoot>
                    <PillButtonEnhanced
                        onClear={onClearMock}
                        name={name}
                        content={content}
                        downArrowLabel={downArrowLabel}
                        upArrowLabel={upArrowLabel}
                        clearLabel={clearLabel}
                        priority={{
                            onChange: jest.fn(),
                            selectedItem: priorityList[0],
                            list: priorityList,
                            buttonLabel: 'priorityButton',
                            triggerClassName: 'test-class',
                        }}
                    />
                </DropdownRoot>
            );

            expect(view.container).toMatchSnapshot();
            expect(screen.getByRole('button', { name: 'priorityButton' })).toHaveClass(
                'test-class'
            );
        });
    });
});
