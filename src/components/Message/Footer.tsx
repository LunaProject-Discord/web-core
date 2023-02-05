import styled from '@emotion/styled';
import { Embed } from '@lunaproject-discord/web-discord';
import { isValid } from 'date-fns';
import { rem, size } from 'polished';
import React from 'react';
import { EmbedTimestamp } from './Timestamp';

const Container = styled('div')<{ thumbnail?: boolean; }>(({ thumbnail }) => ({
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

const FooterImage = styled('img')({
    ...size(20),
    marginRight: 8,
    objectFit: 'contain',
    borderRadius: '50%'
});

const FooterText = styled('span')(({ theme }) => ({
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

const FooterSeparator = styled('span')({
    margin: '0 4px',
    display: 'inline-block'
});

export interface Props {
    embed: Embed;
}

export const EmbedFooter = ({ embed: { image, footer, timestamp } }: Props) => (
    <Container thumbnail={Boolean(image?.thumbnail)}>
        {footer.iconUrl && (<FooterImage src={footer.iconUrl} alt="Footer image" />)}
        <FooterText>
            {footer.text}
            {footer.text && timestamp && isValid(timestamp) && <FooterSeparator>•</FooterSeparator>}
            {timestamp && isValid(timestamp) && <EmbedTimestamp timestamp={timestamp} />}
        </FooterText>
    </Container>
);
