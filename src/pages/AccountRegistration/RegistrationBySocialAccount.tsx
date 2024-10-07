import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SocialIcons from 'src/components/atoms/SocialIcons/SocialIcons';
import IPublicData from 'src/models/PublicData';
import { helpBoxSx } from 'src/pages/AccountRegistration/styles';

interface IRegistrationBySocialAccount {
    publicData: IPublicData,
}

const RegistrationBySocialAccount = ({ publicData }: IRegistrationBySocialAccount) => {
    const { t } = useTranslation();
    const icons = useMemo(() => publicData.supportedSocialAccounts.map(x => ({ iconName: x.toLowerCase() })), [publicData.supportedSocialAccounts]);

    return (
        <Box sx={helpBoxSx}>
            <p>{t('registration-page.social-registration-text')}</p>
            <SocialIcons
                icons={icons}
            />
        </Box>
    );
};

export default RegistrationBySocialAccount;
