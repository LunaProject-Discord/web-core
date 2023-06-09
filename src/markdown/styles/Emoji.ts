import { RichEmbedContainer } from '@components/Message';
import styled from '@emotion/styled';
import { em, rem, size } from 'polished';

const Emoji = styled('img')<{ big?: boolean }>(({ theme, big }) => ({
    ...size(em(22)),
    objectFit: 'contain',
    verticalAlign: 'bottom',
    ...(theme.appearance.display === 'cozy' && big && {
        ...size(rem(48)),
        minHeight: rem(48)
    }),
    [`${RichEmbedContainer} &`]: {
        ...size(18)
    }
}));

Emoji.defaultProps = {
    draggable: false
};

export { Emoji };
