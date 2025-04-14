'use client';

import { ArrowRightOutlined } from '@mui/icons-material';
import { ListItemIcon, Menu as MuiMenu, MenuItem, paperClasses, styled, Theme, Typography } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import React, { ReactNode, useState } from 'react';
import { borderAndBoxShadow } from '../../utils';

export const Menu = styled(MuiMenu)(({ theme }) => ({
    [`& .${paperClasses.root}`]: {
        ...borderAndBoxShadow(theme)
    }
}));

interface NestedMenuProps {
    icon?: ReactNode;
    label: string;
    children?: ReactNode;
    sx?: SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>);
}

export const NestedMenu = ({ icon, label, children, sx }: NestedMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleMouseLeave = () => setAnchorEl(null);

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <MenuItem onClick={(e) => setAnchorEl(e.currentTarget)}>
                <ListItemIcon>{icon}</ListItemIcon>
                {label}
                <ArrowRightOutlined fontSize="small" color="action" sx={{ marginLeft: 'auto' }} />
            </MenuItem>
            <Menu
                open={open}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                autoFocus={false}
                disableAutoFocus
                disableEnforceFocus
                sx={{
                    pointerEvents: 'none',
                    '& .MuiPaper-root': {
                        width: 270,
                        mt: '-9px',
                        ...sx
                    }
                }}
            >
                <div style={{ pointerEvents: 'auto' }}>
                    {children}
                </div>
            </Menu>
        </div>
    );
};

interface MenuItemShortcutKeyProps {
    label: string;
}

export const MenuItemShortcutKey = ({ label }: MenuItemShortcutKeyProps) => (
    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Roboto', fontWeight: 500 }}>
        {label}
    </Typography>
);
