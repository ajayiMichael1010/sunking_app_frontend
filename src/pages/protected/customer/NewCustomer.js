import {baseUrl} from "../../../assets/includes/Config";
import {useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import Spinner from "../../../assets/includes/Spinner";
import axios from "axios";
import {customerData} from "../../../Utilities/CustomerData";
import {MyContext} from "../../../statemanagement/ComponentState";
import {showFailureResponseMessage, showSuccessResponseMessage} from "../../../Utilities/StateResponseMessageUtil";
import {appLogo} from "../../../assets/ImageLinks";

export default function NewCustomer() {

    const {
        isSuccessMessageBox, setIsSuccessMessageBox,
        successMessage, setSuccessMessage,
        isFailureMessageBox, setIsFailureMessageBox,
        failureMessage, setFailureMessage
    } = useContext(MyContext);

    const [data, setData] = useState(customerData);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true)
        registerCustomer();
    };

    function removeEmptyAttributes(obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] === "") {
                delete obj[key];
            }
        });

        return obj;
    }

    const registerCustomer = () => {

        // REMOVE KEYS WITH EMPTY VALUES
        const modifiedData = removeEmptyAttributes(data);

        const formData = new FormData();
        Object.entries(modifiedData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin' :true,
        };

        console.log(formData)

        axios
            .post(`${baseUrl}/api/customer`, formData)
            .then((res) => {
                console.log(res);
                setIsLoading(false);
                showSuccessResponseMessage(setIsSuccessMessageBox, setSuccessMessage, true, "Customer added");
            })
            .catch((err) => {
                console.log(err.response.data.message);
                setIsLoading(false);
                showFailureResponseMessage(setIsFailureMessageBox, setFailureMessage, true, err.response.data.message);
            });
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src={appLogo}
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register Customer
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium leading-6 text-gray-900">
                                Date of Birth
                            </label>
                            <div className="mt-2">
                                <input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    autoComplete="off"
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
                                    <option value={data.gender}></option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
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
                                    autoComplete="off"
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
                                    type="tel"
                                    autoComplete="tel"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    value={data.phoneNumber}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Country
                            </label>
                            <div className="mt-2">
                                <input
                                    id="country"
                                    name="country"
                                    type="text"
                                    autoComplete="country"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    value={data.country}
                                />
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
                                    autoComplete="address-level1"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    value={data.state}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                City
                            </label>
                            <div className="mt-2">
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    autoComplete="address-level2"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    value={data.city}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="area" className="block text-sm font-medium leading-6 text-gray-900">
                                Area
                            </label>
                            <div className="mt-2">
                                <input
                                    id="area"
                                    name="area"
                                    type="text"
                                    autoComplete="address-level3"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    value={data.area}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                Region
                            </label>
                            <div className="mt-2">
                                <input
                                    id="region"
                                    name="region"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    value={data.region}
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
                                />
                            </div>


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

                        <div className="relative">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                            {isLoading && <Spinner />}
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}
