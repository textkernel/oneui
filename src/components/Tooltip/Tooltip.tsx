import * as React from 'react';
import { PopupPlacement } from '../../constants';
import PopupBase from '../PopupBase';
import styles from './Tooltip.scss';
import bem from '../../utils/bem';

const { elem } = bem('Tooltip', styles);

interface Props {
    children: React.ReactElement | string;
    content: React.ReactElement | string;
    placement?: PopupPlacement;
}

const Tooltip: React.FC<Props> = props => {
    const { placement, content, children } = props;

    const createMouseEnterHandler = setPopupVisibility => () => {
        setPopupVisibility(true);
    };

    const createMouseLeaveHandler = setPopupVisibility => () => {
        setPopupVisibility(false);
    };

    const renderAnchor = ({ setPopupVisibility }) => (
        <div
            onMouseEnter={createMouseEnterHandler(setPopupVisibility)}
            onMouseLeave={createMouseLeaveHandler(setPopupVisibility)}
        >
            {children}
        </div>
    );

    const renderPopup = () => (
        <div>
            <div {...elem('container', props)}>
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
