import styled from '@emotion/styled';
import { Embed } from '@lunaproject-discord/web-discord';
import { Box } from '@mui/material';
import { size } from 'polished';
import React from 'react';

const EmbedGalleryWrapper = styled(Box)<{ thumbnail?: boolean }>(({ thumbnail }) => ({
    height: 300,
    marginTop: 16,
    gridColumn: '1 / 2',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: 4,
    overflow: 'hidden',
    borderRadius: 4,
    ...(thumbnail && {
        gridColumn: '1 / 3'
    })
}));

const EmbedGalleryCell = styled(Box)<{ index?: number; length?: number }>(({ index, length }) => ({
    minWidth: '100%',
    minHeight: '100%',
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    ...((length === 1 || length === 2 || (length === 3 && index === 0)) && {
        gridRow: 'span 2'
    })
}));

const EmbedGalleryImage = styled('img')({
    ...size('100%'),
    objectFit: 'cover'
});

export interface EmbedGalleryProps {
    embed: Embed;
}

export const EmbedGallery = ({ embed }: EmbedGalleryProps) => {
    const images = embed.image?.images ?? [];

    return (
        <EmbedGalleryWrapper>
            {images.map((url, index) => (
                <EmbedGalleryCell key={`${index}-${url}`} index={index} length={images.length}>
                    <EmbedGalleryImage src={url} alt="Image" />
                </EmbedGalleryCell>
            ))}
        </EmbedGalleryWrapper>
    );
};
