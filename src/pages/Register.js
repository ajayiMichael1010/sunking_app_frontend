import {baseUrl} from "../assets/includes/Config";
import {useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import Spinner from "../assets/includes/Spinner";
import axios from "axios";
import {customerData} from "../Utilities/CustomerData";
import {appLogo} from "../assets/ImageLinks";
import {MyContext} from "../statemanagement/ComponentState";
import {showFailureResponseMessage} from "../Utilities/StateResponseMessageUtil";

export default function Register() {
    const [data, setData] = useState(customerData);

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const {
        isSuccessMessageBox, setIsSuccessMessageBox,
        successMessage, setSuccessMessage,
        isFailureMessageBox, setIsFailureMessageBox,
        failureMessage, setFailureMessage
    } = useContext(MyContext);

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

        if(data.password !==data.cpassword){
            showFailureResponseMessage(setIsFailureMessageBox, setFailureMessage, true, "Password not matched");
        }
        else {
            showFailureResponseMessage(setIsFailureMessageBox, setFailureMessage, false, "Password not matched");
            setIsLoading(true)
            registerUser();
        }

    };

    function removeEmptyAttributes(obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] === "") {
                delete obj[key];
            }
        });

        return obj;
    }

    const registerUser = () => {
        setIsLoading(true);

        // REMOVE KEYS WITH EMPTY VALUES
        const modifiedData = removeEmptyAttributes(data);

        console.log(modifiedData);

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
                setIsLoading(false);
                navigate("/success", { state: data });
            })
            .catch((err) => {
                console.log(err);
                // alert("Email already exists");
                setIsLoading(false);
                setIsLoading(false);
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
                        Register
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
                        </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Confirm Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="cpassword"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
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

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already registered ?{' '}
                        <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </a>
                    </p>

                </div>
            </div>
        </>
    )
}
