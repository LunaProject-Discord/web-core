export const filterPredicateNonNullable = <T>(value: T): value is NonNullable<T> => value != null;
