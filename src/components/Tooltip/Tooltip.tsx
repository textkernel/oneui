import * as React from 'react';
import { PopupPlacement } from '../../constants';
import { PopupBase } from '../PopupBase';
import { TooltipAnchor } from './TooltipAnchor';
import styles from './Tooltip.scss';
import { bem } from '../../utils';

const { block, elem } = bem('Tooltip', styles);

interface Props extends React.HTMLAttributes<HTMLElement> {
    /** Anchor component */
    children: NotEmptySingleReactNode;
    /** Popup component */
    content?: SingleReactNode;
    /** Placement of the popup dialog relative to anchor */
    placement?: PopupPlacement;
    /** If set to true will show the tooltip regardless of mouse position. When false, will show only on hover */
    alwaysVisible?: boolean;
}

export const Tooltip: React.FC<Props> = props => {
    // eslint-disable-next-line react/prop-types
    const { placement, content, children, alwaysVisible, ...rest } = props;

    // eslint-disable-next-line react/display-name
    const renderAnchor = ({ setPopupVisibility }) => (
        <TooltipAnchor
            alwaysVisible={alwaysVisible}
            hasTooltipContent={!!content}
            setPopupVisibility={setPopupVisibility}
        >
            {children}
        </TooltipAnchor>
    );

    // eslint-disable-next-line react/display-name
    const renderPopup = () =>
        content ? (
            <div>
                <div {...rest} {...block(props)}>
                    {content}
                    <div {...elem('arrow', props)} />
                </div>
            </div>
        ) : null;

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
    alwaysVisible: false,
};
