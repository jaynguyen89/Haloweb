import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import useAuthorization from 'src/hooks/useAuthorization';
import { useInterests } from 'src/hooks/useInterest';
import { batch, connect, useDispatch } from 'react-redux';
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
import { GroupLikeOf, SavableStatus } from 'src/commons/types';
import _cloneDeep from 'lodash/cloneDeep';
import { updateProfileInterestsOrHobbies } from 'src/pages/ProfilePage/ProfileSettings/InterestsHobbies/utilities';
import { ActionType } from 'src/models/enums/apiEnums';

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
    const [savingStatus, setSavingStatus] = useState<SavableStatus | undefined>(undefined);

    useEffect(() => {
        if (Boolean(authorization) && profileId)
            surrogate(dispatch, sendRequestToGetProfileInterests(authorization, profileId));
    }, [authorization, profileId]);

    const { interests, hobbies } = useMemo(() => separateInterestsAndHobbiesAsGroupLike(interestList), [interestList]);
    const interestsChanged = useMemo(() => interestsToRemove.length !== 0 || interestsToAdd.length !== 0, [interestsToRemove, interestsToAdd]);
    const hobbiesChanged = useMemo(() => hobbiesToRemove.length !== 0 || hobbiesToAdd.length !== 0, [hobbiesToRemove, hobbiesToAdd]);

    const originalInterests = useMemo(
        () => getDefaultGroupLikeItems(profileInterests.map(x => x.id), interests),
        [profileInterests, interests],
    );
    const formInterests = useMemo(() => {
        let filteredInterests = interests.filter(interest => {
            if (!profileInterests.some(x => x.id === interest.id)) return interest;
        });

        filteredInterests = filteredInterests.concat(interestsToRemove);
        filteredInterests = filteredInterests.filter(interest => {
            if (!interestsToAdd.some(x => x.id === interest.id)) return interest;
        });

        return filteredInterests;
    }, [interests, profileInterests, interestsToRemove, interestsToAdd]);

    const originalHobbies = useMemo(
        () => getDefaultGroupLikeItems(profileInterests.map(x => x.id), hobbies),
        [profileInterests, hobbies],
    );
    const formHobbies = useMemo(
        () => hobbies.filter(hobby => {
            if (!profileInterests.some(x => x.id === hobby.id)) return hobby;
        }),
        [hobbies, profileInterests, hobbiesToRemove, hobbiesToAdd],
    );

    const defaultInterests = useMemo(() => {
        let initialItems = _cloneDeep(originalInterests);
        initialItems = initialItems.filter(item => !interestsToRemove.some(x => x.id === item.id));
        initialItems = initialItems.concat(interestsToAdd);

        return initialItems;
    }, [originalInterests, interestsToRemove, interestsToAdd]);

    const defaultHobbies = useMemo(() => {
        let initialItems = _cloneDeep(originalHobbies);
        initialItems = initialItems.filter(item => !hobbiesToRemove.some(x => x.id === item.id));
        initialItems = initialItems.concat(hobbiesToAdd);

        return initialItems;
    }, [originalHobbies, hobbiesToRemove, hobbiesToAdd]);

    const handleItemsChange = useCallback((itemType: ItemType, values: Array<GroupLikeOf<IInterest>>) => {
        setSavingStatus(undefined);

        if (itemType === ItemType.Interests)
            batch(() => {
                setHobbiesToRemove([]);
                setHobbiesToAdd([]);
            });
        else
            batch(() => {
                setInterestsToRemove([]);
                setInterestsToAdd([]);
            });

        const { additions, removals } = getItemsToRemoveOrAdd(
            values,
            itemType === ItemType.Interests ? defaultInterests : defaultHobbies,
            itemType === ItemType.Interests ? interestsToAdd : hobbiesToAdd,
            itemType === ItemType.Interests ? interestsToRemove : hobbiesToRemove,
            itemType === ItemType.Interests ? originalInterests : originalHobbies,
        );

        if (itemType === ItemType.Interests)
            batch(() => {
                setInterestsToRemove(removals);
                setInterestsToAdd(additions);
            });
        else
            batch(() => {
                setHobbiesToRemove(removals);
                setHobbiesToAdd(additions);
            });
    }, [defaultInterests, defaultHobbies]);

    const handleSaveChanges = async () => {
        setSavingStatus({ saving: true, success: false });
        let result: ActionType | boolean;

        if (interestsToRemove.length !== 0 || interestsToAdd.length !== 0)
            result = await updateProfileInterestsOrHobbies(
                interestsToAdd,
                interestsToRemove,
                dispatch,
                authorization,
                profileId,
            );
        else
            result = await updateProfileInterestsOrHobbies(
                hobbiesToAdd,
                hobbiesToRemove,
                dispatch,
                authorization,
                profileId,
            );

        if (typeof result === 'boolean') batch(() => {
            setHobbiesToRemove([]);
            setHobbiesToAdd([]);
            setInterestsToRemove([]);
            setInterestsToAdd([]);
            setSavingStatus({ saving: false, success: true });
            surrogate(dispatch, sendRequestToGetProfileInterests(authorization, profileId));
        });
        else setSavingStatus({ saving: false, success: false });
    };

    return (
        <div className='profile-form'>
            <h2>{t(`profile-page.${id}.heading`)}</h2>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {isGetProfileInterestsFailed && (
                        <Flasher stage={Stages.SHOWCASE} message={t(`profile-page.${id}.interest-list-loading-failed`)} />
                    )}

                    {savingStatus?.success && (
                        <Flasher stage={Stages.SHOWCASE} message={t(`profile-page.${id}.interest-saving-failed`)} />
                    )}

                    {(isLoadingProfileInterests && <FormSkeleton />) || (
                        <Grid container spacing={2}>
                            {formInterests.length !== 0 && (
                                <ItemSelector
                                    id={id}
                                    items={formInterests}
                                    values={defaultInterests}
                                    onItemSelected={(_, vals) => handleItemsChange(ItemType.Interests, vals)}
                                    changed={interestsChanged}
                                    onSave={() => handleSaveChanges(ItemType.Interests)}
                                    status={savingStatus}
                                />
                            )}

                            {formHobbies.length !== 0 && (
                                <ItemSelector
                                    id={id}
                                    items={formHobbies}
                                    values={defaultHobbies}
                                    onItemSelected={(_, vals) => handleItemsChange(ItemType.Hobbies, vals)}
                                    changed={hobbiesChanged}
                                    onSave={() => handleSaveChanges(ItemType.Hobbies)}
                                    status={savingStatus}
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