import React from 'react';
import toJson from 'enzyme-to-json';
import { SuggestionsList } from '..';
import { SUGGESTIONS, SUGGESTION_TO_STRING } from '../../../Autosuggest/__mocks__/suggestions';

const noSuggestionsPlaceholder = 'noSuggestionsPlaceholder';
const getItemProps = jest.fn();
const highlightedIndex = 1;

let wrapper;

beforeEach(() => {
    wrapper = mount(
        <SuggestionsList
            suggestions={SUGGESTIONS}
            suggestionToString={SUGGESTION_TO_STRING}
            noSuggestionsPlaceholder={noSuggestionsPlaceholder}
            getItemProps={getItemProps}
            highlightedIndex={highlightedIndex}
        />
    );
});

describe('SuggestionsList', () => {
    it('should initially render empty component correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render empty component correctly when focused', () => {
        wrapper.setProps({ suggestions: [] });
        expect(wrapper.find('li')).toHaveLength(0);
    });
    it('should render noSuggestions placeholder when empty suggestions list is passed', () => {
        wrapper.setProps({ suggestions: [], inputValue: 'test' });

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('li')).toHaveLength(1);
        expect(
            wrapper
                .find('li')
                .childAt(0)
                .text()
        ).toEqual(noSuggestionsPlaceholder);
    });
    it('should render all suggestions from the list', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('li')).toHaveLength(SUGGESTIONS.length);
    });
});
