import styled from '@emotion/styled';
import { Embed } from '@lunaproject/web-discord';
import { rem, size } from 'polished';
import React from 'react';

const richEmbedAuthorClassPrefix = 'RichEmbedAuthor';
export const richEmbedAuthorClasses = {
    root: `${richEmbedAuthorClassPrefix}-root`,
    icon: `${richEmbedAuthorClassPrefix}-icon`,
    name: `${richEmbedAuthorClassPrefix}-name`,
    nameLink: `${richEmbedAuthorClassPrefix}-nameLink`
};

export const RichEmbedAuthorRoot = styled('div')({
    minWidth: 0,
    marginTop: 8,
    gridColumn: '1 / 2',
    display: 'flex',
    alignItems: 'center'
});

export const RichEmbedAuthorIcon = styled('img')({
    ...size(24),
    marginRight: 8,
    objectFit: 'contain',
    borderRadius: '50%'
});

export const RichEmbedAuthorNameNormal = styled('span')(({ theme }) => ({
    display: 'inline-block',
    color: theme.header.primary,
    fontSize: rem(14),
    fontWeight: 600,
    whiteSpace: 'pre-wrap',
    '@media (max-resolution: 1dppx)': {
        fontWeight: 500
    }
}));

export const RichEmbedAuthorNameLink = styled(RichEmbedAuthorNameNormal.withComponent('a'))({
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    }
});

export interface RichEmbedAuthorProps {
    embed: Embed;
}

export const RichEmbedAuthor = ({ embed: { author: { name, url, iconUrl } } }: RichEmbedAuthorProps) => (
    <RichEmbedAuthorRoot className={richEmbedAuthorClasses.root}>
        {iconUrl && <RichEmbedAuthorIcon
            src={iconUrl}
            alt="Author image"
            className={richEmbedAuthorClasses.icon}
        />}
        {name && (url ? <RichEmbedAuthorNameLink
            href={url}
            target="_blank"
            rel="noopener noreferrer nofollow ugc"
            className={richEmbedAuthorClasses.nameLink}
        >
            {name}
        </RichEmbedAuthorNameLink> : <RichEmbedAuthorNameNormal className={richEmbedAuthorClasses.name}>
            {name}
        </RichEmbedAuthorNameNormal>)}
    </RichEmbedAuthorRoot>
);
