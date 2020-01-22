import * as React from 'react';
import { bem } from '../../utils/bem';
import { BlockWidthRestrictor, BlockWidthRestrictorProps } from '../WidthRestrictor';
import { LeftPaneProps } from './LeftPane';
import { RightPane, RightPaneProps } from './RightPane';
import styles from './TwoPaneView.scss';

interface Props extends Omit<BlockWidthRestrictorProps, 'children'> {
    /** 2 nodes to be rendered in the left and right pane */
    children: [React.ReactElement<LeftPaneProps>, React.ReactElement<RightPaneProps>];
}

const { block } = bem('TwoPaneView', styles);

export const TwoPaneView: React.FC<Props> = props => {
    const { children, ...rest } = props;

    const [rightTop, setRightTop] = React.useState(0);
    const [rightHeight, setRightHeight] = React.useState(200);
    const [rightWidth, setRightWidth] = React.useState(600);
    const [doDisplayRightPane, setDoDisplayRightPane] = React.useState(true);

    const leftRef: React.Ref<HTMLDivElement> = React.createRef();
    const blockRef: React.Ref<HTMLDivElement> = React.createRef();

    const handleScroll = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        e: Event | null = null,
        leftEl: HTMLDivElement | null = leftRef.current
    ) => {
        if (!leftEl) {
            return;
        }

        const leftDimensions = leftEl.getBoundingClientRect();
        const top = leftDimensions.top > 0 ? 0 : -leftDimensions.top;

        const height =
            Math.min(window.innerHeight, leftDimensions.bottom) - Math.max(leftDimensions.top, 0);

        const doDisplay = leftDimensions.bottom > 0;

        setRightTop(top);
        setRightHeight(height);
        setDoDisplayRightPane(doDisplay);
    };

    const handleResize = (e: Event | null = null) => {
        const blockEl = blockRef.current;
        if (!blockEl) {
            return;
        }

        const { width: fullWidth } = blockEl.getBoundingClientRect();
        const blockStyle = window.getComputedStyle(blockEl, null);
        const paddingRight = parseInt(blockStyle.getPropertyValue('padding-right'), 10);
        const paddingLeft = parseInt(blockStyle.getPropertyValue('padding-left'), 10);

        const leftEl = leftRef.current;
        if (!leftEl) return;
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
                if (React.isValidElement(child)) {
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
