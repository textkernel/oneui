import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../Select';
import { CLOSE_ICON_LABEL, UP_ARROW_LABEL, DOWN_ARROW_LABEL } from '../../../../constants';
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

    let view;

    const openWrapper = async (user) => {
        await user.click(screen.getByLabelText(UP_ARROW_LABEL));
    };
    const closeWrapper = async (user) => {
        await user.click(screen.getByLabelText(DOWN_ARROW_LABEL));
    };

    beforeEach(() => {
        view = render(
            <Select
                className="someClass"
                items={SUGGESTIONS}
                itemToString={SUGGESTION_TO_STRING}
                selectedItem={SUGGESTIONS[1]}
                onChange={mockOnChange}
            />
        );
    });

    describe('rendering', () => {
        it('should initially render correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(view.container.firstChild).toHaveTextContent(
                SUGGESTION_TO_STRING(SUGGESTIONS[1])
            );
        });
        it('should not render clear button if onClear is not defined', () => {
            expect(view.container).toMatchSnapshot();
            expect(screen.queryByLabelText(CLOSE_ICON_LABEL)).not.toBeInTheDocument();
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
                />
            );
            expect(screen.getByLabelText(CLOSE_ICON_LABEL)).toBeInTheDocument();
        });

        it('should render focused component correctly', async () => {
            const user = userEvent.setup();
            await openWrapper(user);

            expect(view.container).toMatchSnapshot();
            expect(screen.getAllByRole('presentation')).toHaveLength(SUGGESTIONS.length);
            expect(view.container.firstChild).toHaveTextContent(
                SUGGESTION_TO_STRING(SUGGESTIONS[1])
            );
        });
    });
    describe('toggling items list', () => {
        it('should open list when search box is clicked', async () => {
            const user = userEvent.setup();
            // originally to be closed
            expect(screen.queryAllByRole('presentation')).toHaveLength(0);

            // open items list
            await user.click(screen.getByRole('searchbox'));
            expect(screen.getAllByRole('presentation')).toHaveLength(SUGGESTIONS.length);
        });
        it('should open list when arrow element is clicked', async () => {
            const user = userEvent.setup();
            // originally to be closed
            expect(screen.queryAllByRole('presentation')).toHaveLength(0);

            // open items list
            await openWrapper(user);
            expect(screen.getAllByRole('presentation')).toHaveLength(SUGGESTIONS.length);
        });
        it('should close list when arrow element is clicked', async () => {
            const user = userEvent.setup();
            // originally to be closed
            expect(screen.queryAllByRole('presentation')).toHaveLength(0);

            // open items list
            await openWrapper(user);
            expect(screen.getAllByRole('presentation')).toHaveLength(SUGGESTIONS.length);

            // close item list
            await closeWrapper(user);
            expect(screen.queryAllByRole('presentation')).toHaveLength(0);
        });
        it('should close list when item is selected', async () => {
            const user = userEvent.setup();
            // originally to be closed
            expect(screen.queryAllByRole('presentation')).toHaveLength(0);

            // open items list
            await openWrapper(user);
            expect(screen.getAllByRole('presentation')).toHaveLength(SUGGESTIONS.length);

            // select item
            await user.click(screen.queryAllByRole('presentation')[1]);
            expect(screen.queryAllByRole('presentation')).toHaveLength(0);
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
                    />
                );
                expect(mockOnBlur).not.toHaveBeenCalled();

                await openWrapper(user);
                expect(mockOnBlur).not.toHaveBeenCalled();

                await user.click(screen.queryAllByRole('presentation')[1]);
                expect(mockOnBlur).toHaveBeenCalled();
            });
        });
        describe('onChange', () => {
            it('should be called on clicking on a suggestion', async () => {
                const user = userEvent.setup();
                await openWrapper(user);
                expect(mockOnChange).not.toHaveBeenCalled();

                await user.click(screen.queryAllByRole('presentation')[1]);
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
                    />
                );
                expect(screen.getByLabelText(CLOSE_ICON_LABEL)).toBeInTheDocument();
                expect(mockOnClear).not.toHaveBeenCalled();

                await user.click(screen.getByLabelText(CLOSE_ICON_LABEL));
                expect(mockOnClear).toHaveBeenCalled();
            });
        });
    });
});
