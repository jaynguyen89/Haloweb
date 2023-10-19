import { Mixins } from '@mui/material';
import { TTranslationMap } from 'src/commons/types';

export interface ITimestamp {
    firstLoginOn: string,
    lastLoginOn: string,
    lastActivityOn: string,
    lastLogoutOn: string,
    lastLogoutMethod: number
}

export interface IMixins extends Mixins {
    shadowLight: string,
    shadowDark: string,
    shadowLightUp: string,
    shadowDarkUp: string,
}

export interface ITranslation {
    translation: TTranslationMap,
    [namespace: string]: TTranslationMap,
}

export interface IMenuItem {
    title: string,
    endpoint?: string,
    separator?: true,
    icon?: string, // use Font-Awesome icon name (ie. user, facebook)
    authenticated?: true,
    children?: Array<Omit<IMenuItem, 'children'>>,
}

export interface IRequestResult<T> {
    status: number,
    data?: object | T,
}

export interface IStorageMessage {
    storageKey: string,
    targetPage: string,
    messageKey: string,
    messageParams?: object,
}
