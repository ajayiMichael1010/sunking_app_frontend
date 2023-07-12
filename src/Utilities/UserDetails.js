const activeUser = JSON.parse(localStorage.getItem("userProfile")) ;
export const  userToken = JSON.parse(localStorage.getItem("userToken")) ;
export const  userData = activeUser != null?  activeUser : false;
export const profileImage = userData && userData.userImage ? userData.userImage : "https://res.cloudinary.com/dg8z8uh8f/image/upload/v1688724232/p7x9gq0ldoiaeadt0pmc.jpg";

