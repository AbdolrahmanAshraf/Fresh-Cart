import React, { useContext, useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Nav from '../Nav/Nav'
import UserContextProvider, { UserContext } from '../Context/UserContext'

export default function Layout() {
    let {setUserToken} = useContext(UserContext);
    useEffect(()=>{
        if(localStorage.getItem("userToken") !== null){
            setUserToken(localStorage.getItem("userToken"))
        }
    }, [])
return (
    <>
        <Nav></Nav>
        <Outlet></Outlet>
        <Footer></Footer>
        
    </>
)
}
