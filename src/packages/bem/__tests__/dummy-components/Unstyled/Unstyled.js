import React from 'react';
import bem from '../../..';
// import styles from './styles.json';

const { block, elem } = bem({
    name: 'Unstyled',
    classnames: {},
});

const Unstyled = props => {
    const { children } = props;
    return (
        <div {...block(props)}>
            {React.Children.map(children, child =>
                child ? React.cloneElement(child, elem('item', props, child.props.className)) : null
            )}
        </div>
    );
};

Unstyled.displayName = 'Unstyled';

export default Unstyled;
