import React from 'react';
import Header from '../Components/Header/Header';
import {Outlet, useNavigation} from 'react-router-dom'
const Home = () => {

    return (
        <div>
            <Header></Header>
            <Outlet/>
        </div>
    );
};

export default Home;