import React, {useContext, useState} from 'react';
import Header from "./navigation/Header";
import Footer from "./Footer";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./navigation/Sidebar";
import {userData} from "../Utilities/UserDetails";
import SuccessMessage from "../components/SuccessMessage";
import FailureMessage from "../components/FailureMessage";
import {MyContext} from "../statemanagement/ComponentState";
import {auto, right} from "@popperjs/core";

function ContentContainer() {

    //SUCCESS AND FAILURE MESSAGE ON RESPONSE
    const {isSuccessMessageBox,
        setIsSuccessMessageBox,
        successMessage, setSuccessMessage,
        isFailureMessageBox, setIsFailureMessageBox,
        failureMessage, setFailureMessage,
        isTopNavLogo , setIsTopNavbarLogo
    } = useContext(MyContext);


    //SIDEBAR AND TOPNAVBAR DYNAMIC LAYOUT LOGIC
    let  topNavLayoutDiv = "";
    let  topNavLayoutParentDiv ="";
    let contentProperties = {
        contentWidth : "auto",
        contentFloat :"",
    }

    if(userData !=false) {
        topNavLayoutDiv = "col-span-10";
        topNavLayoutParentDiv = "grid md:grid-cols-12";
        contentProperties = {contentWidth: "80%", contentFloat: "right",}
        setIsTopNavbarLogo(false)
    }
    else{
        topNavLayoutDiv  = "col-span-12";
        topNavLayoutParentDiv = "";
    }

    return (
        <div>
            <div className={`${topNavLayoutParentDiv}`}>
                {userData  && <div className="col-span-2"><Sidebar />  </div>}
                <div className={`relative ${topNavLayoutDiv}`}>
                    <Header />

                    <div style={{position:"absolute", right:"150px",top:"150px",zIndex:"99999"}}>
                        {isSuccessMessageBox && <SuccessMessage />}
                         {isFailureMessageBox && <FailureMessage />}
                    </div>
                </div>
            </div>
            <div style={{width:contentProperties.contentWidth, float:contentProperties.contentFloat}}>

                <Outlet/>
            </div>

            {/*<Footer />*/}
        </div>
    );
}

export default ContentContainer;