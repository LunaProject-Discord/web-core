import { defaultRules, inlineRegex } from 'simple-markdown';
import { getCustomEmojiUrl } from '../emoji';
import type { MarkdownRule } from '../parsers';

const CUSTOM_EMOJI_RE = /^<(a)?:(\w+):(\d+)>/;

export const customEmoji: MarkdownRule = {
    ...defaultRules.text,
    match: inlineRegex(CUSTOM_EMOJI_RE),
    parse: capture => {
        const [, animated, name, id] = capture;

        return {
            type: 'emoji',
            name,
            emoji: name,
            src: getCustomEmojiUrl(id, Boolean(animated))
        };
    }
};
