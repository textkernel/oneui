// React children types
// see: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8a31a2fe9e8417d47550db09e5f9f50fd09a8e60/types/react/index.d.ts#L190
type RequiredChild = React.ReactChild;
type RequiredChildren = React.ReactChild | React.ReactElement[] | React.ReactFragment;
type OptionalChild = RequiredChild | boolean | null | undefined;
type OptionalChildren = RequiredChildren | boolean | null | undefined;
