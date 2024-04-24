import { HttpStatusCode } from 'axios';
import {
    isInformationStatusCode,
    isRedirectionStatusCode,
    isServerErrorStatusCode, isSuccessStatusCode,
} from 'src/utilities/otherUtilities';

const infoStatusCodes = Object.values(HttpStatusCode).filter(x => !isNaN(x as any) && x >= 100 && x < 200);
const successStatusCodes = Object.values(HttpStatusCode).filter(x => !isNaN(x as any) && x >= 200 && x < 300);
const redirectStatusCodes = Object.values(HttpStatusCode).filter(x => !isNaN(x as any) && x >= 300 && x < 400);
const serverStatusCodes = Object.values(HttpStatusCode).filter(x => !isNaN(x as any) && x >= 500 && x < 600);

describe('otherUtilities.ts > is[Information/Success/Redirect/Server]StatusCode', () => {
    it('should tell correct information status codes', () => {
        infoStatusCodes.forEach(x => expect(isInformationStatusCode(x as any)).toBeTruthy());

        successStatusCodes.forEach(x => expect(isInformationStatusCode(x as any)).toBeFalsy());
        redirectStatusCodes.forEach(x => expect(isInformationStatusCode(x as any)).toBeFalsy());
        serverStatusCodes.forEach(x => expect(isInformationStatusCode(x as any)).toBeFalsy());
    });

    it('should tell correct success status codes', () => {
        successStatusCodes.forEach(x => expect(isSuccessStatusCode(x as any)).toBeTruthy());

        infoStatusCodes.forEach(x => expect(isSuccessStatusCode(x as any)).toBeFalsy());
        redirectStatusCodes.forEach(x => expect(isSuccessStatusCode(x as any)).toBeFalsy());
        serverStatusCodes.forEach(x => expect(isSuccessStatusCode(x as any)).toBeFalsy());
    });

    it('should tell correct redirect status codes', () => {
        redirectStatusCodes.forEach(x => expect(isRedirectionStatusCode(x as any)).toBeTruthy());

        infoStatusCodes.forEach(x => expect(isRedirectionStatusCode(x as any)).toBeFalsy());
        successStatusCodes.forEach(x => expect(isRedirectionStatusCode(x as any)).toBeFalsy());
        serverStatusCodes.forEach(x => expect(isRedirectionStatusCode(x as any)).toBeFalsy());
    });

    it('should tell correct server status codes', () => {
        serverStatusCodes.forEach(x => expect(isServerErrorStatusCode(x as any)).toBeTruthy());

        infoStatusCodes.forEach(x => expect(isServerErrorStatusCode(x as any)).toBeFalsy());
        redirectStatusCodes.forEach(x => expect(isServerErrorStatusCode(x as any)).toBeFalsy());
        successStatusCodes.forEach(x => expect(isServerErrorStatusCode(x as any)).toBeFalsy());
    });
});
