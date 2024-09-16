import * as React from 'react';
// import { bem } from '../../../utils';
// import classnames from '../Separators.scss';

// const { block } = bem('SectionTitleMulti', classnames);

export interface Props<> {
    /** title of the section  */
    title: string;
    /** callback function for the checkbox setting */
    onChangeCheckbox: () => void;
}

const SectionTitleMulti: React.FC<Props> = React.forwardRef(() => <div />);

SectionTitleMulti.displayName = 'SectionTitleMulti';

export { SectionTitleMulti };
