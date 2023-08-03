import {baseUrl} from "../../../assets/includes/Config";
import React, {useContext, useEffect, useState} from "react";
import Spinner from "../../../assets/includes/Spinner";
import axios from "axios";
import staffData from "../../../Utilities/StaffData";
import {MyContext} from "../../../statemanagement/ComponentState";
import {showFailureResponseMessage, showSuccessResponseMessage} from "../../../Utilities/StateResponseMessageUtil";
import {appLogo} from "../../../assets/ImageLinks";

export default function NewStaff() {

    const {
        isSuccessMessageBox, setIsSuccessMessageBox,
        successMessage, setSuccessMessage,
        isFailureMessageBox, setIsFailureMessageBox,
        failureMessage, setFailureMessage
    } = useContext(MyContext);

    const [data, setData] = useState(staffData);
    const [isLoading, setIsLoading] = useState(false);

   const  [department , setDepartment] = useState(null);
   const [managerialRole , setManagerialRole] = useState(null);
    const [teams , setTeams] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleFileChange = (e) => {
        const name = e.target.name;
        const value = e.target.files;
        setData({ ...data, [name]: value[0] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        registerStaff();
    };

    function removeEmptyAttributes(obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] === "") {
                delete obj[key];
            }
        });

        return obj;
    }

    const registerStaff = () => {

        // REMOVE KEYS WITH EMPTY VALUES
        const modifiedData = removeEmptyAttributes(data);

        console.log(modifiedData);

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin' :true,
        };

        console.log(formData)

        axios
            .post(`${baseUrl}/api/staff`, formData)
            .then((res) => {
                console.log(res);
                setIsLoading(false);
                showSuccessResponseMessage(setIsSuccessMessageBox, setSuccessMessage, true, "Staff added");
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                showFailureResponseMessage(setIsFailureMessageBox, setFailureMessage, true, "An error has occurred");
            });
    };

    const getDepartmentAndManagementRole = () => {
        axios.get(`${baseUrl}/api/management`)
            .then(res => {
                setDepartment(res.data.department);
                setManagerialRole(res.data.managementRole);
                setTeams(res.data.teams);
            })
            .catch(err => console.log(err));
    }


    useEffect(() =>{
        getDepartmentAndManagementRole();
    },[])

    return (
        <div className={``}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src={appLogo}
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                                    <option value="">Select</option>
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
                                    required
                                >
                                    <option value="">Select Managerial Role</option>
                                    {managerialRole && managerialRole.map((manage, index) =>(
                                        <option value={manage["id"]} key={index}>{manage["managerialRole"]}</option>
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
                                    <option value="">Select Department</option>
                                    {department && department.map((dep, index) =>(
                                        <option value={dep[["id"]]} key={index}>{dep[["departmentName"]]}</option>
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
                                    <option value="0">Select Team</option>
                                    {teams && teams.map((team, index) =>(
                                        <option value={team["id"]} key={index}>{team["teamName"]} {team["id"]}</option>
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
                                    <option value="">Select Role</option>
                                    <option value="TEAM_LEAD">Team Lead</option>
                                    <option value="TEAM_MEMBER">Team Member</option>
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
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
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
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Passport
                            </label>
                            <div className="mt-2">
                                <input
                                    id="userImage"
                                    name="userImage"
                                    type="file"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleFileChange}
                                />
                            </div>

                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                Address
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="address"
                                    name="address"
                                    type="textarea"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}>

                                </textarea>
                            </div>
                        </div>

                        <div className="relative">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                            {isLoading && <Spinner/>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
