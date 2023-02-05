import styled from '@emotion/styled';
import { rgb, transparentize } from 'polished';
import { DARK_THEME } from '../../styles';

export const Mention = styled('span')(({ theme }) => ({
    padding: '0 2px',
    cursor: 'pointer',
    color: theme.appearance.color === 'dark' ? rgb(222, 224, 252) : theme.discord.primary,
    fontWeight: 500,
    backgroundColor: transparentize(theme.appearance.color === 'dark' ? .7 : .85, theme.discord.primary),
    borderRadius: 3,
    transition: '50ms ease-out',
    transitionProperty: 'background-color, color',
    '&:hover': {
        color: DARK_THEME.header.primary,
        backgroundColor: DARK_THEME.discord.primary
    }
}));
