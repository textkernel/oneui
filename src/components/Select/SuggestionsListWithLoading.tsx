/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as React from 'react';
import bem from '../../utils/bem';
import { ListItem } from '../List';
import ContentPlaceholder from '../ContentPlaceholder';
import SuggestionsList, { Props as SuggestionsListProps } from './SuggestionsList';
import { NUMBER_OF_SUGGESTION_LOADING_PLACEHOLDERS } from '../../constants';
import styles from './SelectBase.scss';

interface Props extends SuggestionsListProps {
    isLoading: boolean;
}

const { elem } = bem('SuggestionsListWithLoading', styles);

// @ts-ignore
const SuggestionsListWithLoading: React.FC<Props> = props => {
    const { isLoading } = props;

    if (isLoading) {
        return new Array(NUMBER_OF_SUGGESTION_LOADING_PLACEHOLDERS).fill('').map((el, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem key={i}>
                <div {...elem('loaderContainer', props)}>
                    <ContentPlaceholder />
                </div>
            </ListItem>
        ));
    }

    return <SuggestionsList {...props} />;
};

SuggestionsListWithLoading.displayName = 'SuggestionsListWithLoading';

export default SuggestionsListWithLoading;
