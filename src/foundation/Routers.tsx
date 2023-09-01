import React from 'react';
import { Route, Routes } from 'react-router-dom';
import configs from 'src/commons/configs';
import { Environments } from 'src/commons/enums';

import Showcases from 'src/components/showcases/Showcases';
import AccountRegistration from 'src/pages/AccountRegistration/AccountRegistration';
import ForgotPassword from 'src/pages/ForgotPassword/ForgotPassword';
import HomePage from 'src/pages/HomePage/HomePage';
import LoginPage from 'src/pages/LoginPage/LoginPage';

const Routers = () => {
    const isDevEnvironment = configs.environment === Environments.DEV;

    return (
        <Routes>
            { isDevEnvironment && <Route path='/showcases' element={<Showcases />} /> }
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register-account' element={<AccountRegistration />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
    );
};

export default Routers;
