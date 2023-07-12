//THE FUNCTIONS IN THIS COMPONENT ARE CREATED
// TO HIDE SOME ELEMENTS FROM THE USERS
//BASED ON THEIR AUTHORIZATION LEVEL
export  const postActionGrant = (users, eligibleUsers ) => {
    //THIS METHOD CONTROLS WHAT A USER CAN DO BASED ON THEIR AUTHORIZATION
    let hideElement = "hideElement";
    for(let i=0 ; i < users.length ; i++){
        if(eligibleUsers.includes(users[i])){
            hideElement =""; //DON'T HIDE ELEMENT
        }
    }
    return hideElement;
}

export  const postOwnerAction = (ownerPost, userId ,userRole) => {
    //THIS METHOD CONTROLS WHAT A USER CAN DO BASED ON THEIR AUTHORIZATION
    let hideElement = "";
    if(userRole =="ROLE_ADMIN" || userRole =="ROLE_EDITOR"){
           return  "";
    }
    hideElement= ownerPost === userId ? "showElement":"hideElement";
    return hideElement;
}

export  function  anonymousUserRoute(isAuthenticated){
    //THIS METHOD IS CALLED ON ELEMENTS THAT MUST
    // BE HIDDEN AFTER AUTHENTICATION E.G LOGIN ROUTE
    let hideElement = "showElement";
    if(isAuthenticated){
        hideElement = "hideElement";
    }
    return hideElement;
}

export  const authenticatedUserRoute = (isAuthenticated) => {
    //THIS METHOD IS CALLED ON ELEMENTS THAT MUST BE VISIBLE
    //AFTER AUTHENTICATION
    let hideElement = "hideElement";
    if(isAuthenticated){
        hideElement = "showElement";
    }
    return hideElement;
}

//RETRIEVE HEADER INFORMATION FROM LOCAL STORAGE
//THIS VARIABLES CONTROL WHAT A USER CAN SEE
let headerData = localStorage.getItem("headerData");
if(headerData){
    headerData = JSON.parse(headerData);
}else {
    //DEFAULT STATE
    headerData = {
        adminOnly : "hideElement",
        editorWithHigherUsers :"hideElement",
        editorWithAuthenticatedUser : "hideElement",
        anonymousUser :"showElement",
        authenticatedUser :"hideElement",
        token :"",
        authUserId : 0,
        authEmail : "",
        authFullName : "",
        authUserRole :""
    }
}

export const {
    adminOnly,
    editorWithAuthenticatedUser,
    editorWithHigherUsers,
    anonymousUser,
    authenticatedUser,
    token,authUserId,
    authEmail,
    authFullName,
    authUserRole} = headerData;


export const  nonAuthUserRediret = token===null?window.location.href="/":"";

