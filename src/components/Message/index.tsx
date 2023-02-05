import { Message } from '@lunaproject-discord/web-discord';
import React from 'react';
import { MessageContainer } from './MessageContainer';
import { MessagePreview } from './MessagePreview';

interface Props {
    message: Message;
}

export const Preview = ({ message }: Props) => (
    <MessageContainer style={{ border: 'none' }}>
        <MessagePreview message={message} />
    </MessageContainer>
);

export * from './Attachment';
export * from './Author';
export * from './Clock';
export * from './Field';
export * from './Footer';
export * from './Gallery';
export * from './MessageContainer';
export * from './MessageHeader';
export * from './MessagePreview';
export * from './RichEmbed';
export * from './RichEmbedContainer';
export * from './Timestamp';
