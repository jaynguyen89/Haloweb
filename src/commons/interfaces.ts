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
