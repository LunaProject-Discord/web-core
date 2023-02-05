import styled from '@emotion/styled';

export const RichEmbedContainer = styled('div')(({ theme }) => ({
    maxWidth: 520,
    display: 'grid',
    background: theme.background.secondary,
    borderLeft: `solid 4px ${theme.background.tertiary}`,
    borderRadius: 4,
    '&, & *': {
        unicodeBidi: 'plaintext',
        textAlign: 'left'
    }
}));
