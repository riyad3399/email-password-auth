import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <nav>
            <Header />
            <Outlet></Outlet>
        </nav>
    );
};

export default Main;