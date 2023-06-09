import { getAttachmentIcon, getHumanReadableSize } from '@components/Message';
import React from 'react';
import type { AttachmentType } from '../AttachmentType';
import { download } from '../icons/download';
import {
    AttachmentContainer,
    AttachmentDownloadButton,
    AttachmentFileName,
    AttachmentFileNameInner,
    AttachmentFileSize,
    AttachmentIconContainer,
    AttachmentInfo
} from './styles';

export interface DefaultAttachmentProps {
    file: File;
    type: AttachmentType;
}

export const DefaultAttachment = ({ file: { name, size }, type }: DefaultAttachmentProps) => (
    <AttachmentContainer>
        <AttachmentIconContainer>
            {getAttachmentIcon(type)}
        </AttachmentIconContainer>
        <AttachmentInfo>
            <AttachmentFileName>
                <AttachmentFileNameInner>{name}</AttachmentFileNameInner>
            </AttachmentFileName>
            <AttachmentFileSize>{getHumanReadableSize(size)}</AttachmentFileSize>
        </AttachmentInfo>
        <AttachmentDownloadButton>{download}</AttachmentDownloadButton>
    </AttachmentContainer>
);
