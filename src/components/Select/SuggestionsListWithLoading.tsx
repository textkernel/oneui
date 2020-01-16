import * as React from 'react';
import bem from '../../utils/bem';
import { ListItem } from '../List';
import ContentPlaceholder from '../ContentPlaceholder';
import SuggestionsList, { Props as SuggestionsListProps } from './SuggestionsList';
import { NUMBER_OF_SUGGESTION_LOADING_PLACEHOLDERS } from '../../constants';
import styles from './SelectBase.scss';

interface Props<S> extends SuggestionsListProps<S> {
    isLoading: boolean;
}

const { elem } = bem('SuggestionsListWithLoading', styles);

function SuggestionsListWithLoading<S>(props: Props<S>) {
    const { isLoading } = props;

    if (isLoading) {
        // <> is needed because of https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356
        return (
            <>
                {new Array(NUMBER_OF_SUGGESTION_LOADING_PLACEHOLDERS).fill('').map((el, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <ListItem key={i}>
                        <div {...elem('loaderContainer', props)}>
                            <ContentPlaceholder />
                        </div>
                    </ListItem>
                ))}
            </>
        );
    }

    return <SuggestionsList {...props} />;
}

SuggestionsListWithLoading.displayName = 'SuggestionsListWithLoading';

export default SuggestionsListWithLoading;
