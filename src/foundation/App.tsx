import { ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { TRootState } from 'src/redux/reducers';
import { IThemeStore } from 'src/redux/reducers/themeReducer';
import NavigationBar from 'src/components/compounds/NavigationBar/NavigationBar';
import Routers from 'src/foundation/Routers';
import Footer from 'src/components/compounds/Footer/Footer';
import Header from 'src/components/compounds/Header/Header';
import 'src/foundation/app.scss';

const App = () => {
    const defaultTheme = useSelector((state: TRootState) => (state.themeStore as IThemeStore).defaultTheme);

    return (
        <ThemeProvider theme={defaultTheme}>
            <div className='body'>
                <NavigationBar />
                <Header />
                <Routers />
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default App;
