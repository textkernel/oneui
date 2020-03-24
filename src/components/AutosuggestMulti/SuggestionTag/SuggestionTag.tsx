import * as React from 'react';
import { MdClose } from 'react-icons/md';
import { bem } from '../../../utils';
import styles from './SuggestionTag.scss';

const { block, elem } = bem('SuggestionTag', styles);

type Props = {
    /** Tag Stretches on full width */
    isStretched?: boolean;
    /** Tag has restricted width */
    isBounded?: boolean;
    /** Clicked on delete button */
    onClick?: (e: React.MouseEvent) => void;
    /** Tag content */
    children: NotEmptyReactNode;
};

export const SuggestionTag: React.FC<Props> = props => {
    const { children, isBounded, isStretched, onClick, ...rest } = props;

    return (
        <div {...rest} {...block({ isBounded, isStretched })}>
            <span title={children} {...elem('label')}>
                {children}
            </span>
            {onClick ? (
                <button onClick={onClick} type="button" {...elem('button')}>
                    <MdClose />
                </button>
            ) : null}
        </div>
    );
};

SuggestionTag.displayName = 'SuggestionTag';
