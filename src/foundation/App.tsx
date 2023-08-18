import { ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
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
    const { i18n } = useTranslation();
    const dispatch = useDispatch();

    const defaultTheme = useSelector((state: TRootState) => (state.themeStore as IThemeStore).defaultTheme);
    const shouldHideHeader = useIsStageIncluded(Stages.HIDE_SITE_HEADER);

    useEffect(() => {
        dispatch(prefetchLanguageOnLaunch(i18n) as unknown as AnyAction);
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <div className='body'>
                    <NavigationBar />
                    { !shouldHideHeader && <Header /> }
                    <Routers />
                    <Footer />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
