import React from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';
import configs from 'src/commons/configs';
import { Environments } from 'src/commons/enums';

import Showcases from 'src/components/showcases/Showcases';
import AccountRegistration from 'src/pages/AccountRegistration/AccountRegistration';
import ActivateAccount from 'src/pages/ActivateAccount/ActivateAccount';
import ConfirmOTP from 'src/pages/ConfirmOTP/ConfirmOTP';
import ForgotPassword from 'src/pages/ForgotPassword/ForgotPassword';
import HomePage from 'src/pages/HomePage/HomePage';
import LoginPage from 'src/pages/LoginPage/LoginPage';
import ResetOrChangePassword from 'src/pages/ResetPassword/ResetOrChangePassword';

const routes: Array<RouteProps> = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register-account',
        element: <AccountRegistration />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/reset-or-change-password',
        element: <ResetOrChangePassword />,
    },
    {
        path: '/confirm-otp',
        element: <ConfirmOTP />,
    },
    {
        path: '/activate-account/:accountId',
        element: <ActivateAccount />,
    },
];

const Routers = () => {
    const isDevEnvironment = configs.environment === Environments.DEV;

    return (
        <Routes>
            { isDevEnvironment && <Route path='/showcases' element={<Showcases />} /> }
            {routes.map((route, i) => <Route key={`${route.path!.slice(1)}_${i}`} {...route} />)}
        </Routes>
    );
};

export default Routers;
