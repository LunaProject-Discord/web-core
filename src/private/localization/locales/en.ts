import { Localization } from '../index';
import { TranslationMap } from '../translation';

export const translationsEn: TranslationMap = {
    success: 'Success',
    warning: 'Warning',
    error: 'Error',
    info: 'Info',
    loading: 'Loading...',
    login: 'Login',
    logout: 'Logout',
    yes: 'Yes',
    no: 'No',
    enabled: 'Enabled',
    disabled: 'Disabled',
    default: 'Default',
    add: 'Add',
    remove: 'Remove',
    create: 'Create',
    delete: 'Delete',
    edit: 'Edit',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    reset: 'Reset',
    discard_changes: 'Discard Changes',
    open: 'Open',
    close: 'Close',
    back: 'Back',
    forward: 'Forward',
    move_up: 'Move Up',
    move_down: 'Move Down',
    duplicate: 'Duplicate',
    more_details: 'More details',


    error_unauthorized_title: 'Login is required!',
    error_unauthorized_description: [
        { text: 'You must be logged in to access this page.' },
        { text: 'Please click the button below to log in.' }
    ],
    error_forbidden_title: 'Forbidden!',
    error_forbidden_description: [
        { text: 'You do not have authorization to access this page.' },
        { text: 'If you are sure you are authorized, please switch to another account and try again.' }
    ],
    error_not_found_title: 'Page not found!',
    error_not_found_description: [
        { text: 'The specified page could not be found.' },
        { text: 'The URL of the page may have changed or the page itself may have been deleted.' },
        { text: 'Please click the button below to return to the home page.' }
    ],


    home: 'Home',
    back_to_home: 'Back to Home',


    lunaproject: 'Luna Project',
    yudzuki: '結月 -ゆづき-',
    satsuki: '彩月 -さつき-',
    natsuki: '菜月 -なつき-',

    lunaproject_services: 'Luna Project Services',
    lunaproject_document: 'Luna Project Document',
    lunaproject_account: 'Luna Project Account',


    site_settings: 'Site Settings',

    design_and_appearance: 'Design & Appearance',
    device_theme: 'Use device theme',
    light_theme: 'Light Theme',
    dark_theme: 'Dark Theme',

    language: 'Language',
    japanese: '🇯🇵 日本語 (日本)',
    english: '🇺🇸 English (United States)'
};

export const localizationEn: Localization = {
    locale: 'en',
    translations: translationsEn
};
