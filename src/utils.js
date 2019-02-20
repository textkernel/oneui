import diacritics from 'diacritics';

export const escapeRegExp = string =>
    // Escape special RegExp characters in user input
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
    string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const isStringMatch = (filter, label) => {
    if (!filter) return true;
    const re = new RegExp(`(${escapeRegExp(diacritics.remove(filter || ''))})`, 'gi');
    return diacritics.remove(label || '').match(re);
};
