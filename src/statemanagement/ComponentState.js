import React, { createContext, useState } from 'react';
const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [token , setToken] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [isSuccessMessageBox, setIsSuccessMessageBox] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isFailureMessageBox, setIsFailureMessageBox] = useState(false);
    const [failureMessage, setFailureMessage] = useState(null);

    const [isTopNavLogo , setIsTopNavbarLogo] = useState(true);

    return (
        <MyContext.Provider value={{

            showModal, setShowModal,
            isSuccessMessageBox,setIsSuccessMessageBox,
            successMessage, setSuccessMessage,
            isFailureMessageBox, setIsFailureMessageBox,
            failureMessage, setFailureMessage,
            isTopNavLogo , setIsTopNavbarLogo,
            token , setToken

        }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyContextProvider };