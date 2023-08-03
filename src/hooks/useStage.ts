import { useSelector } from 'react-redux';
import { TRootState } from '../redux/reducers';
import { IStageStore } from '../redux/reducers/stageReducer';

export const useStage = () => {
    const stageStore: IStageStore = useSelector((state: TRootState) => state.stageStore);
    return stageStore.stages;
};

export const useIsStageIncluded = (stage: string) => {
    const stages = useStage();
    return stages.some(member => member.name === stage);
};
