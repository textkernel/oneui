import { GetItemPropsOptions, GetToggleButtonPropsOptions } from 'downshift';
import { Props as ListRendererProps } from '../SuggestionsList/SuggestionsList';

export interface CommonProps<S> extends React.HTMLAttributes<HTMLDivElement> {
    /** an array of objects that will be used to render the suggestions list. */
    suggestions: S[];
    /** suggestionToString(suggestion) should return a string to be displayed in the UI. e.g.: suggestion => suggestion.name */
    suggestionToString: (suggestions?: S | null) => string;
    /** input field ref */
    inputRef?: React.RefObject<HTMLInputElement>;
    /** root wrapper ref */
    rootRef?: React.RefObject<HTMLDivElement>;
    /** suggestions list ref */
    listRef?: React.RefObject<HTMLUListElement>;
    /** onBlur() is called when the component is blurred */
    onBlur?: () => void;
    /** onSelectionChange() called when a suggestion is selected or removed */
    onSelectionChange: (item: S) => void;
    /** onInputValueChange(inputValue) called when the input values is changed. Can be used to implement the component as controlled component */
    onInputValueChange: (value: string) => void;
}

export interface CommonPropsWithClear<S> extends CommonProps<S> {
    /** to be shown as clear button title */
    clearTitle?: string;
    /** function to be called if FieldWrapper clear button is clicked */
    onClearAllSelected?: () => void;
    /** show Clear button on hover even if there are no selectedSuggestions passed */
    showClearButton?: boolean;
}

export interface Props<S> extends CommonPropsWithClear<S> {
    keepExpandedAfterSelection?: boolean;
    /** will be called when list of suggestions should be rendered */
    listRenderer: (props: Omit<ListRendererProps<S>, 'noSuggestionsPlaceholder'>) => ReactNode;
    /** a function that renders the top part of the component when it is focused  */
    focusedRenderer: (helpers: {
        getInputProps: (options: GetItemPropsOptions<S>) => object;
        getToggleButtonProps: (options: GetToggleButtonPropsOptions) => object;
        onBlur: () => void;
        inputValue: string;
    }) => ReactNode;
    /** a function that renders the top part of the component when it is blurred  */
    blurredRenderer: (helpers: {
        getInputProps: (options: GetItemPropsOptions<S>) => object;
        getToggleButtonProps: (options: GetToggleButtonPropsOptions) => object;
    }) => ReactNode;
}
