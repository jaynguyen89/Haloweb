import { ITimestamp } from '../commons/interfaces';
import Roles from './enums/roles';

interface IAuthenticatedUser extends ITimestamp {
    isAuthenticated: boolean,
    userId: string,
    username: string,
    avatarName: string,
    fullName: string,
    jwtToken: string,
    authToken: string,
    validityDuration: number,
    authTimestamp: number,
    roles: Array<Roles>,
}

export default IAuthenticatedUser;
