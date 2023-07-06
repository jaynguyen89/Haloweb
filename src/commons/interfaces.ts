import { Mixins } from '@mui/material';

export interface ITimestamp {
    firstLoginOn: string,
    lastLoginOn: string,
    lastActivityOn: string,
    lastLogoutOn: string,
    lastLogoutMethod: number
}

export interface IMixins extends Mixins {
    shadowLight: string,
    shadowDark?: string,
}
