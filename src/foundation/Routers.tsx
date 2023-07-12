import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from 'src/pages/HomePage/HomePage';
import LoginPage from 'src/pages/LoginPage/LoginPage';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
