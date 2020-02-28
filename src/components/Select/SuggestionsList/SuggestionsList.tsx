import * as React from 'react';
import { GetItemPropsOptions } from 'downshift';
import { Text, MarkedText } from '../../Text';
import { ListOptimizer, ListItem } from '../../List';

export interface Props<S> {
    /** An array of objects that will be used to render the suggestions list. */
    suggestions: S[];
    /** suggestionToString(suggestion) should return a string to be displayed in the UI. e.g.: suggestion => suggestion.name */
    suggestionToString: (suggestions: S) => string;
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder: string;
    /** a function which gets props for the item in the list */
    getItemProps: (options: GetItemPropsOptions<S>) => object;
    /** index of the item from the list to be highlighted */
    highlightedIndex: number | null;
    /** input field value to be highlighted in the item from the list */
    inputValue: string;
    /** props for configuration ListOptimizer component */
    listOptimizerProps?: object;
}

export function SuggestionsList<S>(props: Props<S>) {
    const {
        suggestionToString,
        suggestions,
        noSuggestionsPlaceholder,
        getItemProps,
        highlightedIndex,
        inputValue,
        listOptimizerProps,
    } = props;

    if (!suggestions || !suggestions.length) {
        return (
            <ListItem disabled>
                <Text context="muted">{noSuggestionsPlaceholder}</Text>
            </ListItem>
        );
    }

    return (
        <ListOptimizer {...listOptimizerProps} rowCount={suggestions.length}>
            {({ key, index, style }) => (
                <ListItem
                    key={key}
                    style={style}
                    {...getItemProps({
                        item: suggestions[index],
                        index,
                    })}
                    isHighlighted={highlightedIndex === index}
                    highlightContext="brand"
                >
                    <MarkedText marker={inputValue} inline>
                        {suggestionToString(suggestions[index])}
                    </MarkedText>
                </ListItem>
            )}
        </ListOptimizer>
    );
}

SuggestionsList.displayName = 'SuggestionsList';
