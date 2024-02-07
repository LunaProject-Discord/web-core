import styled from '@emotion/styled';

const richEmbedContainerClassPrefix = 'RichEmbedContainer';
export const richEmbedContainerClasses = {
    root: `${richEmbedContainerClassPrefix}-root`
};

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
RichEmbedContainer.defaultProps = {
    className: richEmbedContainerClasses.root
};
