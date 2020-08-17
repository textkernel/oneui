import * as React from 'react';
// import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { bem } from '../../../utils/bem/bem';
import { SelectBase, BasicSelectProps } from '../SelectBase';
import { SuggestionsList } from '../SuggestionsList';
import styles from './Select.scss';

bem('Select', styles);

interface Props<S> extends BasicSelectProps<S> {
    selectedSuggestion: S;
}

export function Select<S>(props: Props<S>) {
    const { selectedSuggestion, suggestionToString, ...rest } = props;
    return (
        <SelectBase
            {...rest}
            suggestionToString={suggestionToString}
            focusedRenderer={() => suggestionToString(selectedSuggestion)}
            blurredRenderer={() => suggestionToString(selectedSuggestion)}
            listRenderer={(listProps) => <SuggestionsList {...listProps} />}
        />
    );
}

Select.displayName = 'Select';
