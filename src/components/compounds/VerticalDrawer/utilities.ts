import { IconName } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type TVerticalDrawerMenuItem = {
    isActive?: true,
    text: string,
    icon?: IconName | IconDefinition | string,
    link?: string,
    onClick?: () => void,
    subMenu?: Array<Omit<TVerticalDrawerMenuItem, 'subMenu'>>,
};

export type TVerticalDrawerMenu = {
    title: string,
    items: Array<TVerticalDrawerMenuItem>,
    divider?: true,
};

export const setActiveMenuItem = (
    menuItems: Array<TVerticalDrawerMenu>,
    keyword: string,
    searchBy: 'text' | 'link',
    inSubMenu: boolean = false,
): Array<TVerticalDrawerMenu> => {
    /* eslint-disable max-depth */
    for (const menuItem of menuItems)
        for (const item of menuItem.items)
            if (item.isActive) {
                item.isActive = undefined;

                if (item.hasOwnProperty('subMenu'))
                    for (const subMenuItem of item.subMenu!)
                        if (subMenuItem.isActive) subMenuItem.isActive = undefined;

                break;
            }
    /* eslint-enable max-depth */

    if (!inSubMenu) {
        for (const menuItem of menuItems)
            for (const item of menuItem.items) {
                if (searchBy === 'text' && item.text.includes(keyword))
                    item.isActive = true;

                if (searchBy === 'link' && item.link!.includes(keyword))
                    item.isActive = true;

                if (item.isActive) break;
            }

        return menuItems;
    }

    for (const menuItem of menuItems)
        for (const item of menuItem.items)
            if (item.hasOwnProperty('subMenu')) {
                for (const subMenuItem of item.subMenu!) {
                    if (searchBy === 'text' && subMenuItem.text.includes(keyword))
                        subMenuItem.isActive = true;

                    if (searchBy === 'link' && item.link!.includes(keyword))
                        subMenuItem.isActive = true;

                    if (subMenuItem.isActive) {
                        item.isActive = true;
                        break;
                    }
                }
            }

    return menuItems;
};
