import React from 'react';
import { useContext } from 'react';
import { authProvider } from '../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    console.log(children);
    const {user,loader} = useContext(authProvider);
    console.log(loader);
    const location = useLocation();
    if(loader){
        return <p>Loader</p>
    }
    
    if(user){
        return children;
    }
    
    return <Navigate to="/login" state={{from:location}} replace={true}></Navigate>
};

export default PrivateRoute;