import React from 'react';
import {useLocation} from "react-router-dom";

export  default function SuccessScreen() {
    const location = useLocation();
    console.log(location.state);

    const  visitMailBox = (email) => {
        let domain = email.split("@");
        domain = domain[1];
        window.location.href= `https://${domain}`;
    }

    return (

        <div style={{backgroundColor: '#7c3aed',
            height: '100vh'
            ,color:'#fff', display:"flex",
            alignItems:"center",
            justifyContent:"center"}}>
            <div>
                <h1 style={{fontSize:"25px"}}>Registration successful !!!</h1><br/>
                <p><a className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" href={`#`} onClick={() => visitMailBox(location.state.email)}>Click on this link to confirm your email address</a></p>

            </div>

        </div>
    );
}