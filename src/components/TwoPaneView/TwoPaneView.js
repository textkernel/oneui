import React from 'react';
import bem from 'bem';
import { BlockWidthRestrictor } from '../../index';
import LeftPane from './LeftPane';
import RightPane from './RightPane';
import styles from './TwoPaneView.scss';

const isNotPane = element => element && element.type !== RightPane && element.type !== LeftPane;

const { block } = bem({
    name: 'TwoPaneView',
    classnames: styles,
});

const TwoPaneView = props => {
    const { children, ...rest } = props;

    const [rightTop, setRightTop] = React.useState(0);
    const [rightHeight, setRightHeight] = React.useState(200);
    const [rightWidth, setRightWidth] = React.useState(600);
    const [doDisplayRightPane, setDoDisplayRightPane] = React.useState(true);

    const leftRef = React.createRef();
    const blockRef = React.createRef();

    const handleScroll = (e, leftEl = leftRef.current) => {
        const leftDimensions = leftEl.getBoundingClientRect();
        const top = leftDimensions.top > 0 ? 0 : -leftDimensions.top;

        const height =
            Math.min(window.innerHeight, leftDimensions.bottom) - Math.max(leftDimensions.top, 0);

        const doDisplay = leftDimensions.bottom > 0;

        setRightTop(top);
        setRightHeight(height);
        setDoDisplayRightPane(doDisplay);
    };

    const handleResize = e => {
        const blockEl = blockRef.current;
        const { width: fullWidth } = blockEl.getBoundingClientRect();
        const blockStyle = window.getComputedStyle(blockEl, null);
        const paddingRight = parseInt(blockStyle.getPropertyValue('padding-right'), 10);
        const paddingLeft = parseInt(blockStyle.getPropertyValue('padding-left'), 10);

        const leftEl = leftRef.current;
        const { width: leftWidth } = leftEl.getBoundingClientRect();

        const width = fullWidth - paddingRight - paddingLeft - leftWidth;

        setRightWidth(width);
        handleScroll(e, leftEl);
    };

    React.useLayoutEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    React.useLayoutEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    });

    return (
        <BlockWidthRestrictor {...rest} ref={blockRef} {...block(props)}>
            {React.Children.map(children, child => {
                if (child) {
                    const childStyle = child.props.style;
                    return child.type === RightPane
                        ? React.cloneElement(child, {
                              style: {
                                  ...childStyle,
                                  top: rightTop,
                                  height: rightHeight,
                                  width: rightWidth,
                                  display: doDisplayRightPane ? 'inline-block' : 'none',
                              },
                          })
                        : React.cloneElement(child, {
                              ref: leftRef,
                          });
                }
                return null;
            })}
        </BlockWidthRestrictor>
    );
};

TwoPaneView.displayName = 'TwoPaneView';

TwoPaneView.propTypes = {
    /** 2 nodes to be rendered in the left and right pane */
    children: (props, propName, componentName) => {
        const prop = props[propName];

        let error = null;
        React.Children.forEach(prop, child => {
            if (isNotPane(child)) {
                error = new Error(
                    `'${componentName}' children should be of type 'RightPane' or 'LeftPane'.`
                );
            }
        });
        return error;
    },
};

TwoPaneView.defaultProps = {
    children: null,
};

export default TwoPaneView;
