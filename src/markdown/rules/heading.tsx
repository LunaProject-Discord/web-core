import React from 'react';
import { defaultRules } from 'simple-markdown';
import type { MarkdownRule } from '../parsers';
import { HeadingOne, HeadingThree, HeadingTwo } from '../styles/Heading';

const HEADING_RE = /^ *(#{1,3})(?!#) +([^\n]+)\n*/;

export const heading: MarkdownRule = {
    order: defaultRules.heading.order,
    match: (source, state) => {
        if (state.nested) return null;
        console.log(source, state);
        return HEADING_RE.exec(source);
    },
    parse: (capture, parse, state) => {
        const parsedContent = parse(capture[2].trim(), { ...state, inline: true, heading: true });
        console.log(capture, parse, state, parsedContent);

        if (parsedContent.length === 0)
            parsedContent.push({ type: 'text', content: ' ' });

        return {
            level: capture[1].length,
            content: parsedContent
        };
    },
    react: (node, output, state) => {
        const children = output(node.content, state);
        switch (node.level) {
            case 1:
                return (<HeadingOne key={state.key}>{node.content}</HeadingOne>);
            case 2:
                return (<HeadingTwo key={state.key}>{node.content}</HeadingTwo>);
            case 3:
                return (<HeadingThree key={state.key}>{node.content}</HeadingThree>);
            default:
                return node.content;
        }
    }
};
