export type TPublicDataFormat = {
    index?: number,
    code?: string,
    display: string,
};

interface IPublicData {
    environment: string,
    secretCodeEnabled: boolean,
    secretCodeLength: number,
    dateFormats: Array<TPublicDataFormat>,
    timeFormats: Array<TPublicDataFormat>,
    numberFormats: Array<TPublicDataFormat>,
    genders: Array<TPublicDataFormat>,
    languages: Array<TPublicDataFormat>,
    themes: Array<TPublicDataFormat>,
    nameFormats: Array<TPublicDataFormat>,
    birthFormats: Array<TPublicDataFormat>,
    unitSystems: Array<TPublicDataFormat>,
    careerFormats: Array<TPublicDataFormat>,
    visibilityFormats: Array<TPublicDataFormat>,
    countries: Array<{
        name: string,
        isoCode2Char: string,
        isoCode3Char: string,
        telephoneCode: string,
    }>,
    supportedSocialAccounts: Array<string>,
}

export default IPublicData;

export const publicDataMock = {
    environment: 'jest',
    secretCodeEnabled: false,
    secretCodeLength: 6,
    dateFormats: [
        {
            index: 0,
            display: 'dd MMM yyyy',
        },
        {
            index: 1,
            display: 'dd/MM/yyyy',
        },
        {
            index: 2,
            display: 'dd-MM-yyyy',
        },
    ],
    timeFormats: [
        {
            index: 0,
            display: 'HH:mm tt',
        },
        {
            index: 1,
            display: 'HH.mm tt',
        },
    ],
    numberFormats: [
        {
            index: 0,
            display: '{0:#,##0.##}',
        },
        {
            index: 1,
            display: '{0:#,##}',
        },
    ],
    genders: [
        {
            index: 0,
            display: 'Masculine',
        },
        {
            index: 1,
            display: 'Feminine',
        },
    ],
    languages: [
        {
            code: 'en',
            display: 'English',
        },
        {
            code: 'vi',
            display: 'Vietnamese',
        },
        {
            code: 'ha',
            display: 'Halogeno',
        },
    ],
    themes: [
        {
            index: 0,
            display: 'Light',
        },
        {
            index: 1,
            display: 'Dark',
        },
        {
            index: 2,
            display: 'Loom',
        },
    ],
    nameFormats: [
        {
            index: 0,
            display: 'Full',
        },
        {
            index: 1,
            display: 'Hidden',
        },
    ],
    birthFormats: [
        {
            index: 0,
            display: 'Date only',
        },
        {
            index: 1,
            display: 'Age only',
        },
    ],
    unitSystems: [
        {
            index: 0,
            display: 'Metric',
        },
        {
            index: 1,
            display: 'Shit',
        },
    ],
    careerFormats: [
        {
            index: 0,
            display: 'Hidden',
        },
        {
            index: 1,
            display: 'Shown',
        },
    ],
    visibilityFormats: [
        {
            index: 0,
            display: 'Anonymous',
        },
        {
            index: 0,
            display: 'Identified',
        },
    ],
    countries: [
        {
            name: 'Australia',
            isoCode2Char: 'au',
            isoCode3Char: 'aus',
            telephoneCode: '61',
        },
        {
            name: 'Vietnam',
            isoCode2Char: 'vn',
            isoCode3Char: 'vnm',
            telephoneCode: '84',
        },
        {
            name: 'Halogen',
            isoCode2Char: 'hg',
            isoCode3Char: 'hgn',
            telephoneCode: '99',
        },
    ],
    supportedSocialAccounts: ['Facebook', 'Google'],
};
