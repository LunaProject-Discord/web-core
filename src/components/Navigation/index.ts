import { ReactNode } from 'react';
import { NavigationItemPredicate } from './utils';

export interface NavigationItemProps {
    href: string;
    predicate?: NavigationItemPredicate;
    icon?: ReactNode;
}

export * from './appbar';
export * from './drawer';
export * from './utils';
