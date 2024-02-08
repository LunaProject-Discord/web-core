import {
    autolink,
    blockQuote,
    codeBlock,
    customEmoji,
    emoji,
    emote,
    emphasis,
    escape,
    inlineCode,
    lineBreak,
    link,
    mention,
    newline,
    paragraph,
    spoiler,
    strikethrough,
    strong,
    text,
    underline,
    url
} from '../rules';
import { heading } from '../rules/heading';
import { list } from '../rules/list';
import { createParser } from './createParser';

const RULES = {
    autolink,
    blockQuote,
    codeBlock,
    customEmoji,
    emoji,
    emote,
    emphasis,
    escape,
    inlineCode,
    lineBreak,
    link,
    mention,
    newline,
    paragraph,
    spoiler,
    strikethrough,
    strong,
    text,
    underline,
    url
};

export const parseEmbedContent = createParser(RULES);

export const parseEmbedDescription = createParser({ ...RULES, heading, list });
