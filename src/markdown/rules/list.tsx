import React, { Fragment } from 'react';
import { ASTNode, defaultRules } from 'simple-markdown';
import type { MarkdownRule } from '../parsers';
import { ListItem, OrderedList, UnorderedList } from '../styles';

// recognize a `*` `-`, `+`, `1.`, `2.`... list bullet
const LIST_BULLET = '(?:[*+-]|\\d+\\.)';
// recognize the start of a list item:
// leading space plus a bullet plus a space (`   * `)
const LIST_ITEM_PREFIX = '( *)(' + LIST_BULLET + ') +';
const LIST_ITEM_PREFIX_R = new RegExp('^' + LIST_ITEM_PREFIX);
// recognize an individual list item:
//  * hi
//    this is part of the same item
//
//    as is this, which is a new paragraph in the same item
//
//  * but this is not part of the same item
const LIST_ITEM_R = new RegExp(
    LIST_ITEM_PREFIX +
    '[^\\n]*(?:\\n' +
    '(?!\\1' + LIST_BULLET + ' )[^\\n]*)*(\n|$)',
    'gm'
);
const INLINE_CODE_ESCAPE_BACKTICKS_R = /^ (?= *`)|(` *) $/g;
// recognize the end of a paragraph block inside a list item:
// two or more newlines at end end of the item
const LIST_BLOCK_END_R = /\n{2,}$/;
const LIST_ITEM_END_R = / *\n+$/;
// check whether a list item has paragraphs: if it does,
// we leave the newlines at the end
const LIST_R = new RegExp(
    '^( *)(' + LIST_BULLET + ') ' +
    '[\\s\\S]+?(?:\n{2,}(?! )' +
    '(?!\\1' + LIST_BULLET + ' )\\n*' +
    // the \\s*$ here is so that we can parse the inside of nested
    // lists, where our content might end before we receive two `\n`s
    '|\\s*\n*$)'
);
const LIST_LOOKBEHIND_R = /(?:^|\n)( *)$/;

export const list: MarkdownRule = {
    ...defaultRules.list,
    match: (source, state, prevCapture) => {
        state._list = true;
        return defaultRules.list.match(source, state, prevCapture);
    },
    parse: (capture, parse, state) => {
        const bullet = capture[2];
        const ordered = bullet.length > 1;
        const start = ordered ? +bullet : undefined;
        const items = capture[0]
            .replace(LIST_BLOCK_END_R, '\n')
            .match(LIST_ITEM_R) as string[];

        let shallow = false;
        const itemContent = items.map((item, i) => {
            const prefixCapture = LIST_ITEM_PREFIX_R.exec(item);
            const space = prefixCapture ? prefixCapture[0].length : 0;
            const spaceRegex = new RegExp('^ {1,' + space + '}', 'gm');

            const content = item
                .replace(spaceRegex, '')
                .replace(LIST_ITEM_PREFIX_R, '');

            shallow = space < 3;

            const oldStateInline = state.inline;
            const oldStateList = state._list;
            state._list = true;
            state.inline = true;

            const result = parse(content.replace(LIST_ITEM_END_R, ''), state);

            // Restore our state before returning
            state.inline = oldStateInline;
            state._list = oldStateList;
            return result;
        });

        return {
            shallow: shallow,
            ordered: ordered,
            start: start,
            items: itemContent
        };
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
            return (
                <UnorderedList
                    key={state.key}
                    style={{ listStyleType: state.shallow ? 'disc' : 'circle' }}
                >
                    {children}
                </UnorderedList>
            );
        }
    }
};
