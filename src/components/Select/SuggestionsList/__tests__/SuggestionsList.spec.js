import React from 'react';
import toJson from 'enzyme-to-json';
import { render } from 'enzyme';
import { SuggestionsList } from '..';
import { SUGGESTIONS, SUGGESTION_TO_STRING } from '../../../Autosuggest/__mocks__/suggestions';

const noSuggestionsPlaceholder = 'noSuggestionsPlaceholder';
const getItemProps = jest.fn();
const highlightedIndex = 1;
// eslint-disable-next-line react/display-name
const Wrapper = props => (
    <SuggestionsList
        suggestions={SUGGESTIONS}
        suggestionToString={SUGGESTION_TO_STRING}
        noSuggestionsPlaceholder={noSuggestionsPlaceholder}
        getItemProps={getItemProps}
        highlightedIndex={highlightedIndex}
        listOptimizerProps={{
            defaultHeight: 800,
            defaultWidth: 800,
        }}
        {...props}
    />
);

describe('SuggestionsList', () => {
    it('should initially render component correctly', () => {
        const wrapper = render(<Wrapper />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render empty component correctly', () => {
        const wrapper = render(<Wrapper suggestions={[]} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
