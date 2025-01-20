import { useSelector } from 'react-redux';
import { TRootState } from '../redux/reducers';
import { IStageStore } from '../redux/reducers/stageReducer';
import { ISiteWideMessage } from 'src/commons/interfaces';

const useStage = () => {
    const stageStore: IStageStore = useSelector((state: TRootState) => state.stageStore);
    return stageStore.stages;
};

export const useGetStageByName = (name: string) => {
    const stages = useStage();
    const stage = stages.filter(stage => stage.name === name);
    return stage.length === 0 ? undefined : stage[0];
};

export const useIsStageIncluded = (stage: string) => {
    const stages = useStage();
    return stages.some(member => member.name === stage);
};

export const useSiteWideMessage = () => {
    const message: ISiteWideMessage = useSelector((state: TRootState) => state.stageStore.siteWideMessage);
    return message;
};