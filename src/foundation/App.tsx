import { ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import DimOverlay from 'src/components/atoms/DimOverlay';
import Flasher from 'src/components/molecules/StatusIndicators/Flasher';
import Loading from 'src/components/molecules/StatusIndicators/Loading/Loading';
import Toast from 'src/components/molecules/StatusIndicators/Toast';
import { prefetchLanguageOnLaunch } from 'src/redux/actions/languageActions';
import { TRootState } from 'src/redux/reducers';
import { IThemeStore } from 'src/redux/reducers/themeReducer';
import NavigationBar from 'src/components/compounds/NavigationBar/NavigationBar';
import Routers from 'src/foundation/Routers';
import Footer from 'src/components/compounds/Footer/Footer';
import Header from 'src/components/compounds/Header/Header';
import 'src/foundation/app.scss';
import { useIsStageIncluded } from 'src/hooks/useStage';
import Stages from 'src/models/enums/stage';
import { surrogate } from 'src/utilities/otherUtilities';
import { loginPageName } from 'src/pages/LoginPage/LoginPage';
import { setSiteWideMessage } from '../redux/actions/stageActions';

const mapStateToProps = (state: TRootState) => ({
    authorization: state.authenticationStore.authorization,
});

const App = ({
    authorization,
}: ReturnType<typeof mapStateToProps>) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const defaultTheme = useSelector((state: TRootState) => (state.themeStore as IThemeStore).defaultTheme);
    const shouldHideHeader = useIsStageIncluded(Stages.HIDE_SITE_HEADER);
    const isFetchingPublicData = useIsStageIncluded(Stages.PREFETCH_SITE_PUBLIC_DATA_ONGOING);
    const isFetchingAuthUserInfo =  useIsStageIncluded(Stages.GET_AUTHENTICATED_USER_INFO_BEGIN);
    const shouldShowLoading = isFetchingPublicData || isFetchingAuthUserInfo;

    // Todo: handle background service errors
    // const hasBackgroundError = useIsStageIncluded(Stages.GET_AUTHENTICATED_USER_INFO_FAILED);

    useEffect(() => {
        surrogate(dispatch, prefetchLanguageOnLaunch(i18n));

        if (!Boolean(authorization)) {
            const path = window.location.pathname;
            const publicPaths = [
                '/login',
                '/register-account',
                '/forgot-password',
                '/activate-account',
            ];

            if (path !== '/' && !publicPaths.some(x => path.includes(x))) {
                //alert(t('unauthorized-page-access'));
                surrogate(dispatch, setSiteWideMessage({
                    targetPage: loginPageName,
                    messageKey: 'unauthorized-page-access',
                }));

                window.location.href = '/login';
            }
        }
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <div className='body'>
                    <Toast
                        stage={Stages.SHOW_TOAST_CLIENT_ERROR_NETWORK}
                        severity='error'
                        message={t('messages.error-network')}
                    />
                    <Toast
                        stage={Stages.REQUEST_TO_LOGIN_SUCCESS}
                        severity='success'
                        message={t('messages.authentication-success')}
                    />

                    <NavigationBar />
                    {shouldShowLoading && <DimOverlay />}
                    <Loading stage={Stages.PREFETCH_SITE_PUBLIC_DATA_ONGOING} />
                    <Flasher stage={Stages.SHOW_FLASHER_SERVER_ERROR} />
                    { !shouldHideHeader && <Header /> }
                    <Routers />
                    <Footer />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default connect(mapStateToProps)(App);
