/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as React from 'react';
import { GetItemPropsOptions } from 'downshift';
import { Text, MarkedText } from '../Text';
import { ListItem } from '../List';

export interface Props {
    /** An array of objects that will be used to render the suggestions list. */
    suggestions: object[];
    /** suggestionToString(suggestion) should return a string to be displayed in the UI. e.g.: suggestion => suggestion.name */
    suggestionToString: (suggestions: object) => string;
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder: string;
    getItemProps: (options: GetItemPropsOptions<object>) => object;
    highlightedIndex: number | null;
    inputValue: string;
}

// @ts-ignore
const SuggestionsList: React.FC<Props> = props => {
    const {
        suggestionToString,
        suggestions,
        noSuggestionsPlaceholder,
        getItemProps,
        highlightedIndex,
        inputValue,
    } = props;

    if (!suggestions || !suggestions.length) {
        return inputValue ? (
            <ListItem disabled>
                <Text context="muted">{noSuggestionsPlaceholder}</Text>
            </ListItem>
        ) : null;
    }

    return suggestions.map((item, index) => (
        <ListItem
            key={suggestionToString(item)}
            {...getItemProps({
                item,
                index,
            })}
            isHighlighted={highlightedIndex === index}
            highlightContext="brand"
        >
            <MarkedText marker={inputValue} inline>
                {suggestionToString(item)}
            </MarkedText>
        </ListItem>
    ));
};

export default SuggestionsList;
