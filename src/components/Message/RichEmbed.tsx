import styled from '@emotion/styled';
import { Embed } from '@lunaproject-discord/web-discord';
import Color from 'color';
import { isValid } from 'date-fns';
import { rem } from 'polished';
import React, { Fragment, useEffect, useRef } from 'react';
import { Markdown, MarkdownContainer } from '../../markdown';
import { EmbedAuthor } from './Author';
import { EmbedField } from './Field';
import { EmbedFooter } from './Footer';
import { EmbedGallery } from './Gallery';
import { RichEmbedContainer } from './RichEmbedContainer';

const EmbedGrid = styled('div')({
    padding: `${rem(8)} ${rem(16)} ${rem(16)} ${rem(12)}`,
    display: 'inline-grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto'
});

const EmbedTitleNormal = styled('span')(({ theme }) => ({
    minWidth: 0,
    marginTop: 8,
    display: 'inline-block',
    gridColumn: '1 / 2',
    [`& > ${MarkdownContainer}`]: {
        fontSize: rem(16),
        fontWeight: 600,
        color: theme.header.primary
    }
}));

const EmbedTitleLink = styled(EmbedTitleNormal.withComponent('a'))(({ theme }) => ({
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    },
    [`& > ${MarkdownContainer}`]: {
        color: theme.text.link
    }
}));

const EmbedDescription = styled('div')(({ theme }) => ({
    minWidth: 0,
    marginTop: 8,
    gridColumn: '1 / 2',
    [`& > ${MarkdownContainer}`]: {
        color: theme.text.normal,
        fontSize: rem(14),
        lineHeight: rem(18),
        whiteSpace: 'pre-line'
    }
}));

const EmbedFields = styled('div')({
    minWidth: 0,
    marginTop: 8,
    display: 'grid',
    gridColumn: '1 / 2',
    gap: 8
});

const EmbedImage = styled('img')<{ thumbnail?: boolean }>(({ thumbnail }) => ({
    width: '100%',
    minWidth: 0,
    maxWidth: 400,
    maxHeight: 300,
    marginTop: 16,
    gridColumn: '1 / 2',
    cursor: 'pointer',
    borderRadius: 4,
    ...(thumbnail && {
        gridColumn: '1 / 3'
    })
}));

const EmbedThumbnailContainer = styled('div')({
    marginTop: 8,
    marginLeft: 16,
    gridRow: '1 / 8',
    gridColumn: '2 / 3',
    justifySelf: 'end',
    cursor: 'pointer'
});

const EmbedThumbnail = styled('img')({
    maxWidth: 80,
    maxHeight: 80,
    borderRadius: 4
});

export interface Props {
    embed: Embed;
}

export const RichEmbed = ({ embed }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const hasTitle = embed.title.trim().length > 0;
    const hasDescription = embed.description.trim().length > 0;
    const hasAuthor = embed.author.name.trim().length > 0;
    const hasFooter = embed.footer.text.trim().length > 0 || isValid(embed.timestamp);

    const embedColor = embed?.color ?? Color(0xffffff);
    const fields = embed.fields ?? [];
    const images = embed.image?.images ?? [];
    const thumbnail = embed.image?.thumbnail;

    useEffect(() => {
        const { current: container } = containerRef;
        if (!container) return;

        container.style.maxWidth = '';
    }, [images.length === 1 && images[0]]);

    const color = embedColor.rgbNumber() === 0xffffff ? undefined : embedColor.hex();

    return (
        <RichEmbedContainer ref={containerRef} style={{ borderColor: color }}>
            <EmbedGrid>
                {hasAuthor && <EmbedAuthor embed={embed} />}
                {hasTitle && (embed.url ? <Fragment>
                    <EmbedTitleLink href={embed.url} rel="noopener noreferrer nofollow ugc" target="_blank">
                        <Markdown content={embed.title} type="embed-header" />
                    </EmbedTitleLink>
                </Fragment> : <Fragment>
                    <EmbedTitleNormal>
                        <Markdown content={embed.title} type="embed-header" />
                    </EmbedTitleNormal>
                </Fragment>)}
                {hasDescription && <EmbedDescription>
                    <Markdown content={embed.description} type="embed-content" />
                </EmbedDescription>}
                {fields.length > 0 && <EmbedFields>
                    {fields.map((field, i) => (
                        <EmbedField key={i} field={field} embed={embed} />
                    ))}
                </EmbedFields>}
                {images.length > 1 ? (
                    <EmbedGallery embed={embed} />
                ) : images.length === 1 ? (
                    <EmbedImage
                        ref={imageRef}
                        src={images[0]}
                        alt="Image"
                        thumbnail={Boolean(embed.image?.thumbnail)}
                        onLoad={() => {
                            const { current: container } = containerRef;
                            const { current: image } = imageRef;
                            if (!container || !image) return;

                            const { width } = image.getBoundingClientRect();
                            container.style.maxWidth = width >= 300 ? `${width + 32}px` : '';
                        }}
                    />
                ) : undefined}
                {hasFooter && <EmbedFooter embed={embed} />}
                {thumbnail && <EmbedThumbnailContainer>
                    <EmbedThumbnail src={thumbnail} alt="Thumbnail" />
                </EmbedThumbnailContainer>}
            </EmbedGrid>
        </RichEmbedContainer>
    );
};
