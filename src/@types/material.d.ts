import '@mui/material';

declare module '@mui/material/styles' {
    interface Palette {
        monotone: Palette['monotone'];
    }

    interface PaletteOptions {
        monotone?: PaletteOptions['monotone'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        monotone: true;
    }
}

declare module '@mui/material/Chip' {
    interface ChipPropsVariantOverrides {
        rounded: true;
    }
}

declare module '@mui/material/CircularProgress' {
    interface CircularProgressPropsColorOverrides {
        monotone: true;
    }
}
