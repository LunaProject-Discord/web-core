import '@mui/material';
import { PaletteColor, PaletteColorOptions } from '@mui/material';

declare module '@mui/system' {
    interface BoxOwnProps {
        component?: React.ElementType;
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        monotone: PaletteColor;
    }

    interface PaletteOptions {
        monotone?: PaletteColorOptions;
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

declare module '@mui/material/LinearProgress' {
    interface LinearProgressPropsColorOverrides {
        monotone: true;
    }
}
