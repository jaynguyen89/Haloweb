export interface IOccupationItem {
    id: string,
    parentId?: string,
    name: string,
}

export interface IOccupation {
    id: string,
    parent?: Omit<IOccupation, 'parent'>,
    name: string,
    description?: string,
}

export interface IItemGroup {
    id: string,
    name: string,
    description?: string,
    items: Array<IOccupationItem | IOccupation>,
}

export const toOccupationItemsGroup = (list: Array<IOccupationItem>): Array<IItemGroup> => {
    const groups = list
        .filter(item => !Boolean(item.parentId))
        .map(item => ({
            id: item.id,
            name: item.name,
            items: new Array<IOccupationItem>,
        } as IItemGroup));

    for (const item of list) {
        if (groups.some(entry => entry.id === item.id)) continue;

        const groupIndex = groups.findIndex(entry => entry.id === item.parentId);
        groups[groupIndex].items.push(item);
    }

    return groups;
};

export const toOccupationsGroup = (list: Array<IOccupation>): Array<IItemGroup> => {
    const groups = list
        .filter(item => !Boolean(item.parentId ?? item.parent))
        .map(item => ({
            id: item.id,
            name: item.name,
            description: item.description,
            items: new Array<IOccupation>,
        } as IItemGroup));

    for (const item of list) {
        if (!Boolean(item.parent)) continue;

        const groupIndex = groups.findIndex(entry => entry.id === item.parent!.id);
        groups[groupIndex].items.push(item);
    }

    return groups;
};