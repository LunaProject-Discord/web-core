import styled from '@emotion/styled';

export const MarkdownContainer = styled('div')(({ theme }) => ({
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    lineHeight: 1.375,
    ...(theme.appearance.color === 'light' && {
        '@media (max-resolution: 1dppx)': {
            fontWeight: 500
        }
    })
}));
