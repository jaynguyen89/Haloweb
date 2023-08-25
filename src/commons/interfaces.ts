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
    icon?: string, // use Font-Awesome icon name (ie. fas fa-user, far fa-facebook)
    endpoint?: string,
    separator?: true,
    children?: Array<Omit<IMenuItem, 'children'>>,
}
