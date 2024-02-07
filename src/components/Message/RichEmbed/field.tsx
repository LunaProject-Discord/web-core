import styled from '@emotion/styled';
import { Embed, EmbedField as Field } from '@lunaproject/web-discord';
import { rem } from 'polished';
import React from 'react';
import { getFieldGridColumn } from '../../../libs';
import { Markdown, MarkdownContainer } from '../../../markdown';

const richEmbedFieldClassPrefix = 'RichEmbedField';
export const richEmbedFieldClasses = {
    root: `${richEmbedFieldClassPrefix}-root`,
    nameRoot: `${richEmbedFieldClassPrefix}-nameRoot`,
    name: `${richEmbedFieldClassPrefix}-name`,
    valueRoot: `${richEmbedFieldClassPrefix}-valueRoot`,
    value: `${richEmbedFieldClassPrefix}-value`
};

export const RichEmbedFieldRoot = styled('div')({
    minWidth: 0,
    fontSize: rem(14),
    lineHeight: rem(18)
});
RichEmbedFieldRoot.defaultProps = {
    className: richEmbedFieldClasses.root
};

export const RichEmbedFieldName = styled('div')(({ theme }) => ({
    minWidth: 0,
    marginBottom: 1,
    fontSize: rem(14),
    fontWeight: 600,
    color: theme.header.primary
}));
RichEmbedFieldName.defaultProps = {
    className: richEmbedFieldClasses.nameRoot
};

export const RichEmbedFieldValue = styled('div')(({ theme }) => ({
    minWidth: 0,
    [`& > ${MarkdownContainer}`]: {
        color: theme.text.normal,
        fontSize: rem(14),
        lineHeight: rem(18),
        whiteSpace: 'pre-line'
    }
}));
RichEmbedFieldValue.defaultProps = {
    className: richEmbedFieldClasses.valueRoot
};

export interface RichEmbedFieldProps {
    embed: Embed;
    field: Field;
}

export const RichEmbedField = ({ embed, field }: RichEmbedFieldProps) => (
    <RichEmbedFieldRoot style={{ gridColumn: getFieldGridColumn(field, embed) }} className={richEmbedFieldClasses.root}>
        <RichEmbedFieldName className={richEmbedFieldClasses.nameRoot}>
            <Markdown content={field.name} type="embed-header" className={richEmbedFieldClasses.name} />
        </RichEmbedFieldName>
        <RichEmbedFieldValue className={richEmbedFieldClasses.valueRoot}>
            <Markdown content={field.value} type="embed-content" className={richEmbedFieldClasses.value} />
        </RichEmbedFieldValue>
    </RichEmbedFieldRoot>
);
