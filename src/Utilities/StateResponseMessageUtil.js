import React, { useContext } from "react";
import {MyContext} from "../statemanagement/ComponentState";

export function showSuccessResponseMessage(setIsSuccessMessageBox,setSuccessMessage, isSuccessMessageBox, successMessage) {

    setIsSuccessMessageBox(isSuccessMessageBox);
    setSuccessMessage(successMessage);
}

export function showFailureResponseMessage(setIsFailureMessageBox, setFailureMessage, isFailureMessageBox, failureMessage) {
    setIsFailureMessageBox(isFailureMessageBox);
    setFailureMessage(failureMessage);
}
