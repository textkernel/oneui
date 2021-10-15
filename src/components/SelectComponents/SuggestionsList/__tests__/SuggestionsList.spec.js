import React from 'react';
import toJson from 'enzyme-to-json';
import { SuggestionsList } from '..';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '../../../AutosuggestDeprecated/__mocks__/suggestions';

const noSuggestionsPlaceholder = 'noSuggestionsPlaceholder';
const getItemProps = (props) => ({ disabled: props.disabled });
const highlightedIndex = 1;

let wrapper;

beforeEach(() => {
    wrapper = mount(
        <SuggestionsList
            isLoading={false}
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
    it('should render isLoading state', () => {
        wrapper.setProps({ isLoading: true });
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should run suggestionItemRenderer function correctly', () => {
        // eslint-disable-next-line react/display-name
        const suggestionItemRenderer = () => <span>some item text</span>;
        wrapper.setProps({ suggestionItemRenderer });
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render mixed suggestions and loading list if requested', () => {
        const suggestionsList = SUGGESTIONS.slice(1, 3);
        wrapper.setProps({
            suggestions: suggestionsList,
            isLoading: true,
            allowMixingSuggestionsAndLoading: true,
        });

        expect(wrapper.find('ListItem')).toHaveLength(7);
        expect(wrapper.find('.SuggestionsList__loaderItem')).toHaveLength(5);
    });
    it('should interpret disabled items correctly', () => {
        // assuming last item in suggestions is disabled
        expect(wrapper.find('ListItem').first().prop('disabled')).toBeFalsy();
        expect(wrapper.find('ListItem').last().prop('disabled')).toBeTruthy();
    });
    it('should set li for disabled items as such when prop is set', () => {
        wrapper.setProps({ passDisabledToListItems: true });
        // assuming last item in suggestions is disabled
        expect(wrapper.find('li').first().prop('disabled')).toBeFalsy();
        expect(wrapper.find('li').last().prop('disabled')).toBeTruthy();
    });
});
