import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { lazy, Suspense, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useCommonStyles from 'src/commons/styles';
import Page from 'src/components/atoms/Page/Page';
import { setActiveMenuItem } from 'src/components/compounds/VerticalDrawer/utilities';
import VerticalDrawer from 'src/components/compounds/VerticalDrawer/VerticalDrawer';
import Loading from 'src/components/molecules/StatusIndicators/Loading/Loading';
import useStyles from 'src/pages/ProfilePage/styles';
import { ProfileContents, profileMenu } from 'src/pages/ProfilePage/utilities';

const LoginCredentials = lazy(() => import('src/pages/ProfilePage/AccountSettings/LoginCredentials'));
const SecurityQuestions = lazy(() => import('src/pages/ProfilePage/AccountSettings/SecurityQuestions'));
const TwoFactor = lazy(() => import('src/pages/ProfilePage/AccountSettings/TwoFactor'));
const TrustedDevices = lazy(() => import('src/pages/ProfilePage/AccountSettings/TrustedDevices'));
const VisibilitySettings = lazy(() => import('src/pages/ProfilePage/PrivacySettings/VisibilitySettings'));
const AddressBook = lazy(() => import('src/pages/ProfilePage/ProfileSettings/AddressBook'));
const PaymentMethods = lazy(() => import('src/pages/ProfilePage/ProfileSettings/PaymentMethods'));
const Preferences = lazy(() => import('src/pages/ProfilePage/PrivacySettings/Preferences'));
const ProfileDetails = lazy(() => import('src/pages/ProfilePage/ProfileSettings/ProfileDetails'));

const Profile = () => {
    const commonStyles = useCommonStyles();
    const styles = useStyles();
    const { hash } = useLocation();

    const { menu, content } = useMemo(() => {
        const pageRef = hash || `#${ProfileContents.ProfileDetails}`;
        const pageId = pageRef.slice(1);

        const menu = setActiveMenuItem(profileMenu, pageId, 'link');
        let component: null | React.Component = null;

        switch (pageId) {
            case ProfileContents.ProfileDetails:
                component = <ProfileDetails id={pageId} />;
                break;
            case ProfileContents.AddressBook:
                component = <AddressBook id={pageId} />;
                break;
            case ProfileContents.PaymentMethods:
                component = <PaymentMethods id={pageId} />;
                break;
            case ProfileContents.LoginCredentials:
                component = <LoginCredentials id={pageId} />;
                break;
            case ProfileContents.TwoFactor:
                component = <TwoFactor id={pageId} />;
                break;
            case ProfileContents.SecurityQuestions:
                component = <SecurityQuestions id={pageId} />;
                break;
            case ProfileContents.TrustedDevices:
                component = <TrustedDevices id={pageId} />;
                break;
            case ProfileContents.VisibilitySettings:
                component = <VisibilitySettings id={pageId} />;
                break;
            case ProfileContents.Preferences:
                component = <Preferences id={pageId} />;
                break;
            default:
                component = null;
                break;
        }

        return { menu, content: component };
    }, [hash]);

    return (
        <Page containerClassName={commonStyles.noPadding}>
            <Grid container spacing={3}>
                <Grid item lg={2} md={3} sm={4} xs={12}>
                    <VerticalDrawer menuItems={menu} />
                </Grid>
                <Grid item lg={10} md={9} sm={8} xs={12}>
                    <Box className={styles.profileContent}>
                        <Suspense fallback={<Loading stage='showcase' />}>
                            {content}
                        </Suspense>
                    </Box>
                </Grid>
            </Grid>
        </Page>
    );
};

export default Profile;
