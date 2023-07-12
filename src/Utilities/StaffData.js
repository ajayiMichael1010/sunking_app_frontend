import { userData } from "./UserDetails";

const staffData = {
    "fullName": "",
    "dateOfBirth": "",
    "gender": "",
    "state": "",
    "nationality": "",
    "address": "",
    "religion": "",
    "phoneNumber": "",
    "qualification": "",
    "employmentDate": "",
    "designation": "",
    "departmentId": "",
    "managerialRoleId": "",
    "teamId": null,
    "teamRole": "",
    "userImageUrl": "",
    "email": "",
    "password": null,
    "role": "ROLE_USER",
    "userType": "STAFF",
};

export default { ...staffData, ...(userData !== false ? userData : {}) };
