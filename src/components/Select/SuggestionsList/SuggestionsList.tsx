import * as React from 'react';
import { GetItemPropsOptions } from 'downshift';
import { bem } from '../../../utils/bem';
import { Text, MarkedText } from '../../Text';
import { ListOptimizer, ListItem } from '../../List';
import styles from './SuggestionsList.scss';

const { elem } = bem('SuggestionsList', styles);

export interface Props<S> {
    /** An array of objects that will be used to render the suggestions list. */
    suggestions: S[];
    /** Enable ListOptimizer component for decreasing render time */
    useOptimizeRender?: boolean;
    /** suggestionToString(suggestion) should return a string to be displayed in the UI. e.g.: suggestion => suggestion.name */
    suggestionToString: (suggestions: S) => string;
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder?: string;
    /** a function which gets props for the item in the list */
    getItemProps: (options: GetItemPropsOptions<S>) => object;
    /** index of the item from the list to be highlighted */
    highlightedIndex: number | null;
    /** input field value to be highlighted in the item from the list */
    inputValue: string;
}

export function SuggestionsList<S>(props: Props<S>) {
    const {
        suggestionToString,
        useOptimizeRender,
        suggestions,
        noSuggestionsPlaceholder,
        getItemProps,
        highlightedIndex,
        inputValue,
    } = props;

    if (noSuggestionsPlaceholder && (!suggestions || !suggestions.length)) {
        return (
            <ListItem disabled>
                <Text context="muted">{noSuggestionsPlaceholder}</Text>
            </ListItem>
        );
    }

    // eslint-disable-next-line react/display-name
    const renderItem = ({ key, index, style = {} }) => (
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
    );

    return (
        <>
            {useOptimizeRender ? (
                <div {...elem('optimizerWrapper')}>
                    <ListOptimizer rowCount={suggestions.length}>{renderItem}</ListOptimizer>
                </div>
            ) : (
                <>
                    {suggestions.map((item, index) => {
                        const key = suggestionToString(item);
                        return renderItem({ key, index });
                    })}
                </>
            )}
        </>
    );
}

SuggestionsList.defaultProps = {
    noSuggestionsPlaceholder: '',
    useOptimizeRender: false,
};

SuggestionsList.displayName = 'SuggestionsList';
