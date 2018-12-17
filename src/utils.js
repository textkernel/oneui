export const escapeRegExp = string =>
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
    string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
