import * as React from 'react';
import { usePrevious } from '../../hooks';

interface Props extends React.HTMLAttributes<HTMLElement> {
    /** Anchor component */
    children: NotEmptySingleReactNode;
    /** indicates if there is a tooltip content or not */
    hasTooltipContent: boolean;
    /** If set to true will show the tooltip regardless of mouse position. When false, will show only on hover */
    alwaysVisible?: boolean;
    /** a function that toggles the visibility state of the tooltip */
    setPopupVisibility: (isOpen: boolean) => void;
    /** ref */
    ref?: React.RefObject<HTMLElement>;
}

export const TooltipAnchor: React.FC<Props> = React.forwardRef((props, ref) => {
    // eslint-disable-next-line react/prop-types
    const { hasTooltipContent, children, alwaysVisible, setPopupVisibility } = props;
    const prevAlwaysVisible = usePrevious(alwaysVisible);

    /** Behavior related to tooltip that is always open */
    React.useEffect(() => {
        if (alwaysVisible) {
            setPopupVisibility(hasTooltipContent);
        } else if (prevAlwaysVisible) {
            setPopupVisibility(false);
        }
    }, [hasTooltipContent, alwaysVisible, prevAlwaysVisible, setPopupVisibility]);

    if (alwaysVisible) {
        return React.isValidElement(children) ? (
            React.cloneElement(children, { ref })
        ) : (
            <span ref={ref}>{children}</span>
        );
    }

    /** Behavior related to tooltip that opens on hover only */
    const mouseOverHandler = () => {
        setPopupVisibility(true);
    };

    const mouseLeaveHandler = () => {
        setPopupVisibility(false);
    };

    const extraProps = {
        onMouseOver: mouseOverHandler,
        onMouseLeave: mouseLeaveHandler,
        ref,
    };

    if (React.isValidElement(children)) {
        return React.cloneElement(children, extraProps);
    }

    return <span {...extraProps}>{children}</span>;
});

TooltipAnchor.displayName = 'TooltipAnchor';

TooltipAnchor.defaultProps = {
    alwaysVisible: false,
    hasTooltipContent: false,
};
