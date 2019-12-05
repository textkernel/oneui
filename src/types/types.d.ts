// React node types
// see: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8a31a2fe9e8417d47550db09e5f9f50fd09a8e60/types/react/index.d.ts#L190
type NonEmptySingleReactNode = string | number | React.ReactElement;
type NotEmptyReactNode =
    | string
    | number
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactFragment
    | React.ReactPortal;
type SingleReactNode = NonEmptySingleReactNode | boolean | null | undefined;
type ReactNode = NotEmptyReactNode | boolean | null | undefined;
