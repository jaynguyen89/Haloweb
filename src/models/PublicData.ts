interface IPublicData {
    environment: string,
    dateFormats: { [key: number]: string },
    timeFormats: { [key: number]: string },
    numberFormats: { [key: number]: string },
    genders: { [key: number]: string },
    languages: { [key: number]: string },
    themes: { [key: number]: string },
    nameFormats: { [key: number]: string },
    birthFormats: { [key: number]: string },
    unitSystems: { [key: number]: string },
    careerFormats: { [key: number]: string },
    visibilityFormats: { [key: number]: string },
    countries: Array<{
        name: string,
        isoCode2Char: string,
        isoCode3Char: string,
        telephoneCode: string,
    }>,
}

export default IPublicData;
