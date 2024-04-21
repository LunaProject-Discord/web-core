export const min = <T>(array: T[], predicate: (data: T) => number) => {
    if (array.length < 1)
        return undefined;

    return [...array].sort((a, b) => predicate(a) - predicate(b))[0];
};

export const max = <T>(array: T[], predicate: (data: T) => number) => {
    if (array.length < 1)
        return undefined;

    return [...array].sort((a, b) => predicate(b) - predicate(a))[0];
};

export const exists = <T>(array: T[], index: number) => index > -1 && index < array.length;

export const remove = <T>(array: T[], index: number, count: number = 1): T[] => {
    let data = [...array];
    data.splice(index, count);
    return data;
};

export const replace = <T>(array: T[], index: number, items: T | T[], count: number = Array.isArray(items) ? items.length : 1): T[] => {
    let data = [...array];
    data.splice(index, count, ...(Array.isArray(items) ? items : [items]));
    return data;
};

export const moveUp = <T>(array: T[], index: number, count: number = 1): T[] => {
    if (index === 0)
        return array;

    let data = [...array];
    data.splice(index - count, 0, ...data.splice(index, count));
    return data;
};

export const moveDown = <T>(array: T[], index: number, count: number = 1): T[] => {
    if (index === array.length - 1)
        return array;

    let data = [...array];
    data.splice(index + count, 0, ...data.splice(index, count));
    return data;
};
