import React, {useEffect, useState} from 'react';
import logout from '../components/Logout';

export default function LogOut({ onLogOut }) {
    const [loggedOut, setStatus] = useState(false);

   useEffect(()=> {
    const logingout = async() => {
    setStatus(await logout());
     onLogOut();}
    logingout()}, [])
     
     return (
             <>
             <p>
                {loggedOut 
                ? "You have been logged out"
                : "Something went wrong, try again"}
             </p>
             </>
         )
}