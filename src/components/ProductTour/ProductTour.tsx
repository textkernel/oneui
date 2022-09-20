import * as React from 'react';
import { bem } from '../../utils';
import { ENTER_KEY } from '../../constants';
import { Button } from '../Buttons';
import { Checkbox } from '../Checkbox';
import { Modal, ModalProps } from '../Modal';
import styles from './ProductTour.scss';

export interface Props extends ModalProps {
    /** Should the tour be shown */
    isOpen: boolean;
    /** An array of ReactElement where each element is one slide */
    children: React.ReactElement | React.ReactElement[];
    /** The label for the checkbox. If undefined or empty, checkbox will not be shown */
    checkboxLabel?: string;
    /** Cancel button label - required if there is more then 1 slide */
    cancelLabel?: string;
    /** Continue button label - required if there is more then 1 slide */
    continueLabel?: string;
    /** Finish button label */
    finishLabel: string;
    /** A callback if the user clicked the Cancel button without finishing the tour */
    onCancel?: (isChecked?: boolean) => void;
    /** A callback if the user clicked the Finish button */
    onFinished: (isChecked?: boolean) => void;
}

const { block, elem } = bem('ProductTour', styles);

export const ProductTour: React.FC<Props> = (props) => {
    const {
        isOpen,
        children,
        checkboxLabel,
        cancelLabel = '',
        continueLabel = '',
        finishLabel,
        onCancel,
        onFinished,
        ...rest
    } = props;

    /** index for currently shown slide; 0 indexed */
    const [currentSlide, setCurrentSlide] = React.useState(0);
    /** state of the checkbox */
    const [isChecked, setIsChecked] = React.useState(false);
    const nOfSlides = React.Children.count(children);

    if (nOfSlides > 1 && (!cancelLabel || !continueLabel)) {
        // eslint-disable-next-line no-console
        console.warn(
            'ProductTour component was called with incomplete props. When there are 2 or more slides in the tour, you need to include both `cancelLabel` and `continueLabel` as props'
        );
    }

    const isLastSlide = currentSlide === nOfSlides - 1;

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    const handleDotClick = (i: number) => {
        setCurrentSlide(i);
    };

    const handleDotKeyDown = (e: React.KeyboardEvent<HTMLElement>, i: number) => {
        if (e.key === ENTER_KEY) {
            handleDotClick(i);
        }
    };

    const handleCancel = () => {
        onCancel?.(isChecked);
    };

    const handleNext = () => {
        setCurrentSlide(currentSlide + 1);
    };

    const handleFinish = () => {
        onFinished(isChecked);
    };

    const handledOverlayClick = () => {
        if (isLastSlide) {
            handleFinish();
        } else {
            handleCancel();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            isPositionFixed
            {...rest}
            {...block()}
            onRequestClose={handledOverlayClick}
        >
            <section {...elem('slide')}>
                {nOfSlides === 1 ? children : children[currentSlide]}
            </section>
            <div {...elem('footer')}>
                <div {...elem('checkbox')}>
                    {checkboxLabel && (
                        <Checkbox id="hide" checked={isChecked} onChange={handleCheckboxClick}>
                            {checkboxLabel}
                        </Checkbox>
                    )}
                </div>
                {nOfSlides > 1 && (
                    <div>
                        {[...Array(nOfSlides)].map((v, i) => {
                            const isNotActive = i !== currentSlide;
                            return (
                                <div
                                    key={i} // eslint-disable-line react/no-array-index-key
                                    role="button"
                                    tabIndex={isNotActive ? 0 : undefined}
                                    onClick={isNotActive ? () => handleDotClick(i) : undefined}
                                    onKeyDown={
                                        isNotActive ? (e) => handleDotKeyDown(e, i) : undefined
                                    }
                                    {...elem('dot', { isActive: !isNotActive })}
                                />
                            );
                        })}
                    </div>
                )}
                <div {...elem('buttons')}>
                    {isLastSlide ? (
                        <Button context="primary" onClick={handleFinish}>
                            {finishLabel}
                        </Button>
                    ) : (
                        <>
                            <Button context="link" onClick={handleCancel}>
                                {cancelLabel}
                            </Button>
                            <Button context="primary" onClick={handleNext}>
                                {continueLabel}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
};

ProductTour.displayName = 'ProductTour';

ProductTour.defaultProps = {
    isOpen: false,
};
