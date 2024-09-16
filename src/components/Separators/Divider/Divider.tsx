import * as React from 'react';
import { bem } from '../../../utils';
import classnames from '../Separators.scss';

const { block } = bem('Divider', classnames);

const Divider = () => <div {...block()} />;

Divider.displayName = 'Divider';

export { Divider };
