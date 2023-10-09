import '@mui/material';

declare module '@mui/material/Chip' {
    interface ChipPropsVariantOverrides {
        rounded: true;
    }
}
