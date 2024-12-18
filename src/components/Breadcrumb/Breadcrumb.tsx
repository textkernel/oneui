import React from 'react';
import { bem } from '../../utils';
import styles from './Breadcrumb.scss';

export interface Path {
    href: string;
    label?: string;
    icon?: React.ReactElement;
}

export interface Props extends React.ComponentPropsWithoutRef<'nav'> {
    /** Paths used for creation of different breadcrumb links */
    paths: Path[];
    /** Custom link renderer to allow any router implementation */
    linkRenderer?: (path: Path) => React.ReactElement;
}

const { block, elem } = bem('Breadcrumb', styles);

const Breadcrumb = React.forwardRef<HTMLElement, Props>(
    (
        { paths, linkRenderer = (path: Path) => <a href={path.href}>{path.label}</a>, ...rest },
        ref
    ) => (
        <nav {...block(rest)} {...rest} ref={ref}>
            <ol {...elem('list')}>
                {paths.map((path, index) => {
                    const isLast = index === paths.length - 1;
                    return (
                        <li
                            key={path.href}
                            aria-current={isLast ? 'page' : undefined}
                            {...elem('listItem')}
                        >
                            {React.cloneElement(
                                linkRenderer(path),
                                { ...elem('link', { active: isLast }) },
                                <>
                                    {index > 0 && <span {...elem('separator')}>/</span>}
                                    {path.icon &&
                                        React.cloneElement(path.icon, { ...elem('icon') })}
                                    {path.label}
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    )
);

export { Breadcrumb };
