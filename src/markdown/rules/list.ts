import { defaultRules } from 'simple-markdown';
import type { MarkdownRule } from '../parsers';

export const list: MarkdownRule = {
    ...defaultRules.list,
    match: (source, state, prevCapture) => {
        state._list = true;
        return defaultRules.list.match(source, state, prevCapture);
    }
};
