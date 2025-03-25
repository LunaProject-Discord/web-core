import '@mui/material';
import '@mui/material/themeCssVarsAugmentation';
import { PaletteColor, PaletteColorOptions } from '@mui/material';

declare module '@mui/system' {
    interface BoxOwnProps {
        component?: ElementType;
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        monotone: PaletteColor;
        selection: PaletteColor;
    }

    interface PaletteOptions {
        monotone?: PaletteColorOptions;
        selection?: PaletteColorOptions;
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

declare module '@mui/material/Fab' {
    interface FabPropsColorOverrides {
        monotone: true;
    }
}

declare module '@mui/material/LinearProgress' {
    interface LinearProgressPropsColorOverrides {
        monotone: true;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        h5: false;
        h6: false;
    }
}
