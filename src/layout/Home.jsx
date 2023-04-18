import React from 'react';
import Header from '../Components/Header/Header';
import {Outlet, useNavigation} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {

    return (
        <div>
            <Header></Header>
            <Outlet/>
            <Toaster />
        </div>
    );
};

export default Home;