import * as React from 'react';
import { MdClose } from 'react-icons/md';
import { bem } from '../../../../utils';
import styles from './SuggestionTag.scss';

const { block, elem } = bem('SuggestionTag', styles);

interface Props {
    /** Defines with behavior for tag */
    width?: 'block' | 'small' | 'auto';
    /** Clicked on delete button */
    onClick?: (e: React.MouseEvent) => void;
    /** Tag content */
    children: NotEmptyReactNode;
}

export const SuggestionTag: React.FC<Props> = ({ width = 'auto', children, onClick, ...rest }) => {
    return (
        <div {...rest} {...block({ [width || 'auto']: true })}>
            <div title={children} {...elem('label')}>
                {children}
            </div>
            {onClick ? (
                <button onClick={onClick} type="button" {...elem('button')}>
                    <MdClose />
                </button>
            ) : null}
        </div>
    );
};

SuggestionTag.displayName = 'SuggestionTag';
