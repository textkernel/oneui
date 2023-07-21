import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AutosuggestDeprecated } from '../AutosuggestDeprecated';
import { SUGGESTION_TO_STRING, SuggestionsType } from '../__mocks__/suggestions';

describe('AutosuggestDeprecated', () => {
    const suggestionToString = SUGGESTION_TO_STRING;
    const selectedPlaceholder = '';
    const inputPlaceholder = 'type here...';
    const defaultInputValue = 'default value';
    const noSuggestionsPlaceholder = 'No suggestions...';
    const clearTitle = 'Clear';
    const mockOnSelectionChange = jest.fn();
    const mockOnInputValueChange = jest.fn();
    const mockOnClearAllSelected = jest.fn();
    const mockOnBlur = jest.fn();

    let suggestionsList: SuggestionsType[] = [];
    const getSuggestions = () => suggestionsList;
    let selectedSuggestions: SuggestionsType[] = [];

    let view: RenderResult;

    const setFocusOnInput = async (user) => {
        await user.click(screen.getByRole('textbox'));
    };

    beforeEach(() => {
        view = render(
            <AutosuggestDeprecated
                selectedSuggestions={selectedSuggestions}
                getSuggestions={getSuggestions}
                suggestionToString={suggestionToString}
                selectedPlaceholder={selectedPlaceholder}
                inputPlaceholder={inputPlaceholder}
                clearTitle={clearTitle}
                noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                onSelectionChange={mockOnSelectionChange}
                onInputValueChange={mockOnInputValueChange}
                onBlur={mockOnBlur}
                onClearAllSelected={mockOnClearAllSelected}
                showClearButton
            />
        );
    });

    afterEach(() => {
        suggestionsList = [];
        selectedSuggestions = [];
    });

    describe('rendering', () => {
        it('should initially render empty component correctly', () => {
            expect(view.container).toMatchSnapshot();
        });

        it('should render a component with default value', () => {
            view = render(
                <AutosuggestDeprecated
                    selectedSuggestions={selectedSuggestions}
                    getSuggestions={getSuggestions}
                    suggestionToString={suggestionToString}
                    selectedPlaceholder={selectedPlaceholder}
                    inputPlaceholder={inputPlaceholder}
                    defaultInputValue={defaultInputValue}
                    clearTitle={clearTitle}
                    noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                    onSelectionChange={mockOnSelectionChange}
                    onInputValueChange={mockOnInputValueChange}
                    onBlur={mockOnBlur}
                    onClearAllSelected={mockOnClearAllSelected}
                    showClearButton
                />
            );
            expect(screen.getAllByRole('textbox')[1]).toHaveAttribute('value', defaultInputValue);
        });

        it('should render empty component correctly when focused', async () => {
            const user = userEvent.setup();
            await setFocusOnInput(user);
            expect(screen.getByRole('combobox')).toHaveClass(
                'AutosuggestDeprecated__main AutosuggestDeprecated__main--focused'
            );
            expect(screen.getByRole('searchbox')).toHaveClass(
                'AutosuggestDeprecated__wrapper AutosuggestDeprecated__wrapper--focused'
            );
        });
    });
});
