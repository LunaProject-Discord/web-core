import { SvgIcon, SvgIconProps } from '@mui/material';
import React, { ElementType, ReactNode } from 'react';

export const createSvgIcon = (
    component: { props?: SvgIconProps } & ({ path: ElementType } | { node: ReactNode }),
    displayName: string
): typeof SvgIcon => {
    const Element = (props: SvgIconProps) => 'node' in component ? (
        <SvgIcon {...component.props} {...props}>{component.node}</SvgIcon>
    ) : (
        <SvgIcon component={component.path} inheritViewBox {...component.props} {...props} />
    );
    Element.displayName = displayName;
    Element.muiName = SvgIcon.muiName;
    return Element;
};
