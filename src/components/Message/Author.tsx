import styled from '@emotion/styled';
import { Embed } from '@lunaproject-discord/web-discord';
import { rem, size } from 'polished';
import React, { Fragment } from 'react';

const Container = styled('div')({
    minWidth: 0,
    marginTop: 8,
    gridColumn: '1 / 2',
    display: 'flex',
    alignItems: 'center'
});

const AuthorImage = styled('img')({
    ...size(24),
    marginRight: 8,
    objectFit: 'contain',
    borderRadius: '50%'
});

const AuthorNameNormal = styled('span')(({ theme }) => ({
    display: 'inline-block',
    color: theme.header.primary,
    fontSize: rem(14),
    fontWeight: 500,
    whiteSpace: 'pre-wrap',
    '@media (max-resolution: 1dppx)': {
        fontWeight: 500
    }
}));

const AuthorNameLink = styled(AuthorNameNormal.withComponent('a'))({
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    }
});

export interface EmbedAuthorProps {
    embed: Embed;
}

export const EmbedAuthor = ({ embed: { author } }: EmbedAuthorProps) => (
    <Container>
        {author.iconUrl && <AuthorImage src={author.iconUrl} alt="Author image" />}
        {author.name && (author.url ? <Fragment>
            <AuthorNameLink href={author.url} rel="noopener noreferrer nofollow ugc" target="_blank">
                {author.name}
            </AuthorNameLink>
        </Fragment> : <Fragment>
            <AuthorNameNormal>
                {author.name}
            </AuthorNameNormal>
        </Fragment>)}
    </Container>
);
