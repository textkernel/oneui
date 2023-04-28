import * as React from 'react';
import { GetItemPropsOptions } from 'downshift';
import { bem } from '../../../utils/bem';
import { ContentPlaceholder } from '../../ContentPlaceholder';
import { Text, MarkedText } from '../../Text';
import { ListOptimizer, ListItem } from '../../List';
import { NUMBER_OF_SUGGESTION_LOADING_PLACEHOLDERS } from '../../../constants';
import styles from './SuggestionsList.scss';

const { elem } = bem('SuggestionsList', styles);

export interface Props<S> {
    /** An array of objects that will be used to render the suggestions list. */
    suggestions: S[];
    /** if suggestions are still loading, i.e. display placeholders */
    isLoading?: boolean;
    /** Enable ListOptimizer component for decreasing render time */
    useOptimizeRender?: boolean;
    /** suggestionToString(suggestion) should return a string to be displayed in the UI. e.g.: suggestion => suggestion.name */
    suggestionToString: (suggestion: S) => string;
    /** suggestionToKey(suggestion) makes a key to be used for a suggestion item */
    suggestionToKey?: (suggestion: S) => string;
    /** render function for suggestion list item. If undefined `suggestionToString` will be used */
    suggestionItemRenderer?: (suggestion: S, index: number, array: S[]) => React.ReactNode;
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder?: string;
    /** Defines if the first item of suggestions list is always visible */
    allowMixingSuggestionsAndLoading?: boolean;
    /** a function which gets props for the item in the list */
    getItemProps: (options: GetItemPropsOptions<S>) => object;
    /** index of the item from the list to be highlighted */
    highlightedIndex: number | null;
    /** input field value to be highlighted in the item from the list */
    inputValue: string;
    /** In some cases you need to pass disabled attributes to the top level 'li' od each item
     * e.g. in the context of downshift to disable keyboard navigation on these items
     */
    passDisabledToListItems?: boolean;
}

export function SuggestionsList<S>({
    suggestionToString,
    useOptimizeRender = false,
    suggestions,
    isLoading = false,
    allowMixingSuggestionsAndLoading = false,
    noSuggestionsPlaceholder = '',
    getItemProps,
    highlightedIndex,
    suggestionToKey,
    suggestionItemRenderer,
    inputValue = '',
    passDisabledToListItems = false,
}: Props<S>) {
    // eslint-disable-next-line react/display-name
    const renderItem = ({ key, index, style = {} }) => {
        const currentItem = suggestions[index];
        let disabled = false;
        if (typeof currentItem === 'object' && currentItem !== null && 'disabled' in currentItem) {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            disabled = currentItem['disabled']; // TS only happy with this syntax
        }

        return (
            <ListItem
                key={key}
                style={style}
                {...getItemProps({
                    item: currentItem,
                    index,
                    disabled,
                })}
                isHighlighted={highlightedIndex === index}
                passDisabledToLi={passDisabledToListItems}
            >
                {suggestionItemRenderer ? (
                    suggestionItemRenderer(currentItem, index, suggestions)
                ) : (
                    <MarkedText marker={inputValue} inline>
                        {suggestionToString(currentItem)}
                    </MarkedText>
                )}
            </ListItem>
        );
    };

    // eslint-disable-next-line react/display-name
    const renderLoadingPlaceholders = () =>
        Array(NUMBER_OF_SUGGESTION_LOADING_PLACEHOLDERS)
            .fill('')
            .map((el, i) => {
                return (
                    // eslint-disable-next-line react/no-array-index-key
                    <ListItem key={i}>
                        <div {...elem('loaderItem')} role="listitem">
                            <ContentPlaceholder />
                        </div>
                    </ListItem>
                );
            });

    // eslint-disable-next-line react/display-name
    const renderSuggestionsList = () => (
        <>
            {useOptimizeRender ? (
                <div {...elem('optimizerWrapper')}>
                    <ListOptimizer rowCount={suggestions.length}>{renderItem}</ListOptimizer>
                </div>
            ) : (
                <>
                    {suggestions.map((item, index) => {
                        const key = suggestionToKey
                            ? suggestionToKey(item)
                            : suggestionToString(item);
                        return renderItem({ key, index });
                    })}
                </>
            )}
        </>
    );

    if (isLoading) {
        if (!allowMixingSuggestionsAndLoading || !suggestions || !suggestions.length) {
            return <>{renderLoadingPlaceholders()}</>;
        }

        return (
            <>
                {renderSuggestionsList()}
                {renderLoadingPlaceholders()}
            </>
        );
    }

    if (!suggestions || !suggestions.length) {
        if (noSuggestionsPlaceholder) {
            return (
                <ListItem disabled>
                    <Text context="neutral">{noSuggestionsPlaceholder}</Text>
                </ListItem>
            );
        }
        return null;
    }

    return renderSuggestionsList();
}

SuggestionsList.displayName = 'SuggestionsList';
