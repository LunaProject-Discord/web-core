import React from 'react';
import { AudioAttachment } from './components/AudioAttachment';
import { DefaultAttachment } from './components/DefaultAttachment';
import { ImageAttachment } from './components/ImageAttachment';
import { getAttachmentType } from './helpers/getAttachmentType';

export interface AttachmentProps {
    file: File;
}

export const Attachment = ({ file }: AttachmentProps) => {
    const { name, type: mime } = file;

    const type = getAttachmentType(name, mime);

    switch (type) {
        case 'image': {
            return <ImageAttachment file={file} />;
        }
        case 'audio': {
            return <AudioAttachment file={file} />;
        }
        default: {
            return <DefaultAttachment file={file} type={type} />;
        }
    }
};
