import {baseUrl} from "../../../assets/includes/Config";
import React, {useContext, useEffect, useState} from "react";
import Spinner from "../../../assets/includes/Spinner";
import axios from "axios";
import staffData from "../../../Utilities/StaffData";
import {visitData} from "../../../Utilities/VisitData";
import {MyContext} from "../../../statemanagement/ComponentState";
import {showFailureResponseMessage, showSuccessResponseMessage} from "../../../Utilities/StateResponseMessageUtil";
import {appLogo} from "../../../assets/ImageLinks";

export default function NewVisit() {

    const {
        isSuccessMessageBox, setIsSuccessMessageBox,
        successMessage, setSuccessMessage,
        isFailureMessageBox, setIsFailureMessageBox,
        failureMessage, setFailureMessage
    } = useContext(MyContext);

    const [data, setData] = useState({...visitData, staffId:staffData.id});

    const [isLoading, setIsLoading] = useState(false);

    const  [tasks , setTasks] = useState(null);
    const  [areas , setAreas] = useState(null);
    const  [regions , setRegions] = useState(null);
    const  [customers , setCustomers] = useState(null);

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
        addVisitRecord();
    };

    function removeEmptyAttributes(obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] === "") {
                delete obj[key];
            }
        });

        return obj;
    }

    const addVisitRecord = () => {
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
        axios
            .post(`${baseUrl}/api/visit`, formData)
            .then((res) => {
                console.log(res);
                setIsLoading(false);
                showSuccessResponseMessage(setIsSuccessMessageBox, setSuccessMessage, true, "Customer interaction added");
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                showFailureResponseMessage(setIsFailureMessageBox, setFailureMessage, true, "An error has occurred");
            });
    };

    const getGeneralData = () => {
        axios.get(`${baseUrl}/api/general-data/${staffData.id} `)
            .then(res => {
                console.log(res.data)
                setTasks(res.data.tasks);
                setAreas(res.data.areas);
                setRegions(res.data.regions);
                setCustomers(res.data.customers);
            })
            .catch(err => console.log(err));
    }


    useEffect(() =>{
        getGeneralData();
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
                        Customer Interaction Form
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="taskId" className="block text-sm font-medium leading-6 text-gray-900">
                                Task
                            </label>
                            <div className="mt-2">
                                <select
                                    id="taskId"
                                    name="taskId"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Task</option>
                                    {tasks && tasks.map((task, index) =>(
                                        <option value={task["id"]} key={index}>{task["taskTitle"]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="customerId" className="block text-sm font-medium leading-6 text-gray-900">
                                Customer
                            </label>
                            <div className="mt-2">
                                <select
                                    id="customerId"
                                    name="customerId"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Customer</option>
                                    {customers && customers.map((customer, index) =>(
                                        <option value={customer["id"]} key={index}>{customer["fullName"]} (id : {customer["id"]})</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="area" className="block text-sm font-medium leading-6 text-gray-900">
                                Area
                            </label>
                            <div className="mt-2">
                                <select
                                    id="area"
                                    name="area"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Area</option>
                                    {areas && areas.map((area, index) =>(
                                        <option value={area["area"]} key={index}>{area["area"]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                Region
                            </label>
                            <div className="mt-2">
                                <select
                                    id="region"
                                    name="region"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Region</option>
                                    {regions && regions.map((region, index) =>(
                                        <option value={region["region"]} key={index}>{region["region"]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="visitDate" className="block text-sm font-medium leading-6 text-gray-900">
                                Visit Date
                            </label>
                            <div className="mt-2">
                                <input
                                    id="visitDate"
                                    name="visitDate"
                                    type="date"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="customerFeedback" className="block text-sm font-medium leading-6 text-gray-900">
                                Customer Feedback
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="customerFeedback"
                                    name="customerFeedback"
                                    type="textarea"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}>

                                </textarea>

                            </div>
                        </div>

                        <div>
                            <label htmlFor="customerRating" className="block text-sm font-medium leading-6 text-gray-900">
                                Quality of Service
                            </label>
                            <div className="mt-2">
                                <select
                                    id="customerRating"
                                    name="customerRating"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>

                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="visitOutcome" className="block text-sm font-medium leading-6 text-gray-900">
                                Visit Outcome
                            </label>
                            <div className="mt-2">
                                <input
                                    id="visitOutcome"
                                    name="visitOutcome"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="coordinates" className="block text-sm font-medium leading-6 text-gray-900">
                                Coordinates
                            </label>
                            <div className="mt-2">
                                <input
                                    id="coordinates"
                                    name="coordinates"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    placeholder={`separate latitude and longitude with comma e.g 1101 , 1033`}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="amountCollectedDuringVisit" className="block text-sm font-medium leading-6 text-gray-900">
                                Amount Paid By Customer for repayment
                            </label>
                            <div className="mt-2">
                                <input
                                    id="amountCollectedDuringVisit"
                                    name="amountCollectedDuringVisit"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="numberOfRepaymentReceived" className="block text-sm font-medium leading-6 text-gray-900">
                                Number of repayment Received
                            </label>
                            <div className="mt-2">
                                <input
                                    id="numberOfRepaymentReceived"
                                    name="numberOfRepaymentReceived"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="visitPicture" className="block text-sm font-medium leading-6 text-gray-900">
                                Visit Picture
                            </label>
                            <div className="mt-2">
                                <input
                                    id="visitPicture"
                                    name="visitPicture"
                                    type="file"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleFileChange }
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="staffObservationDuringVisit" className="block text-sm font-medium leading-6 text-gray-900">
                                Staff Observation
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="staffObservationDuringVisit"
                                    name="staffObservationDuringVisit"
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
                                Save visit
                            </button>
                            {isLoading && <Spinner/>}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
