import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../Select';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '../../../AutosuggestDeprecated/__mocks__/suggestions';

// TODO: these tests use the wrong role to find items in the list.
// This should be remedied in or following https://textkernel.atlassian.net/browse/ONEUI-364
describe('Select', () => {
    const mockOnChange = jest.fn();
    const mockOnFocus = jest.fn();
    const mockOnBlur = jest.fn();
    const mockOnClear = jest.fn();
    const clearIconLabel = 'X';
    const upArrowLabel = 'Close';
    const downArrowLabel = 'Open';

    let view;

    const openWrapper = async (user) => {
        await user.click(screen.getByLabelText(downArrowLabel));
    };
    const closeWrapper = async (user) => {
        await user.click(screen.getByLabelText(upArrowLabel));
    };

    beforeEach(() => {
        view = render(
            <Select
                className="someClass"
                items={SUGGESTIONS}
                itemToString={SUGGESTION_TO_STRING}
                selectedItem={SUGGESTIONS[1]}
                onChange={mockOnChange}
                clearTooltipLabel={clearIconLabel}
                upArrowLabel={upArrowLabel}
                downArrowLabel={downArrowLabel}
            />
        );
    });

    describe('rendering', () => {
        it('should initially render correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(view.container.firstChild).toHaveTextContent(
                SUGGESTION_TO_STRING(SUGGESTIONS[1])
            );
            expect(screen.getByLabelText(downArrowLabel)).toBeInTheDocument();
        });

        it('should not render clear button if onClear is not defined', () => {
            expect(view.container).toMatchSnapshot();
            expect(screen.queryByLabelText(clearIconLabel)).not.toBeInTheDocument();
        });

        it('should render clear button onClear is defined', () => {
            view.rerender(
                <Select
                    className="someClass"
                    items={SUGGESTIONS}
                    itemToString={SUGGESTION_TO_STRING}
                    selectedItem={SUGGESTIONS[1]}
                    onChange={mockOnChange}
                    onClear={mockOnClear}
                    clearTooltipLabel={clearIconLabel}
                    upArrowLabel={upArrowLabel}
                    downArrowLabel={downArrowLabel}
                />
            );
            expect(screen.getByLabelText(clearIconLabel)).toBeInTheDocument();
        });

        it('should render focused component correctly', async () => {
            const user = userEvent.setup();
            await openWrapper(user);

            expect(view.container).toMatchSnapshot();
            expect(screen.getAllByRole('option')).toHaveLength(SUGGESTIONS.length);
            expect(view.container.firstChild).toHaveTextContent(
                SUGGESTION_TO_STRING(SUGGESTIONS[1])
            );
        });
    });
    describe('toggling items list', () => {
        it('should open list when search box is clicked', async () => {
            const user = userEvent.setup();
            // originally to be closed
            expect(screen.queryAllByRole('option')).toHaveLength(0);

            // open items list
            await user.click(screen.getByRole('searchbox'));
            expect(screen.getAllByRole('option')).toHaveLength(SUGGESTIONS.length);
        });

        it('should open list when arrow element is clicked', async () => {
            const user = userEvent.setup();
            // originally to be closed
            expect(screen.queryAllByRole('option')).toHaveLength(0);

            // open items list
            await openWrapper(user);
            expect(screen.getAllByRole('option')).toHaveLength(SUGGESTIONS.length);
        });

        it('should close list when arrow element is clicked', async () => {
            const user = userEvent.setup();
            // originally to be closed
            expect(screen.queryAllByRole('option')).toHaveLength(0);

            // open items list
            await openWrapper(user);
            expect(screen.getAllByRole('option')).toHaveLength(SUGGESTIONS.length);

            // close item list
            await closeWrapper(user);
            expect(screen.queryAllByRole('option')).toHaveLength(0);
        });

        it('should close list when item is selected', async () => {
            const user = userEvent.setup();
            // originally to be closed
            expect(screen.queryAllByRole('option')).toHaveLength(0);

            // open items list
            await openWrapper(user);
            expect(screen.getAllByRole('option')).toHaveLength(SUGGESTIONS.length);

            // select item
            await user.click(screen.queryAllByRole('option')[1]);
            expect(screen.queryAllByRole('option')).toHaveLength(0);
        });
    });

    describe('placeholder', () => {
        it('should show placeholder correctly', async () => {
            const user = userEvent.setup();
            expect(view.container.firstChild).toHaveTextContent('Moon');

            view.rerender(
                <Select
                    className="someClass"
                    items={SUGGESTIONS}
                    itemToString={SUGGESTION_TO_STRING}
                    onChange={mockOnChange}
                    upArrowLabel={upArrowLabel}
                    downArrowLabel={downArrowLabel}
                />
            );
            expect(view.container.firstChild).toHaveTextContent('');

            view.rerender(
                <Select
                    className="someClass"
                    items={SUGGESTIONS}
                    itemToString={SUGGESTION_TO_STRING}
                    onChange={mockOnChange}
                    placeholder="Choose..."
                    upArrowLabel={upArrowLabel}
                    downArrowLabel={downArrowLabel}
                />
            );
            expect(view.container.firstChild).toHaveTextContent('Choose...');

            await openWrapper(user);
            expect(view.container.firstChild).toHaveTextContent('Choose...');
        });
    });

    describe('callbacks', () => {
        describe('onFocus', () => {
            it('should be called when opening the dropdown', async () => {
                const user = userEvent.setup();
                view.rerender(
                    <Select
                        className="someClass"
                        items={SUGGESTIONS}
                        itemToString={SUGGESTION_TO_STRING}
                        onChange={mockOnChange}
                        onFocus={mockOnFocus}
                        clearTooltipLabel={clearIconLabel}
                        upArrowLabel={upArrowLabel}
                        downArrowLabel={downArrowLabel}
                    />
                );
                expect(mockOnFocus).not.toHaveBeenCalled();

                await openWrapper(user);
                expect(mockOnFocus).toHaveBeenCalledTimes(1);
            });
        });

        describe('onBlur', () => {
            it('should be called on clicking when closing the dropdown', async () => {
                const user = userEvent.setup();
                view.rerender(
                    <Select
                        className="someClass"
                        items={SUGGESTIONS}
                        itemToString={SUGGESTION_TO_STRING}
                        onChange={mockOnChange}
                        onBlur={mockOnBlur}
                        clearTooltipLabel={clearIconLabel}
                        upArrowLabel={upArrowLabel}
                        downArrowLabel={downArrowLabel}
                    />
                );
                expect(mockOnBlur).not.toHaveBeenCalled();

                await openWrapper(user);
                expect(mockOnBlur).not.toHaveBeenCalled();

                await closeWrapper(user);
                expect(mockOnBlur).toHaveBeenCalled();
            });

            it('should be called on clicking when selecting an item', async () => {
                const user = userEvent.setup();
                view.rerender(
                    <Select
                        className="someClass"
                        items={SUGGESTIONS}
                        itemToString={SUGGESTION_TO_STRING}
                        onChange={mockOnChange}
                        onBlur={mockOnBlur}
                        clearTooltipLabel={clearIconLabel}
                        upArrowLabel={upArrowLabel}
                        downArrowLabel={downArrowLabel}
                    />
                );
                expect(mockOnBlur).not.toHaveBeenCalled();

                await openWrapper(user);
                expect(mockOnBlur).not.toHaveBeenCalled();

                await user.click(screen.queryAllByRole('option')[1]);
                expect(mockOnBlur).toHaveBeenCalled();
            });
        });
        describe('onChange', () => {
            it('should be called on clicking on a suggestion', async () => {
                const user = userEvent.setup();
                await openWrapper(user);
                expect(mockOnChange).not.toHaveBeenCalled();

                await user.click(screen.queryAllByRole('option')[1]);
                expect(mockOnChange).toHaveBeenCalled();
            });

            it('should not be called on simply closing the dropdown', async () => {
                const user = userEvent.setup();
                await openWrapper(user);
                expect(mockOnChange).not.toHaveBeenCalled();
                await closeWrapper(user);
                expect(mockOnChange).not.toHaveBeenCalled();
            });
        });

        describe('onClear', () => {
            it('should be called on clicking on a clear button', async () => {
                const user = userEvent.setup();
                view.rerender(
                    <Select
                        className="someClass"
                        items={SUGGESTIONS}
                        itemToString={SUGGESTION_TO_STRING}
                        selectedItem={SUGGESTIONS[1]}
                        onChange={mockOnChange}
                        onClear={mockOnClear}
                        clearTooltipLabel={clearIconLabel}
                        upArrowLabel={upArrowLabel}
                        downArrowLabel={downArrowLabel}
                    />
                );
                expect(screen.getByLabelText(clearIconLabel)).toBeInTheDocument();
                expect(mockOnClear).not.toHaveBeenCalled();

                await user.click(screen.getByLabelText(clearIconLabel));
                expect(mockOnClear).toHaveBeenCalled();
            });
        });
    });
});
