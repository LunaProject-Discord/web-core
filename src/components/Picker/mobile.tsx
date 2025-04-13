'use client';

import { Box, BoxProps, listClasses, listItemButtonClasses, listSubheaderClasses, SlotComponentProps, styled } from '@mui/material';
import React, { cloneElement, useContext } from 'react';
import { Virtualizer } from 'virtua';
import { ConfigContext } from '../../utils';
import { errorClasses, ErrorDescription, ErrorRoot, ErrorTitle } from '../Error';
import { PickerInternalProps } from './index';
import { PickerSearchBox, pickerSearchBoxClasses } from './search_box';
import { getMobilePickerDefaultSnap, getMobilePickerSnapPoints, useMobilePickerRef } from './utils';
import { BottomSheet, BottomSheetContent } from '../BottomSheet';
import { SlotRootProps } from '../SectionCard';

export const MobilePickerRoot = styled(BottomSheet)(({ theme }) => ({
    '& [data-rsbs-header]': {
        zIndex: 2,
        [`& .${pickerSearchBoxClasses.root}`]: {
            margin: theme.spacing(0, -2),
            padding: theme.spacing(1.25, 2)
        }
    },
    '& [data-rsbs-scroll]': {
        overflow: 'auto',
        zIndex: 1,
        '& [data-rsbs-content]': {
            overflow: 'unset'
        },
        [`&:has(.${errorClasses.root})`]: {
            display: 'flex',
            placeItems: 'center',
            placeContent: 'center'
        }
    }
}));

export const MobilePickerContent = styled(BottomSheetContent)(({ theme }) => ({
    height: '100%',
    padding: theme.spacing(1, 0),
    gap: 0,
    [`& .${listClasses.root}`]: {
        padding: 0
    },
    [`& .${listSubheaderClasses.root}`]: {
        padding: theme.spacing(1.5, 2, .5)
    }
}));

export interface MobilePickerSlotProps {
    slotProps?: {
        root?: SlotComponentProps<typeof BottomSheet, SlotRootProps, {}>;
        content?: SlotComponentProps<typeof Box, BoxProps, {}>;
        searchBox?: SlotComponentProps<typeof PickerSearchBox, SlotRootProps, {}>;
    };
}

export type MobilePickerProps<T> = PickerInternalProps<T> & MobilePickerSlotProps;

export const MobilePicker = <T, >(
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
        slotProps,
    }: MobilePickerProps<T>
) => {
    const { icons: { CloudOff }, translations } = useContext(ConfigContext);

    const { sheetScrollRef, setSheetContentRef } = useMobilePickerRef();

    return (
        <MobilePickerRoot
            open={anchorEl !== undefined}
            onDismiss={() => setAnchorEl(undefined)}
            expandOnContentDrag
            defaultSnap={getMobilePickerDefaultSnap}
            snapPoints={getMobilePickerSnapPoints}
            initialFocusRef={false}
            header={
                !disableSearch && <PickerSearchBox
                    value={search}
                    setValue={setSearch}
                    {...slotProps?.searchBox}
                />
            }
            {...slotProps?.root}
        >
            <MobilePickerContent ref={setSheetContentRef} {...slotProps?.content}>
                {choices.length > 0 ? <Virtualizer scrollRef={sheetScrollRef} overscan={2}>
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
                </Virtualizer> : <ErrorRoot>
                    <CloudOff sx={{ fontSize: '7rem' }} />
                    <ErrorTitle variant="h3">{translations.error_data_not_found_title}</ErrorTitle>
                    <ErrorDescription variant="body2">{translations.error_data_not_found_description}</ErrorDescription>
                </ErrorRoot>}
            </MobilePickerContent>
        </MobilePickerRoot>
    );
};
