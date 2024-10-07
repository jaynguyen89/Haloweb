import {
    DateValidator, EmailValidator, FileListValidator, FileValidator,
    InputData,
    RangeValidator, SpecialValidator,
    TDateOption, TFieldToValidatorMap, TFileListOption, TFileOption,
    TFormDataState,
    TRangeOption, TSpecialOption,
    TValidatorOption,
    TValidatorOptionsMapFn, UrlValidator, ValidatorNames,
} from 'src/utilities/data-validators/dataValidators';
import IPublicData from 'src/models/PublicData';
import { DateTime } from 'luxon';
import { TDateFormat } from 'src/commons/types';
import { Blob } from 'blob-polyfill';

export const mockPublicData: IPublicData = {
    environment: 'jest',
    secretCodeEnabled: false,
    secretCodeLength: 1,
    dateFormats: [{ display: '' }],
    timeFormats: [{ display: '' }],
    numberFormats: [{ display: '' }],
    genders: [{ display: '' }],
    languages: [{ display: '' }],
    themes: [{ display: '' }],
    nameFormats: [{ display: '' }],
    birthFormats: [{ display: '' }],
    unitSystems: [{ display: '' }],
    careerFormats: [{ display: '' }],
    visibilityFormats: [{ display: '' }],
    countries: [{
        name: '',
        isoCode2Char: '',
        isoCode3Char: '',
        telephoneCode: '',
    }],
};

export enum MockFieldNames {
    Name = 'Name',
    DateTime = 'DateTime',
    Password = 'Password',
    PasswordConfirm = 'PasswordConfirm',
    Email = 'Email',
    Phone = 'Phone',
    Url = 'Url',
    File = 'File',
    FileList = 'FileList',
    Text = 'Text',
}

export type TMockFieldKey = Omit<typeof MockFieldNames, 'PasswordConfirm'>;

export const file1 = new Blob([], { type: 'image/png' });
file1.name = 'test1.png';
Object.defineProperty(file1, 'size', { value: 10001, writable: false });
export const file2 = new Blob([], { type: 'image/tiff' });
file2.name = 'test2.tiff';
Object.defineProperty(file2, 'size', { value: 10000, writable: false });

export const mockFormData: TFormDataState<typeof MockFieldNames> = {
    [MockFieldNames.Name]: { value: 'J-est O\'Test' },
    [MockFieldNames.DateTime]: { value: new Date() },
    [MockFieldNames.Password]: { value: 'P@ssw0rd!' },
    [MockFieldNames.PasswordConfirm]: { value: 'An0th3r!' },
    [MockFieldNames.Email]: { value: 'example@domain.com' },
    [MockFieldNames.Phone]: { value: '0422333444' },
    [MockFieldNames.Url]: { value: 'https://ww1.any-thing.com/%20%/param?key=value' },
    [MockFieldNames.File]: { value: file2 },
    [MockFieldNames.FileList]: { value: [file1, file2] as any },
    [MockFieldNames.Text]: { value: '' },
};

const date1 = DateTime.fromJSDate(new Date()).minus({ days: 2 }).toJSDate();
const date2 = DateTime.fromJSDate(new Date()).plus({ days: 2 }).toJSDate();

export const mockValidatorOptionsMapFn: TValidatorOptionsMapFn<TMockFieldKey> = (): TValidatorOption<TMockFieldKey> => ({
    [MockFieldNames.Name]: {
        min: 5,
        max: 10,
        specialCharsToInclude: '\'.-',
    } as TSpecialOption,
    [MockFieldNames.DateTime]: {
        afterDate: date1,
        beforeDate: date2,
    } as TDateOption,
    [MockFieldNames.Password]: {
        isPassword: true,
        min: 5,
        max: 10,
        withSpace: false,
        withNumber: true,
        withLowercaseChar: true,
        withUppercaseChar: true,
        withSpecialChar: true,
        specialCharsToInclude: '!@#',
    } as TRangeOption & TSpecialOption,
    [MockFieldNames.Email]: {
        min: 5,
        max: 50,
    } as TRangeOption,
    [MockFieldNames.Phone]: {
        equal: 10,
        numbersOnly: true,
        pattern: '0([\\d]{3})( ?)([\\d]{3})( ?)([\\d]{3})',
    } as TRangeOption,
    [MockFieldNames.Url]: {
        min: 5,
        max: 50,
    } as TRangeOption,
    [MockFieldNames.File]: {
        maxSize: 10000,
        acceptedFormats: ['png'],
    } as TFileOption,
    [MockFieldNames.FileList]: {
        maxSize: 10000,
        acceptedFormats: ['png', 'jpg'],
    } as TFileListOption,
    [MockFieldNames.Text]: {
        max: 150,
    } as TRangeOption,
});

export const mockFieldToValidatorMap = {
    [MockFieldNames.Name]: ValidatorNames.SpecialValidator,
    [MockFieldNames.DateTime]: ValidatorNames.DateValidator,
    [MockFieldNames.Password]: ValidatorNames.SpecialValidator,
    [MockFieldNames.Email]: ValidatorNames.EmailValidator,
    [MockFieldNames.Phone]: ValidatorNames.RangeValidator,
    [MockFieldNames.Url]: ValidatorNames.UrlValidator,
    [MockFieldNames.File]: ValidatorNames.FileValidator,
    [MockFieldNames.FileList]: ValidatorNames.FileListValidator,
    [MockFieldNames.Text]: ValidatorNames.RangeValidator,
};

export const mockValidatorOptionsMap = mockValidatorOptionsMapFn();

export const expectation: TFieldToValidatorMap<TMockFieldKey> = {
    [MockFieldNames.Name]: new SpecialValidator(
        new InputData(mockFormData[MockFieldNames.Name].value as unknown as string),
        mockValidatorOptionsMap[MockFieldNames.Name] as TSpecialOption,
    ),
    [MockFieldNames.DateTime]: new DateValidator(
        new InputData(mockFormData[MockFieldNames.DateTime].value as unknown as Date),
        mockValidatorOptionsMap[MockFieldNames.DateTime] as TDateOption,
        {
            formats: { date: 0, time: 0 },
        } as TDateFormat,
    ),
    [MockFieldNames.Password]: new SpecialValidator(
        new InputData(mockFormData[MockFieldNames.Password].value as unknown as string),
        {
            ...mockValidatorOptionsMap[MockFieldNames.Password],
            among: [mockFormData[MockFieldNames.PasswordConfirm].value],
        } as unknown as TSpecialOption,
    ),
    [MockFieldNames.Email]: new EmailValidator(
        new InputData(mockFormData[MockFieldNames.Email].value as unknown as string),
        mockValidatorOptionsMap[MockFieldNames.Email] as TRangeOption,
    ),
    [MockFieldNames.Phone]: new RangeValidator(
        new InputData(mockFormData[MockFieldNames.Phone].value as unknown as string),
        mockValidatorOptionsMap[MockFieldNames.Phone] as TRangeOption,
    ),
    [MockFieldNames.Url]: new UrlValidator(
        new InputData(mockFormData[MockFieldNames.Url].value as unknown as string),
        mockValidatorOptionsMap[MockFieldNames.Url] as TRangeOption,
    ),
    [MockFieldNames.File]: new FileValidator(
        new InputData(mockFormData[MockFieldNames.File].value as unknown as File),
        mockValidatorOptionsMap[MockFieldNames.File] as TFileOption,
    ),
    [MockFieldNames.FileList]: new FileListValidator(
        new InputData(mockFormData[MockFieldNames.FileList].value as any),
        mockValidatorOptionsMap[MockFieldNames.FileList] as TFileListOption,
    ),
    [MockFieldNames.Text]: new RangeValidator(
        new InputData(mockFormData[MockFieldNames.Text].value as unknown as string),
        mockValidatorOptionsMap[MockFieldNames.Text] as TRangeOption,
    ),
};
