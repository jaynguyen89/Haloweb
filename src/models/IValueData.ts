export interface IValueData {
    boolValue: boolean,
    byteValue: number, // to update api Enum
    intValue?: number,
    strValue?: string,
    strValues?: Array<string>,
    intValueMaps?: Map<int, string>,
    strValueMaps?: Map<string, string>,
}