// eslint-disable-next-line import/prefer-default-export
export const escapeRegExp = string =>
    // Escape special RegExp characters in user input
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
    string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
