import React from 'react';
import bem from '../../..';

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
