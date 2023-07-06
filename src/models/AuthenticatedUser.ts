import { ITimestamp } from 'src/commons/interfaces';
import Roles from 'src/models/enums/roles';

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
