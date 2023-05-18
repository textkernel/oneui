import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, RenderResult } from '@testing-library/react';
import { SuggestionsList } from '..';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '../../../AutosuggestDeprecated/__mocks__/suggestions';

const noSuggestionsPlaceholder = 'noSuggestionsPlaceholder';
const getItemProps = (props) => ({ disabled: props.disabled });
const highlightedIndex = 1;
const defaultProps = {
    isLoading: false,
    suggestions: SUGGESTIONS,
    suggestionToString: SUGGESTION_TO_STRING,
    noSuggestionsPlaceholder,
    getItemProps,
    highlightedIndex,
};

let view: RenderResult;

beforeEach(() => {
    view = render(<SuggestionsList {...defaultProps} />);
});

const rerenderView = (props) => {
    view.rerender(<SuggestionsList {...defaultProps} {...props} />);
};

describe('SuggestionsList', () => {
    it('should initially render component correctly', () => {
        expect(view.container).toMatchSnapshot();
    });

    it('should render empty component correctly', () => {
        rerenderView({ suggestions: [] });

        expect(screen.getByRole('listitem')).toBeInTheDocument();
    });

    it('should render optimization list correctly', () => {
        rerenderView({ useOptimizeRender: true });

        expect(view.container).toMatchSnapshot();
    });

    it('should render noSuggestions placeholder when empty suggestions list is passed', () => {
        rerenderView({ suggestions: [] });

        expect(screen.getByRole('listitem').textContent).toEqual(noSuggestionsPlaceholder);
    });

    it('should render isLoading state', () => {
        rerenderView({ isLoading: true });

        expect(view.container).toMatchSnapshot();
    });

    it('should run suggestionItemRenderer function correctly', () => {
        const suggestionItemRenderer = () => <span>some item text</span>;
        rerenderView({ suggestionItemRenderer });

        expect(view.container).toMatchSnapshot();
    });

    it('should render mixed suggestions and loading list if requested', () => {
        const suggestionsList = SUGGESTIONS.slice(1, 3);
        rerenderView({
            suggestions: suggestionsList,
            isLoading: true,
            allowMixingSuggestionsAndLoading: true,
        });

        expect(screen.getAllByRole('alert', { name: 'Loading' })).toHaveLength(5);
    });

    it('should interpret disabled items correctly', () => {
        // assuming last item in suggestions is disabled
        expect(screen.getAllByRole('listitem')[0]).not.toHaveClass('ListItem ListItem--disabled');
        expect(screen.getAllByRole('listitem')[9]).toHaveClass('ListItem ListItem--disabled');
    });

    it('should set li for disabled items as such when prop is set', () => {
        rerenderView({ passDisabledToListItems: true });

        // assuming last item in suggestions is disabled
        expect(screen.getAllByRole('listitem')[0]).not.toHaveClass('ListItem ListItem--disabled');
        expect(screen.getAllByRole('listitem')[9]).toHaveClass('ListItem ListItem--disabled');
    });
});
