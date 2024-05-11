import { Localization } from '../index';
import { TranslationMap } from '../translation';

export const translationsJa: TranslationMap = {
    success: '成功',
    warning: '警告',
    error: 'エラー',
    info: '情報',
    loading: '読み込み中...',
    login: 'ログイン',
    logout: 'ログアウト',
    yes: 'はい',
    no: 'いいえ',
    enabled: '有効',
    disabled: '無効',
    default: 'デフォルト',
    add: '追加',
    remove: '削除',
    create: '作成',
    delete: '削除',
    edit: '編集',
    confirm: '確認',
    cancel: 'キャンセル',
    save: '保存',
    reset: 'リセット',
    discard_changes: '変更を破棄する',
    open: '開く',
    close: '閉じる',
    back: '戻る',
    forward: '進む',
    move_up: '上に移動',
    move_down: '下に移動',
    duplicate: '複製',
    more_details: '詳しくはこちら',


    error_unauthorized_title: 'ログインが必要です',
    error_unauthorized_description: [
        { text: 'このページにアクセスするにはログインが必要です。' },
        { text: '下のボタンを押してログインをしてください。' }
    ],
    error_forbidden_title: '権限がありません',
    error_forbidden_description: [
        { text: 'このページにアクセスするための権限がありません。' },
        { text: 'あなたに権限が付与されていることが確実な場合は、ほかのアカウントに切り替えて再度お試しください。' }
    ],
    error_not_found_title: 'ページが見つかりません',
    error_not_found_description: [
        { text: '指定されたページが見つかりませんでした。' },
        { text: 'ページの URL が変更されたか、ページそのものが削除された可能性があります。' },
        { text: 'お手数ですが、下のボタンを押してホームに戻ってください。' }
    ],


    home: 'ホーム',
    back_to_home: 'ホームに戻る',


    lunaproject: 'Luna Project',
    yudzuki: '結月 -ゆづき-',
    satsuki: '彩月 -さつき-',
    natsuki: '菜月 -なつき-',

    lunaproject_services: 'Luna Project のサービス',
    lunaproject_document: 'Luna Project ドキュメント',
    lunaproject_account: 'Luna Project アカウント',


    site_settings: 'サイトの設定',

    design_and_appearance: 'デザインと外観',
    device_theme: 'デバイスのモードを利用する',
    light_theme: 'ライトテーマ',
    dark_theme: 'ダークテーマ',

    language: '言語',
    japanese: '🇯🇵 日本語 (日本)',
    english: '🇺🇸 English (United States)'
};

export const localizationJa: Localization = {
    locale: 'ja',
    translations: translationsJa
};
