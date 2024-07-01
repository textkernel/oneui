import * as React from 'react';
import ExpandIcon from '@material-design-icons/svg/round/expand_more.svg';
import { bem } from '../../utils';
import styles from './ExpandableText.scss';
import { Button } from '../Buttons';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** The content of the block */
    children: React.ReactNode;
    /** The maximum number of lines to be shown when displaying the text in collapsed mode  */
    threshold?: number;
    /** Label for the button when the element is collapsed */
    showMoreButtonLabel: string;
    /** Label for the button when the element is expanded */
    showLessButtonLabel: string;
}

const { block, elem } = bem('ExpandableText', styles);

export const ExpandableText = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { children, threshold = 5, showMoreButtonLabel, showLessButtonLabel, ...rest } = props;
    const contentRef = React.createRef<HTMLDivElement>();
    const [isExpandable, setIsExpandable] = React.useState(false);
    const [isCollapsed, setIsCollapsed] = React.useState(true);

    const collapsedHeight = `calc(var(--line-height-normal) * ${threshold})`;

    // After first render determine if the text is longer or not then the maximum allowed
    React.useLayoutEffect(() => {
        if (!isExpandable && contentRef.current) {
            contentRef.current.style.maxHeight = collapsedHeight;

            if (contentRef.current.scrollHeight > contentRef.current.clientHeight) {
                setIsExpandable(true);
                contentRef.current.style.height = collapsedHeight;
                contentRef.current.style.maxHeight = 'initial';
            }
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const collapseSection = () => {
        if (!contentRef.current) {
            return;
        }

        contentRef.current.style.height = collapsedHeight;
    };

    const expandSection = () => {
        if (!contentRef.current) {
            return;
        }

        const sectionHeight = contentRef.current.scrollHeight;
        contentRef.current.style.height = `${sectionHeight}px`;
    };

    const handleToggleClick = () => {
        if (isCollapsed) {
            expandSection();
        } else {
            collapseSection();
        }
        setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
    };

    return (
        <div ref={ref} {...rest} {...block(props)}>
            <div ref={contentRef} {...elem('content')}>
                {children}
            </div>
            {isExpandable && (
                <Button isLink isInline onClick={handleToggleClick} {...elem('button')}>
                    {isCollapsed ? showMoreButtonLabel : showLessButtonLabel}
                    <ExpandIcon {...elem('buttonArrow', { isCollapsed })} />
                </Button>
            )}
        </div>
    );
});

ExpandableText.displayName = 'ExpandableText';
