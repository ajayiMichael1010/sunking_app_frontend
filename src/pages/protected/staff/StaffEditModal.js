import React, {useContext, useEffect, useState} from "react";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from "tw-elements-react";
import {MyContext} from "../../../statemanagement/ComponentState";
import Spinner from "../../../assets/includes/Spinner";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {baseUrl} from "../../../assets/includes/Config";
import {userData} from "../../../Utilities/UserDetails";
import {profileImage} from "../../../Utilities/UserDetails";
import {showFailureResponseMessage, showSuccessResponseMessage} from "../../../Utilities/StateResponseMessageUtil";

export default function StaffEditModal() {
    const {
        isSuccessMessageBox, setIsSuccessMessageBox,
        successMessage, setSuccessMessage,
        isFailureMessageBox, setIsFailureMessageBox,
        failureMessage, setFailureMessage
    } = useContext(MyContext);

    const {showModal, setShowModal} = useContext(MyContext);

    const [data, setData] = useState(userData);

    const [isLoading, setIsLoading] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const  [department , setDepartment] = useState(null);
    const [managerialRole , setManagerialRole] = useState(null);
    const [teams , setTeams] = useState(null);
    const [teamRoles , setTeamRoles] = useState(null);

    const [profileImageUrl, setProfileImageUrl] = useState(profileImage);

    const getDepartmentAndManagementRole = () => {
        axios.get(`${baseUrl}/api/management`)
            .then(res => {
                console.log(res.data.teamRoles)
                console.log(res.data.department)
                setDepartment(res.data.department);
                setManagerialRole(res.data.managementRole);
                setTeamRoles(res.data.teamRoles)
                setTeams(res.data.teams)
            })
            .catch(err => console.log(err));
    }

    useEffect(() =>{
        getDepartmentAndManagementRole();
    },[])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleFileChange = (e) => {
        const name = e.target.name;
        const value = e.target.files;
        setData({ ...data, [name]: value[0] });

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfileImageUrl(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true)
        updateStaff();
    };

    function removeEmptyAttributes(obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] === "") {
                delete obj[key];
            }
        });

        return obj;
    }

    const updateStaff = () => {

        // REMOVE KEYS WITH EMPTY VALUES
        const modifiedData = removeEmptyAttributes(data);

        const formData = new FormData();
        Object.entries(modifiedData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        console.log(modifiedData);


        axios
            .put(`${baseUrl}/api/staff/${data.id}`, modifiedData)
            .then((res) => {
                localStorage.setItem("userProfile", JSON.stringify(res.data));
                setIsLoading(false);
                showSuccessResponseMessage(setIsSuccessMessageBox, setSuccessMessage, true, "Staff updated");
            })
            .catch((err) => {
                console.log(err.response.data.message);
                setIsLoading(false);
                showFailureResponseMessage(setIsFailureMessageBox, setFailureMessage, true, "An error has occurred");
            });
    };

    return (
        <div>
            {/* <!-- Modal --> */}
            <TEModal show={showModal} setShow={setShowModal}>
                <TEModalDialog>
                    <TEModalContent>
                        <TEModalHeader>
                            {/* <!--Modal title--> */}
                            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                Staff Update
                            </h5>

                            {/* <!--Close button--> */}
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </TEModalHeader>
                        {/* <!--Modal body--> */}
                        <TEModalBody>
                            <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
                                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                            <label style={{display:"flex",
                                                justifyContent:"center", alignItems:"center",backgroundColor:"#ee"}}>
                                                <div className="mt-2" style={{position:"relative"}}>
                                                    <div style={{backgroundColor:"#eee",borderRadius:"50%",
                                                        width:"100px",height:"100px",display:"flex",
                                                        justifyContent:"center", alignItems:"center"}}>
                                                        <img
                                                            className="mx-auto h-10 w-auto"
                                                            src={profileImageUrl}
                                                            alt="Your Company"
                                                            style={{width:"80px",height:"80px",borderRadius:"50%"}}
                                                        />
                                                        <div style={{position:"absolute",right:"-70px"}}>Change Image</div>
                                                    </div>
                                                    <input
                                                        id="userImage"
                                                        name="userImage"
                                                        type="file"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        onChange={handleFileChange}
                                                        style={{position:"absolute",opacity:"0.9",display:"none"}}
                                                    />
                                                </div>
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="teamId" className="block text-sm font-medium leading-6 text-gray-900">
                                                User Role
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="role"
                                                    name="role"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Role</option>
                                                    <option value="ROLE_USER">User</option>
                                                    <option value="ROLE_ADMIN">Admin</option>
                                                    <option value="ROLE_SUPER_ADMIN">Super Admin</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="fullName"
                                                    name="fullName"
                                                    type="text"
                                                    autoComplete="name"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                    value={data.fullName}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="dateOfBirth" className="block text-sm font-medium leading-6 text-gray-900">
                                                Date of Birth
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="dateOfBirth"
                                                    name="dateOfBirth"
                                                    type="date"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                    value={data.dateOfBirth}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                                                Gender
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                >
                                                    <option value={data.gender}>{data.gender}</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="state"
                                                    name="state"
                                                    type="text"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                    value= {data.state}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="nationality" className="block text-sm font-medium leading-6 text-gray-900">
                                                Nationality
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="nationality"
                                                    name="nationality"
                                                    type="text"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                    value={data.nationality}
                                                />
                                            </div>
                                        </div>


                                        <div>
                                            <label htmlFor="religion" className="block text-sm font-medium leading-6 text-gray-900">
                                                Religion
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="religion"
                                                    name="religion"
                                                    type="text"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                    value={data.religion}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone Number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    type="text"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                    value={data.phoneNumber}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="qualification" className="block text-sm font-medium leading-6 text-gray-900">
                                                Qualification
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="qualification"
                                                    name="qualification"
                                                    type="text"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                    value={data.qualification}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="employmentDate" className="block text-sm font-medium leading-6 text-gray-900">
                                                Employment Date
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="employmentDate"
                                                    name="employmentDate"
                                                    type="date"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                    value={data.employmentDate}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="magerialRole" className="block text-sm font-medium leading-6 text-gray-900">
                                                Managerial Role
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="magerialRole"
                                                    name="managerialRoleId"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                >
                                                    {managerialRole &&
                                                        managerialRole
                                                            .filter((manage) => manage["id"] === data.managerialRoleId)
                                                            .map((manage) => (
                                                                <option value={manage["id"]} key={manage["id"]}>
                                                                    {manage["managerialRole"]}
                                                                </option>
                                                            ))}
                                                    {managerialRole &&
                                                        managerialRole
                                                            .filter((manage) => manage["id"] !== data.managerialRoleId)
                                                            .map((manage) => (
                                                                <option value={manage["id"]} key={manage["id"]}>
                                                                    {manage["managerialRole"]}
                                                                </option>
                                                            ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                                                Department
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="departmentId"
                                                    name="departmentId"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                >
                                                    {department &&
                                                        department
                                                            .filter((dep) => dep["id"] === data.departmentId)
                                                            .map((dep) => (
                                                                <option value={dep["id"]} key={dep["id"]}>
                                                                    {dep["departmentName"]}
                                                                </option>
                                                            ))}
                                                    {department &&
                                                        department
                                                            .filter((dep) => dep["id"] !== data.departmentId)
                                                            .map((dep) => (
                                                                <option value={dep["id"]} key={dep["id"]}>
                                                                    {dep["departmentName"]}
                                                                </option>
                                                            ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="teamId" className="block text-sm font-medium leading-6 text-gray-900">
                                                Team
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="teamId"
                                                    name="teamId"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                >

                                                    {teams &&
                                                        teams
                                                            .filter((team) => team["id"] === data.teamId)
                                                            .map((team) => (
                                                                <option value={team["id"]} key={team["id"]}>
                                                                    {team["teamName"]}
                                                                </option>
                                                            ))}
                                                    {teams &&
                                                        teams
                                                            .filter((team) => team["id"] !== data.teamId)
                                                            .map((team) => (
                                                                <option value={team["id"]} key={team["id"]}>
                                                                    {team["teamName"]}
                                                                </option>
                                                            ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="teamId" className="block text-sm font-medium leading-6 text-gray-900">
                                                Team Role
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="teamRole"
                                                    name="teamRole"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                >
                                                    {teamRoles &&
                                                        teamRoles
                                                            .filter((teamRole) => teamRole === data.teamRole)
                                                            .map((teamRole) => (
                                                                <option value={teamRole} key={teamRole}>
                                                                    {teamRole}
                                                                </option>
                                                            ))}
                                                    {teamRoles &&
                                                        teamRoles
                                                            .filter((teamRole) => teamRole !== data.teamRole)
                                                            .map((teamRole) => (
                                                                <option value={teamRole} key={teamRole}>
                                                                    {teamRole}
                                                                </option>
                                                            ))}
                                                </select>
                                            </div>
                                        </div>


                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                    value={data.email}
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Password
                                                </label>
                                                <div className="text-sm">
                                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                        Forgot password?
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                    value="12345678"
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                                Address
                                            </label>
                                            <div className="mt-2">
                                <textarea
                                    id="address"  name="address"  type="textarea"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  nChange={handleChange}>
                                    {data.address}
                                </textarea>
                                            </div>
                                        </div>


                                        <div className="relative">
                                            <button
                                                type="submit"
                                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Update Customer
                                            </button>
                                            {isLoading && <Spinner/>}
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </TEModalBody>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
        </div>
    );
}