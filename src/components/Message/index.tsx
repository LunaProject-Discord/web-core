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
