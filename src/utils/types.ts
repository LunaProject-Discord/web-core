export type DeepRequired<T> = {
    [P in keyof T]-?: DeepRequired<T[P]>;
};

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export type SomeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type SomePartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
