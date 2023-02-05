'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import React, { ReactNode, useState } from 'react';

interface Props {
    children: ReactNode;
}

export const StyleProvider = ({ children }: Props) => {
    const [{ cache, flush }] = useState(() => {
        const originalCache = createCache({ key: 'cache-key' });
        originalCache.compat = true;

        const prevInsert = originalCache.insert;
        let inserted: string[] = [];
        originalCache.insert = (...args): string | void => {
            const serialized = args[1];
            if (!originalCache.inserted[serialized.name])
                inserted.push(serialized.name);
            return prevInsert(...args);
        };

        const originalFlush = (): string[] => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };

        return { cache: originalCache, flush: originalFlush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0)
            return null;

        let styles = '';
        for (const name of names) {
            let style = cache.inserted[name];
            const removeThemeColors = typeof style === 'string' && style.indexOf('html{') === 0;
            if (removeThemeColors)
                style = (style as string)
                    .replace(/(body{[^}]*)(background-color:[^;]*;)/i, '$1')
                    .replace(/(body{[^}]*)(color:[^;]*;)/i, '$1');
            styles += style;
        }

        return (
            <style
                data-emotion={`${cache.key} ${names.join(' ')}`}
                dangerouslySetInnerHTML={{
                    __html: styles
                }}
            />
        );
    });

    return (<CacheProvider value={cache}>{children}</CacheProvider>);
};
