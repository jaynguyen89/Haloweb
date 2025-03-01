import { GroupLikeOf } from 'src/commons/types';
import { IInterest } from 'src/models/Interest';
import SavableAutocomplete from 'src/components/molecules/SavableAutocomplete/SavableAutocomplete';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled, lighten, darken } from '@mui/system';
import { AutocompleteValue } from '@mui/material/useAutocomplete/useAutocomplete';

type TItemSelectorProps = {
    id: string,
    items: Array<GroupLikeOf<IInterest>>,
    values: Array<GroupLikeOf<IInterest>>,
    onItemSelected: (
        event: React.SyntheticEvent,
        value: AutocompleteValue<GroupLikeOf<IInterest>, true, true, true>,
    ) => void,
    changed: boolean,
};

const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    backgroundColor: lighten(theme.palette.info.main, 0.85),
    ...theme.applyStyles('dark', {
        backgroundColor: darken(theme.palette.primary.main, 0.8),
    }),
}));

const GroupItems = styled('ul')({
    padding: 0,
});

const ItemSelector = ({ items, id, values, onItemSelected, changed }: TItemSelectorProps) => {
    const { t } = useTranslation();

    const sortedItems = items.sort((former, latter) => former.parent.localeCompare(latter.parent));

    return (
        <Grid item md={12} sm={12} xs={12}>
            <SavableAutocomplete
                changed={changed}
                asCheckbox
                textFieldProps={{
                    fullWidth: true,
                    label: t(`profile-page.${id}.interests-label`),
                }}
                autocompleteProps={{
                    id: 'interests',
                    options: sortedItems,
                    getOptionLabel: (option) => option?.name,
                    groupBy: (option) => option.parent,
                    renderGroup: (params) => (
                        <li key={params.key}>
                            <GroupHeader>{params.group}</GroupHeader>
                            <GroupItems>{params.children}</GroupItems>
                        </li>
                    ),
                    value: values,
                    onChange: onItemSelected,
                }}
            />
        </Grid>
    );
};

export default ItemSelector;