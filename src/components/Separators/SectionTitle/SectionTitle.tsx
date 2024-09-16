import * as React from 'react';
// import { bem } from '../../../utils';
// import classnames from '../Separators.scss';

// const { block } = bem('SectionTitle', classnames);

export interface Props<> {
    /** title of the section: required  */
    title: string;
}

const SectionTitle: React.FC<Props> = React.forwardRef(() => <div />);

SectionTitle.displayName = 'SectionTitle';

export { SectionTitle };
