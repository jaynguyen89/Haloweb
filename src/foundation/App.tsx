import { ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
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

const App = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const defaultTheme = useSelector((state: TRootState) => (state.themeStore as IThemeStore).defaultTheme);
    const shouldHideHeader = useIsStageIncluded(Stages.HIDE_SITE_HEADER);
    const shouldShowLoading = useIsStageIncluded(Stages.PREFETCH_SITE_PUBLIC_DATA_ONGOING);

    useEffect(() => {
        dispatch(prefetchLanguageOnLaunch(i18n) as unknown as AnyAction);
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <div className='body'>
                    <Toast
                        stage={Stages.SHOW_TOAST_ERROR_NETWORK}
                        severity='error'
                        message={t('messages.error-network')}
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

export default App;
