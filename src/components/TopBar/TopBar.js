import * as React from 'react';
import PropTypes from 'prop-types';
import { bem } from '../../utils';
import { ContentPlaceholder } from '../ContentPlaceholder';
import { ProgressBar } from '../ProgressBar';
import { Button } from '../Buttons';
import { CONTEXTS } from '../../constants';
import styles from './TopBar.scss';

const { block, elem } = bem('TopBar', styles);

export const TopBar = (props) => {
    const { children, context, isLoading, percentage, count, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            <div {...elem('details', props)}>
                <div {...elem('loader', props)}>
                    {isLoading ? (
                        <ContentPlaceholder
                            height={18}
                            width={Math.floor(Math.random() * 60) + 25}
                            {...elem('contentPlaceholder', props)}
                        />
                    ) : (
                        children
                    )}
                </div>
                {!isLoading && (
                    <Button context="link" {...elem('count', props)}>
                        {count}
                    </Button>
                )}
            </div>
            <ProgressBar
                percentage={isLoading ? 100 : percentage}
                context={isLoading ? null : context}
                small
            />
        </div>
    );
};

TopBar.displayName = 'TopBar';

TopBar.propTypes = {
    context: PropTypes.oneOf(CONTEXTS),
    isLoading: PropTypes.bool,
    children: PropTypes.node,
    percentage: PropTypes.number.isRequired,
    count: PropTypes.number,
};

TopBar.defaultProps = {
    context: 'brand',
    isLoading: false,
    children: null,
    count: null,
};
