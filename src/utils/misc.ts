export const assertNever = (value: never, componentInstance: string): never => {
    throw new Error(
        `Switch statement in ${componentInstance} terminated in unexpected default with value ${value}`
    );
};
