import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from 'src/pages/HomePage/HomePage';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
