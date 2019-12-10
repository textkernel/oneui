import * as React from 'react';
import { PopupPlacement } from '../../constants';
import PopupBase from '../PopupBase';
import styles from './Tooltip.scss';
import bem from '../../utils/bem';

const { block, elem } = bem('Tooltip', styles);

interface Props extends React.HTMLAttributes<HTMLElement> {
    /** Anchor component */
    children: NotEmptySingleReactNode;
    /** Popup component */
    content: NotEmptySingleReactNode;
    /** Placement of the popup dialog relative to anchor */
    placement?: PopupPlacement;
}

const Tooltip: React.FC<Props> = props => {
    const { placement, content, children, ...rest } = props;

    const createMouseOverHandler = setPopupVisibility => () => {
        setPopupVisibility(true);
    };

    const createMouseLeaveHandler = setPopupVisibility => () => {
        setPopupVisibility(false);
    };

    const renderAnchor = ({ setPopupVisibility }) => {
        const mouseEventHandlers = {
            onMouseOver: createMouseOverHandler(setPopupVisibility),
            onMouseLeave: createMouseLeaveHandler(setPopupVisibility),
        };

        if (React.isValidElement(children)) {
            return React.cloneElement(children, mouseEventHandlers);
        }

        return <span {...mouseEventHandlers}>{children}</span>;
    };

    const renderPopup = () => (
        <div>
            <div {...rest} {...block(props)}>
                {content}
                <div {...elem('arrow', props)} />
            </div>
        </div>
    );

    return (
        <PopupBase
            anchorRenderer={renderAnchor}
            popupRenderer={renderPopup}
            placement={placement}
        />
    );
};

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
    placement: 'bottom',
};

export default Tooltip;
