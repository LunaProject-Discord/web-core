export type NavigationItemPredicate = (pathname: string | undefined, href: string) => boolean;

export const defaultPredicate: NavigationItemPredicate = (pathname, href) => pathname !== undefined && (href === '/' ? pathname === href : pathname.startsWith(href));
