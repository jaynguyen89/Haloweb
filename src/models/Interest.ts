import { GroupLikeOf } from 'src/commons/types';

export interface IInterest {
    id: string,
    name: string,
    description?: string,
    isHobby: boolean,
    parent?: Omit<IInterest, 'parent'>,
}

export interface IInterestItem {
    id: string,
    name: string,
    isHobby: boolean,
    parentId?: string,
}

export const separateInterestsAndHobbiesAsGroupLike = (items: Array<IInterest>): {
    interests: GroupLikeOf<IInterest>,
    hobbies: GroupLikeOf<IInterest>,
} => {
    const interestGroups: Array<IInterest> = [];
    const hobbyGroups: Array<IInterest> = [];
    items.forEach(item => {
        if (item.parent === null) {
            if (item.isHobby) hobbyGroups.push(item);
            else interestGroups.push(item);
        }
    });

    const interests: Array<GroupLikeOf<IInterest>> = [];
    const hobbies: Array<GroupLikeOf<IInterest>> = [];

    items.forEach(item => {
        if (item.parent !== null) {
            const parent = item.isHobby
                ? hobbyGroups.find(hobby => hobby.id === item.parent!.id)
                : interestGroups.find(interest => interest.id === item.parent!.id);

            const groupItem: GroupLikeOf<IInterest> = {
                parent: parent!.name,
                id: item.id,
                name: item.name,
                description: item.description,
                isHobby: item.isHobby,
            };

            if (item.isHobby) hobbies.push(groupItem);
            else interests.push(groupItem);
        }
    });

    return { interests, hobbies };
};

export const getDefaultGroupLikeItems = (
    ids: Array<string>,
    items: Array<GroupLikeOf<IInterest>>,
): Array<GroupLikeOf<IInterest>> =>  items.filter(item => {
    if (ids.some(id => id === item.id)) return item;
});

export const getItemsToRemoveOrAdd = (
    picks: Array<GroupLikeOf<IInterest>>,
    currents: Array<GroupLikeOf<IInterest>>,
    currentAdditions: Array<GroupLikeOf<IInterest>>,
    currentRemovals: Array<GroupLikeOf<IInterest>>,
    originals: Array<GroupLikeOf<IInterest>>,
): {
    additions: Array<GroupLikeOf<IInterest>>,
    removals: Array<GroupLikeOf<IInterest>>,
} => {
    let newAdditions = [];
    let newRemovals = [];

    if (picks.length === 0) newRemovals = newRemovals.concat(originals);
    else if (originals.length === 0) newAdditions = newAdditions.concat(picks);
    else {
        const tempAdditions = picks.filter(item => !currents.some(x => x.id === item.id));
        const tempRemovals = currents.filter(item => !picks.some(x => x.id === item.id));

        newAdditions = currentAdditions.concat(tempAdditions);

        tempRemovals.forEach(item => {
            if (currentAdditions.some(x => x.id === item.id))
                newAdditions = newAdditions.filter(x => x.id !== item.id);
            else
                newRemovals.push(item);
        });

        newRemovals = newRemovals.concat(currentRemovals);
    }

    return {
        additions: newAdditions,
        removals: newRemovals,
    };
};