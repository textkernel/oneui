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
    it('should initially render component correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render empty component correctly', () => {
        wrapper.setProps({ suggestions: [] });
        expect(wrapper.find('li')).toHaveLength(1);
    });
    it('should render optimization list correctly', () => {
        wrapper.setProps({ useOptimizeRender: true });
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render noSuggestions placeholder when empty suggestions list is passed', () => {
        wrapper.setProps({ suggestions: [] });

        expect(wrapper.find('li').childAt(0).text()).toEqual(noSuggestionsPlaceholder);
    });
});
