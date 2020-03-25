import * as React from 'react';
import { List, CellMeasurer, CellMeasurerCache, AutoSizer, ListRowProps } from 'react-virtualized';

export interface Props {
    rowCount: number;
    defaultHeight?: number;
    defaultWidth?: number;
    children: (props: ListRowProps) => React.ReactNode;
}

const DEFAULT_ROW_HEIGHT = 30;

export const ListOptimizer: React.FC<Props> = ({
    rowCount,
    defaultHeight,
    defaultWidth,
    children,
    ...props
}) => {
    const cellMeasurerCache = React.useRef(
        new CellMeasurerCache({
            defaultHeight: DEFAULT_ROW_HEIGHT,
            fixedWidth: true,
        })
    );

    return (
        <AutoSizer {...props} defaultHeight={defaultHeight} defaultWidth={defaultWidth}>
            {({ height, width }) => (
                <List
                    deferredMeasurementCache={cellMeasurerCache.current}
                    height={height}
                    width={width}
                    rowCount={rowCount}
                    rowHeight={cellMeasurerCache.current.rowHeight}
                    rowRenderer={(args) => (
                        <CellMeasurer
                            cache={cellMeasurerCache.current}
                            columnIndex={args.columnIndex}
                            key={args.key}
                            parent={args.parent}
                            rowIndex={args.index}
                        >
                            {children(args)}
                        </CellMeasurer>
                    )}
                />
            )}
        </AutoSizer>
    );
};

ListOptimizer.displayName = 'ListOptimizer';
