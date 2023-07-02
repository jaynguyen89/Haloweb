import { BrowserRouter, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { TRootState } from '../redux/reducers';
import { IThemeStore } from '../redux/reducers/themeReducer';

const App = () => {
    const defaultTheme = useSelector((state: TRootState) => (state.themeStore as IThemeStore).defaultTheme);

    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <Routes>

                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
