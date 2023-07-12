import {baseUrl} from "../assets/includes/Config";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import Spinner from "../assets/includes/Spinner";
import axios from "axios";
import {MyContext} from "../statemanagement/ComponentState";
import {showFailureResponseMessage, showSuccessResponseMessage} from "../Utilities/StateResponseMessageUtil";
import {appLogo} from "../assets/ImageLinks";

export default function Login() {


    const {
        isSuccessMessageBox, setIsSuccessMessageBox,
        successMessage, setSuccessMessage,
        isFailureMessageBox, setIsFailureMessageBox,
        failureMessage, setFailureMessage
    } = useContext(MyContext);

    const [data , setData] = useState({
        email :"",
        password : ""
    });

    const [isLoading , setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        authenticateUser();
    }

    const authenticateUser = () => {
        setIsLoading(true);
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' :true
        };
        axios.post(`${baseUrl}/api/login`, data, { headers })
            .then(res => {
                setIsLoading(false);

                const message = res.data.message;
                localStorage.setItem("userToken", JSON.stringify(res.data.access_token.original.token))
                localStorage.setItem("userProfile", JSON.stringify(res.data.user));
                window.location.href = "/dashboard";
                showSuccessResponseMessage(setIsSuccessMessageBox, setSuccessMessage, true, "Login successful");
            })
            .catch(err => {
                console.log(err.response);
                setIsLoading(false);
                showFailureResponseMessage(setIsFailureMessageBox, setFailureMessage, true, "An error as occured");
            });
    }



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
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
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

                        <div className={`relative`}>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                            {isLoading && <Spinner/>}
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have account{' '}
                        <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}
