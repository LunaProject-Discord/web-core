import React, { Fragment } from 'react';
import { ASTNode, defaultRules } from 'simple-markdown';
import type { MarkdownRule } from '../parsers';
import { ListItem, OrderedList, UnorderedList } from '../styles';

export const list: MarkdownRule = {
    ...defaultRules.list,
    match: (source, state, prevCapture) => {
        state._list = true;
        return defaultRules.list.match(source, state, prevCapture);
    },
    react: (node, output, state) => {
        const items: ASTNode[] = node.items;

        const children = (
            <Fragment>
                {items.map((item, i) => (
                    <ListItem key={i}>{output(item, state)}</ListItem>
                ))}
            </Fragment>
        );

        if (node.ordered) {
            const start: number = node.start;

            return (
                <OrderedList
                    key={state.key}
                    start={start}
                    style={{ ['--totalCharacters' as any]: (start + items.length).toString().length }}
                >
                    {children}
                </OrderedList>
            );
        } else {
            return (<UnorderedList key={state.key}>{children}</UnorderedList>);
        }
    }
};
