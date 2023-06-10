import React from 'react';
import { anyScopeRegex, defaultRules } from 'simple-markdown';
import type { MarkdownRule } from '../parsers';
import { HeadingOne, HeadingThree, HeadingTwo } from '../styles/Heading';

const HEADING_RE = /^ *(#{1,3})(?!#) +([^\n]+)\n*/;

export const heading: MarkdownRule = {
    order: defaultRules.heading.order,
    match: anyScopeRegex(HEADING_RE),
    parse: (capture, parse, state) => {
        const parsedContent = parse(capture[2].trim(), { ...state, inline: true });
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
                return (<HeadingOne key={state.key}>{children}</HeadingOne>);
            case 2:
                return (<HeadingTwo key={state.key}>{children}</HeadingTwo>);
            case 3:
                return (<HeadingThree key={state.key}>{children}</HeadingThree>);
            default:
                return children;
        }
    }
};
