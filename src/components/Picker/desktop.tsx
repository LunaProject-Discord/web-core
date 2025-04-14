'use client';

import { Box, listClasses, Popover, popoverClasses, SlotComponentProps, styled } from '@mui/material';
import React, { cloneElement, useCallback, useContext } from 'react';
import { VList } from 'virtua';
import { borderAndBoxShadow, ConfigContext } from '../../utils';
import { ErrorDescription, ErrorRoot, ErrorTitle } from '../Error';
import { SlotRootProps } from '../SectionCard';
import { PickerInternalProps } from './index';
import { PickerSearchBox } from './search_box';

export const DesktopPickerRoot = styled(Popover)(({ theme }) => ({
    [`& .${popoverClasses.paper}`]: {
        width: 300,
        ...borderAndBoxShadow(theme)
    }
}));

export const DesktopPickerContent = styled(Box)(({ theme }) => ({
    height: 300,
    [`& .${listClasses.root}`]: {
        padding: 0
    }
}));

export interface DesktopPickerSlotProps {
    slotProps?: {
        root?: SlotComponentProps<typeof Popover, SlotRootProps, {}>;
        content?: SlotComponentProps<typeof Box, SlotRootProps, {}>;
        searchBox?: SlotComponentProps<typeof PickerSearchBox, SlotRootProps, {}>;
    };
}

export type DesktopPickerProps<T> = PickerInternalProps<T> & DesktopPickerSlotProps;

export const DesktopPicker = <T, >(
    {
        anchorEl,
        setAnchorEl,
        renderChoice,
        getChoiceId,
        choices,
        selected,
        onClick,
        search,
        setSearch,
        disableSearch,
        slotProps
    }: DesktopPickerProps<T>
) => {
    const { icons: { CloudOff }, translations } = useContext(ConfigContext);

    const focusInput = useCallback((element: HTMLInputElement | null) => {
        if (anchorEl !== undefined && element)
            setTimeout(() => element.focus());
    }, [anchorEl]);

    return (
        <DesktopPickerRoot
            open={anchorEl !== undefined}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(undefined)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
        }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
        }}
            {...slotProps?.root}
        >
            {!disableSearch && <PickerSearchBox
                ref={focusInput}
                value={search}
                setValue={setSearch}
                {...slotProps?.searchBox}
            />}
            <DesktopPickerContent {...slotProps?.content}>
                {choices.length > 0 ? <VList style={{ padding: '8px 0' }}>
                    {choices.map((choice, index) => {
                        const id = getChoiceId(choice, index);

                        return cloneElement(
                            renderChoice({
                                index,
                                choice,
                                selected: selected?.includes(id),
                                onClick
                            }),
                            {
                                key: id
                            }
                        );
                    })}
                </VList> : <ErrorRoot>
                    <CloudOff sx={{ fontSize: '7rem' }} />
                    <ErrorTitle variant="h3">{translations.error_data_not_found_title}</ErrorTitle>
                    <ErrorDescription variant="body2">{translations.error_data_not_found_description}</ErrorDescription>
                </ErrorRoot>}
            </DesktopPickerContent>
        </DesktopPickerRoot>
    );
};
