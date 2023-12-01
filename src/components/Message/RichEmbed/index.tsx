import styled from '@emotion/styled';
import { Embed } from '@lunaproject/web-discord';
import Color from 'color';
import { isValid } from 'date-fns';
import { rem } from 'polished';
import React, { useEffect, useRef } from 'react';
import { Markdown, MarkdownContainer } from '../../../markdown';
import { RichEmbedAuthor } from './author';
import { RichEmbedContainer } from './container';
import { RichEmbedField } from './field';
import { RichEmbedFooter } from './footer';
import { RichEmbedGallery } from './gallery';

const richEmbedClassPrefix = 'RichEmbed';
export const richEmbedClasses = {
    root: `${richEmbedClassPrefix}-root`,
    titleRoot: `${richEmbedClassPrefix}-titleRoot`,
    title: `${richEmbedClassPrefix}-title`,
    titleLinkRoot: `${richEmbedClassPrefix}-titleLinkRoot`,
    titleLink: `${richEmbedClassPrefix}-titleLink`,
    descriptionRoot: `${richEmbedClassPrefix}-descriptionRoot`,
    description: `${richEmbedClassPrefix}-description`,
    fields: `${richEmbedClassPrefix}-fields`,
    image: `${richEmbedClassPrefix}-image`,
    thumbnailRoot: `${richEmbedClassPrefix}-thumbnailRoot`,
    thumbnail: `${richEmbedClassPrefix}-thumbnail`
};

export const RichEmbedRoot = styled('div')({
    padding: `${rem(8)} ${rem(16)} ${rem(16)} ${rem(12)}`,
    display: 'inline-grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto'
});

export const RichEmbedTitleNormal = styled('span')(({ theme }) => ({
    minWidth: 0,
    marginTop: 8,
    display: 'inline-block',
    gridColumn: '1 / 2',
    [`& > ${MarkdownContainer}, & .${richEmbedClasses.title}`]: {
        fontSize: rem(16),
        fontWeight: 600,
        color: theme.header.primary
    }
}));

export const RichEmbedTitleLink = styled(RichEmbedTitleNormal.withComponent('a'))(({ theme }) => ({
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    },
    [`& > ${MarkdownContainer}, & .${richEmbedClasses.titleLink}`]: {
        color: theme.text.link
    }
}));

export const RichEmbedDescription = styled('div')(({ theme }) => ({
    minWidth: 0,
    marginTop: 8,
    gridColumn: '1 / 2',
    [`& > ${MarkdownContainer}, & .${richEmbedClasses.description}`]: {
        color: theme.text.normal,
        fontSize: rem(14),
        lineHeight: rem(18),
        whiteSpace: 'pre-line'
    }
}));

export const RichEmbedFields = styled('div')({
    minWidth: 0,
    marginTop: 8,
    display: 'grid',
    gridColumn: '1 / 2',
    gap: 8
});

export const RichEmbedImage = styled('img')<{ thumbnail?: boolean; }>(({ thumbnail }) => ({
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

export const RichEmbedThumbnailRoot = styled('div')({
    marginTop: 8,
    marginLeft: 16,
    gridRow: '1 / 8',
    gridColumn: '2 / 3',
    justifySelf: 'end',
    cursor: 'pointer'
});

export const RichEmbedThumbnail = styled('img')({
    maxWidth: 80,
    maxHeight: 80,
    borderRadius: 4
});

export interface RichEmbedProps {
    embed: Embed;
}

export const RichEmbed = ({ embed }: RichEmbedProps) => {
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
            <RichEmbedRoot className={richEmbedClasses.root}>
                {hasAuthor && <RichEmbedAuthor embed={embed} />}
                {hasTitle && (embed.url ? <RichEmbedTitleLink
                    href={embed.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow ugc"
                    className={richEmbedClasses.titleLinkRoot}
                >
                    <Markdown content={embed.title} type="embed-header" className={richEmbedClasses.titleLink} />
                </RichEmbedTitleLink> : <RichEmbedTitleNormal className={richEmbedClasses.titleRoot}>
                    <Markdown content={embed.title} type="embed-header" className={richEmbedClasses.title} />
                </RichEmbedTitleNormal>)}
                {hasDescription && <RichEmbedDescription className={richEmbedClasses.descriptionRoot}>
                    <Markdown
                        content={embed.description}
                        type="embed-description"
                        className={richEmbedClasses.description}
                    />
                </RichEmbedDescription>}
                {fields.length > 0 && <RichEmbedFields className={richEmbedClasses.fields}>
                    {fields.map((field, i) => (
                        <RichEmbedField key={field._id ?? i} field={field} embed={embed} />
                    ))}
                </RichEmbedFields>}
                {images.length > 1 ? (
                    <RichEmbedGallery embed={embed} />
                ) : images.length === 1 ? (
                    <RichEmbedImage
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
                        className={richEmbedClasses.image}
                    />
                ) : undefined}
                {hasFooter && <RichEmbedFooter embed={embed} />}
                {thumbnail && <RichEmbedThumbnailRoot className={richEmbedClasses.thumbnailRoot}>
                    <RichEmbedThumbnail src={thumbnail} alt="Thumbnail" className={richEmbedClasses.thumbnail} />
                </RichEmbedThumbnailRoot>}
            </RichEmbedRoot>
        </RichEmbedContainer>
    );
};

export * from './author';
export * from './container';
export * from './field';
export * from './footer';
export * from './gallery';
