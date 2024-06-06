'use client';

import { SectionCardVariableProps } from '../index';
import { SectionOutlinedTextFieldCard } from './outlined';

export type SectionTextFieldCardRootProps = SectionCardVariableProps<{ value: string; }>;

export const SectionTextFieldCard = SectionOutlinedTextFieldCard;

export * from './filled';
export * from './outlined';
