import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SocialIcons from 'src/components/atoms/SocialIcons/SocialIcons';
import useStyles, { helpBoxSx } from 'src/components/compounds/AuthSocialAccounts/styles';

interface IRegistrationBySocialAccount {
    destination: string,
    socialAccountNames: Array<string>,
}

const AuthSocialAccounts = ({
    destination,
    socialAccountNames,
}: IRegistrationBySocialAccount) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const icons = useMemo(() => socialAccountNames.map(name => ({ iconName: name.toLowerCase() })), [socialAccountNames]);

    const isLoginPage = useMemo(() => destination === 'LoginPage', [destination]);
    const title = useMemo(() => isLoginPage ? 'login-page.social-login-text' : 'registration-page.social-registration-text', [isLoginPage]);
    const style = useMemo(() => isLoginPage ? styles.socialLogins : helpBoxSx, [isLoginPage]);

    return (
        <Box sx={style}>
            <p>{t(title)}</p>
            <SocialIcons
                icons={icons}
            />
        </Box>
    );
};

export default AuthSocialAccounts;
