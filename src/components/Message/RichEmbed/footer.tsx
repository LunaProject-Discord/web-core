import styled from '@emotion/styled';
import { Embed } from '@lunaproject-discord/web-discord';
import { isValid } from 'date-fns';
import { rem, size } from 'polished';
import React from 'react';
import { formatTimestamp } from '../../../utils';

const richEmbedFooterClassPrefix = 'RichEmbedFooter';
export const richEmbedFooterClasses = {
    root: `${richEmbedFooterClassPrefix}-root`,
    icon: `${richEmbedFooterClassPrefix}-icon`,
    text: `${richEmbedFooterClassPrefix}-text`,
    separator: `${richEmbedFooterClassPrefix}-separator`,
    timestamp: `${richEmbedFooterClassPrefix}-timestamp`
};

export const RichEmbedFooterRoot = styled('div')<{ thumbnail?: boolean; }>(({ thumbnail }) => ({
    minWidth: 0,
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    gridRow: 'auto / auto',
    gridColumn: '1 / 2',
    ...(thumbnail && {
        gridColumn: '1 / 3'
    })
}));

export const RichEmbedFooterImage = styled('img')({
    ...size(20),
    marginRight: 8,
    objectFit: 'contain',
    borderRadius: '50%'
});

export const RichEmbedFooterText = styled('span')(({ theme }) => ({
    color: theme.text.normal,
    fontSize: rem(12),
    fontWeight: 500,
    lineHeight: rem(16),
    whiteSpace: 'break-spaces',
    ...(theme.appearance.color === 'light' && {
        '@media (max-resolution: 1dppx)': {
            fontWeight: 500
        }
    })
}));

export const RichEmbedFooterSeparator = styled('span')({
    margin: '0 4px',
    display: 'inline-block'
});

export interface RichEmbedFooterProps {
    embed: Embed;
}

export const RichEmbedFooter = ({ embed: { image, footer: { text, iconUrl }, timestamp } }: RichEmbedFooterProps) => (
    <RichEmbedFooterRoot thumbnail={Boolean(image?.thumbnail)} className={richEmbedFooterClasses.root}>
        {iconUrl && (<RichEmbedFooterImage
            src={iconUrl}
            alt="Footer image"
            className={richEmbedFooterClasses.icon}
        />)}
        <RichEmbedFooterText className={richEmbedFooterClasses.text}>
            {text}
            {text && timestamp && isValid(timestamp) &&
                <RichEmbedFooterSeparator className={richEmbedFooterClasses.separator}>•</RichEmbedFooterSeparator>
            }
            {timestamp && isValid(timestamp) &&
                <span className={richEmbedFooterClasses.timestamp}>{formatTimestamp(timestamp)}</span>
            }
        </RichEmbedFooterText>
    </RichEmbedFooterRoot>
);
