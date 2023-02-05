import { blue, green, orange, purple, red } from '@mui/material/colors';

const prefixes = {
    success: '%cSuccess ―',
    warning: '%cWarning ―',
    error: '%cError ―',
    info: '%cInfo ―'
};

const styles = {
    success: `color: ${green[500]}; font-weight: bold;`,
    warning: `color: ${orange[500]}; font-weight: bold;`,
    error: `color: ${red[500]}; font-weight: bold;`,
    info: `color: ${blue[500]}; font-weight: bold;`,

    name: `color: ${purple[500]}; font-weight: bold;`
};


export const logWithName = (name: string, ...data: any[]) => {
    console.log(`%c[${name}]`, styles.name, ...data);
};

export const success = (...data: any[]) => {
    console.log(prefixes.success, styles.success, ...data);
};

export const successWithName = (name: string, ...data: any[]) => {
    console.log(`${prefixes.success} %c[${name}]`, styles.success, styles.name, ...data);
};

export const warning = (...data: any[]) => {
    console.warn(prefixes.warning, styles.warning, ...data);
};

export const warningWithName = (name: string, ...data: any[]) => {
    console.warn(`${prefixes.warning} %c[${name}]`, styles.warning, styles.name, ...data);
};

export const error = (...data: any[]) => {
    console.error(prefixes.error, styles.error, ...data);
};

export const errorWithName = (name: string, ...data: any[]) => {
    console.error(`${prefixes.error} %c[${name}]`, styles.error, styles.name, ...data);
};

export const info = (...data: any[]) => {
    console.info(prefixes.info, styles.info, ...data);
};

export const infoWithName = (name: string, ...data: any[]) => {
    console.info(`${prefixes.info} %c[${name}]`, styles.info, styles.name, ...data);
};
