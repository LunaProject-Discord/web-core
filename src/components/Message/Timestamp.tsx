import React from 'react';
import { formatTimestamp } from '../../utils';

export interface EmbedTimestampProps {
    timestamp: Date;
}

export const EmbedTimestamp = ({ timestamp }: EmbedTimestampProps) => (<span>{formatTimestamp(timestamp)}</span>);
