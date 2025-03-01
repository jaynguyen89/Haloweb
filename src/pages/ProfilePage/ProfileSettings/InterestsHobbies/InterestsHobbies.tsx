import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import useAuthorization from 'src/hooks/useAuthorization';
import { useInterests } from 'src/hooks/useInterest';
import { connect, useDispatch } from 'react-redux';
import { TRootState } from 'src/redux/reducers';
import { surrogate } from 'src/utilities/otherUtilities';
import { sendRequestToGetProfileInterests } from 'src/redux/actions/interestActions';
import { useIsStageIncluded } from 'src/hooks/useStage';
import Stages from 'src/models/enums/stage';
import {
    getDefaultGroupLikeItems,
    getItemsToRemoveOrAdd,
    IInterest,
    separateInterestsAndHobbiesAsGroupLike,
} from 'src/models/Interest';
import ItemSelector from 'src/pages/ProfilePage/ProfileSettings/InterestsHobbies/ItemSelector';
import FormSkeleton from 'src/components/atoms/Skeletons/FormSkeleton';
import Flasher from 'src/components/molecules/StatusIndicators/Flasher';
import { GroupLikeOf } from 'src/commons/types';
import _cloneDeep from 'lodash/cloneDeep';

type TInterestsHobbiesProps = {
    id: string,
};

const mapStateToProps = (state: TRootState) => ({
    profileInterests: state.interestStore.profileInterests,
});

enum ItemType {
    Interests,
    Hobbies,
}

export const InterestsHobbies = ({
    id,
    profileInterests,
}: TInterestsHobbiesProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { authorization, profileId } = useAuthorization();
    const interestList = useInterests();

    const isLoadingProfileInterests = useIsStageIncluded(Stages.REQUEST_TO_GET_PROFILE_INTERESTS_BEGIN);
    const isGetProfileInterestsFailed = useIsStageIncluded(Stages.REQUEST_TO_GET_PROFILE_INTERESTS_FAILED);

    const [interestsToRemove, setInterestsToRemove] = useState<Array<GroupLikeOf<IInterest>>>([]);
    const [interestsToAdd, setInterestsToAdd] = useState<Array<GroupLikeOf<IInterest>>>([]);
    const [hobbiesToRemove, setHobbiesToRemove] = useState<Array<GroupLikeOf<IInterest>>>([]);
    const [hobbiesToAdd, setHobbiesToAdd] = useState<Array<GroupLikeOf<IInterest>>>([]);

    useEffect(() => {
        if (Boolean(authorization) && profileId)
            surrogate(dispatch, sendRequestToGetProfileInterests(authorization, profileId));
    }, [authorization, profileId]);

    const { interests, hobbies } = useMemo(() => separateInterestsAndHobbiesAsGroupLike(interestList), [interestList]);
    const interestsChanged = useMemo(() => interestsToRemove.length !== 0 || interestsToAdd.length !== 0, [interestsToRemove, interestsToAdd]);
    const hobbiesChanged = useMemo(() => hobbiesToRemove.length !== 0 || hobbiesToAdd.length !== 0, [hobbiesToRemove, hobbiesToAdd]);

    const originalInterests = useMemo(() => getDefaultGroupLikeItems(profileInterests, interests), [profileInterests, interests]);
    const originalHobbies = useMemo(() => getDefaultGroupLikeItems(profileInterests, hobbies), [profileInterests, hobbies]);

    const defaultInterests = useMemo(() => {
        let initialItems = _cloneDeep(originalInterests);
        initialItems = initialItems.filter(item => !interestsToRemove.includes(item));
        initialItems = initialItems.concat(interestsToAdd);

        return initialItems;
    }, [originalInterests, interestsToRemove, interestsToAdd]);

    const defaultHobbies = useMemo(() => {
        let initialItems = _cloneDeep(originalHobbies);
        initialItems = initialItems.filter(item => !hobbiesToRemove.includes(item));
        initialItems = initialItems.concat(hobbiesToAdd);

        return initialItems;
    }, [originalHobbies, hobbiesToRemove, hobbiesToAdd]);

    const handleItemsChange = useCallback((itemType: ItemType, values: Array<GroupLikeOf<IInterest>>) => {
        const { additions, removals } = getItemsToRemoveOrAdd(
            values,
            itemType === ItemType.Interests ? defaultInterests : defaultHobbies,
            itemType === ItemType.Interests ? interestsToAdd : hobbiesToAdd,
            itemType === ItemType.Interests ? interestsToRemove : hobbiesToRemove,
            itemType === ItemType.Interests ? originalInterests : originalHobbies,
        );

        if (itemType === ItemType.Interests) {
            setInterestsToRemove(removals);
            setInterestsToAdd(additions);
        }
        else {
            setHobbiesToRemove(removals);
            setHobbiesToAdd(additions);
        }
    }, [defaultInterests, defaultHobbies]);

    return (
        <div className='profile-form'>
            <h2>{t(`profile-page.${id}.heading`)}</h2>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {isGetProfileInterestsFailed && (
                        <Flasher stage={Stages.SHOWCASE} message={t(`profile-page.${id}.interest-list-loading-failed`)} />
                    )}

                    {(isLoadingProfileInterests && <FormSkeleton />) || (
                        <Grid container spacing={2}>
                            <ItemSelector
                                id={id}
                                items={interests}
                                values={defaultInterests}
                                onItemSelected={(_, vals) => handleItemsChange(ItemType.Interests, vals)}
                                changed={interestsChanged}
                            />

                            {hobbies.length !== 0 && (
                                <ItemSelector
                                    id={id}
                                    items={hobbies}
                                    values={defaultHobbies}
                                    onItemSelected={(_, vals) => handleItemsChange(ItemType.Hobbies, vals)}
                                    changed={hobbiesChanged}
                                />
                            )}
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default connect(mapStateToProps)(InterestsHobbies);