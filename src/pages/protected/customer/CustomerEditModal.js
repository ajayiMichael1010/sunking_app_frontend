import React, {useContext, useState} from "react";
import {TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter,
} from "tw-elements-react";
import {MyContext} from "../../../statemanagement/ComponentState";
import Spinner from "../../../assets/includes/Spinner";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {baseUrl} from "../../../assets/includes/Config";
import {userData} from "../../../Utilities/UserDetails";
import {profileImage} from "../../../Utilities/UserDetails";
import {showFailureResponseMessage, showSuccessResponseMessage} from "../../../Utilities/StateResponseMessageUtil";

export default function CustomerEditModal() {

    const {
        isSuccessMessageBox, setIsSuccessMessageBox,
        successMessage, setSuccessMessage,
        isFailureMessageBox, setIsFailureMessageBox,
        failureMessage, setFailureMessage
    } = useContext(MyContext);


    const {showModal, setShowModal} = useContext(MyContext);
    const [data, setData] = useState(userData);
    const [isLoading, setIsLoading] = useState(false);
    const [isIsLoading, setIsLoadind] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState(profileImage);
    const navigate = useNavigate();

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
        updateCustomer();
    };

    function removeEmptyAttributes(obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] === "") {
                delete obj[key];
            }
        });

        return obj;
    }

    const updateCustomer = () => {
        setIsLoadind(true);

        // REMOVE KEYS WITH EMPTY VALUES
        const modifiedData = removeEmptyAttributes(data);

        const formData = new FormData();
        Object.entries(modifiedData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        axios
            .put(`${baseUrl}/api/customer/${data.id}`, modifiedData)
            .then((res) => {
                localStorage.setItem("userProfile", JSON.stringify(res.data));
                setIsLoading(false);
                showSuccessResponseMessage(setIsSuccessMessageBox, setSuccessMessage, true, "Customer updated");
            })
            .catch((err) => {
                console.log(err.response.data.message);
                setIsLoadind(false);
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
                                Customer Update
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
                                                        <div style={{position:"absolute",right:"-100px"}}>Change Image</div>
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