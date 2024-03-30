export type TPublicDataFormat = {
    index?: number,
    code?: string,
    display: string,
};

interface IPublicData {
    environment: string,
    enableSecretCode: boolean,
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
}

export default IPublicData;
