import { IEasternAddress, IWesternAddress } from 'src/models/Address';

export interface IFineAddress {
    id: string,
    isForPostage: boolean,
    isForDelivery: boolean,
    isForReturn: boolean,
    address: IEasternAddress | IWesternAddress,
}

export interface IAddressBook {
    profileId: string,
    addresses: Array<IFineAddress>,
}