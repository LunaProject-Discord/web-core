'use client';

import { SectionCardVariableProps } from '../index';
import { SectionOutlinedNumberFieldCard } from './outlined';

export type SectionNumberFieldCardRootProps = SectionCardVariableProps<{ value: number; }>;

export const SectionNumberFieldCard = SectionOutlinedNumberFieldCard;

export * from './filled';
export * from './outlined';
