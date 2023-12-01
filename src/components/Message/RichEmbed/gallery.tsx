import styled from '@emotion/styled';
import { Embed } from '@lunaproject/web-discord';
import { Box } from '@mui/material';
import { size } from 'polished';
import React from 'react';

const richEmbedGalleryClassPrefix = 'RichEmbedGallery';
export const richEmbedGalleryClasses = {
    root: `${richEmbedGalleryClassPrefix}-root`,
    cell: `${richEmbedGalleryClassPrefix}-cell`,
    image: `${richEmbedGalleryClassPrefix}-image`
};

export const RichEmbedGalleryRoot = styled(Box)<{ thumbnail?: boolean; }>(({ thumbnail }) => ({
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

export const RichEmbedGalleryCell = styled(Box)<{ index?: number; length?: number; }>(({ index, length }) => ({
    minWidth: '100%',
    minHeight: '100%',
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    ...((length === 1 || length === 2 || (length === 3 && index === 0)) && {
        gridRow: 'span 2'
    })
}));

export const RichEmbedGalleryImage = styled('img')({
    ...size('100%'),
    objectFit: 'cover'
});

export interface RichEmbedGalleryProps {
    embed: Embed;
}

export const RichEmbedGallery = ({ embed: { image: { images, thumbnail } } }: RichEmbedGalleryProps) => (
    <RichEmbedGalleryRoot thumbnail={Boolean(thumbnail)} className={richEmbedGalleryClasses.root}>
        {(images ?? []).map((url, index) => (
            <RichEmbedGalleryCell
                key={`${index}-${url}`}
                index={index}
                length={images.length}
                className={richEmbedGalleryClasses.cell}
            >
                <RichEmbedGalleryImage src={url} alt="Image" className={richEmbedGalleryClasses.image} />
            </RichEmbedGalleryCell>
        ))}
    </RichEmbedGalleryRoot>
);
