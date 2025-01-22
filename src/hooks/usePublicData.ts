import IPublicData from '../models/PublicData';
import { useSelector } from 'react-redux';
import { TRootState } from '../redux/reducers';

export const usePublicData = (key: keyof typeof IPublicData) => {
    const publicData: IPublicData = useSelector((state: TRootState) => state.publicDataStore.publicData);
    return Boolean(publicData) ? publicData[key] : null;
};
