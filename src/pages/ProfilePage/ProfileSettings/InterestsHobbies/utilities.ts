import { GroupLikeOf } from 'src/commons/types';
import { IInterest } from 'src/models/Interest';
import { Dispatch } from 'redux';
import { IAuthorization } from 'src/models/Authentication';
import { sendRequestToUpdateProfileDetails } from 'src/redux/actions/profileActions';
import { ActionType } from 'src/models/enums/apiEnums';
import { IProfileUpdateData } from 'src/models/Profile';

export const updateProfileInterestsOrHobbies = async (
    itemsToAdd: Array<GroupLikeOf<IInterest>>,
    itemsToRemove: Array<GroupLikeOf<IInterest>>,
    dispatch: Dispatch,
    authorization: IAuthorization,
    profileId: string,
): Promise<ActionType | boolean> => {
    if (itemsToAdd.length !== 0) {
        const additionData: IProfileUpdateData = {
            fieldName: 'Interests',
            actionType: ActionType.Add,
            strValues: itemsToAdd.map((item) => item.id),
        };

        const additionResult = await sendRequestToUpdateProfileDetails(dispatch, authorization, profileId, additionData);
        if (typeof additionResult === 'string') return ActionType.Add;

        const removalData: IProfileUpdateData = {
            fieldName: 'Interests',
            actionType: ActionType.Remove,
            strValues: itemsToRemove.map((item) => item.id),
        };

        const removalResult = await sendRequestToUpdateProfileDetails(dispatch, authorization, profileId, removalData);
        if (typeof removalResult === 'string') return ActionType.Remove;

        return true;
    }
};