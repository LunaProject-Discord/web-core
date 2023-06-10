import { jumbosizeEmojis } from '../emoji';
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
import { createParser } from './createParser';

export const parseMessageContent = createParser(
    {
        autolink,
        blockQuote,
        codeBlock,
        customEmoji,
        emoji,
        emote,
        emphasis,
        escape,
        heading,
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
    },
    jumbosizeEmojis
);
