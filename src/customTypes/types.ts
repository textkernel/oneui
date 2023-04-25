export type DictionaryOf<T> = {
    [key: string]: T;
};

// React node types
// see: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8a31a2fe9e8417d47550db09e5f9f50fd09a8e60/types/react/index.d.ts#L190
export type NotEmptySingleReactNode = string | number | React.ReactElement;
export type EmptyElement = false | null | undefined;
