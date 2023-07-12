import {baseUrl} from "../../../assets/includes/Config";
import React, {useContext, useEffect, useState} from "react";
import Spinner from "../../../assets/includes/Spinner";
import axios from "axios";
import {taskData} from "../../../Utilities/TaskData";
import staffData from "../../../Utilities/StaffData";
import {showFailureResponseMessage, showSuccessResponseMessage} from "../../../Utilities/StateResponseMessageUtil";
import {MyContext} from "../../../statemanagement/ComponentState";


export default function NewTask() {
    const {
        isSuccessMessageBox, setIsSuccessMessageBox,
        successMessage, setSuccessMessage,
        isFailureMessageBox, setIsFailureMessageBox,
        failureMessage, setFailureMessage
    } = useContext(MyContext);

    const [data, setData] = useState({ ...taskData, staffId: staffData.id });
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
        setIsLoading(true);
        addNewTask();
    };

    function removeEmptyAttributes(obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] === "") {
                delete obj[key];
            }
        });
        return obj;
    }

    const addNewTask = () => {

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

        axios
            .post(`${baseUrl}/api/task`, formData)
            .then((res) => {
                console.log(res);
                setIsLoading(false);
                showSuccessResponseMessage(setIsSuccessMessageBox, setSuccessMessage, true, "Task added");
        })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                showFailureResponseMessage(setIsFailureMessageBox, setFailureMessage, true, "An error has occurred");
            });
    };


    return (
        <div className={``}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        New Task
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="taskTitle" className="block text-sm font-medium leading-6 text-gray-900">
                                Task Title
                            </label>
                            <div className="mt-2">
                                <input
                                    id="taskTitle"
                                    name="taskTitle"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="taskDescription" className="block text-sm font-medium leading-6 text-gray-900">
                                Task Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="taskDescription"
                                    name="taskDescription"
                                    type="textarea"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    placeholder ="Write a brief description about the task">
                                </textarea>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="goal" className="block text-sm font-medium leading-6 text-gray-900">
                                What is your goal ?
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="goal"
                                    name="goal"
                                    type="textarea"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    placeholder ="Write a detail description
                                    about your goal and how you intend to achieve it">
                                </textarea>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="goal" className="block text-sm font-medium leading-6 text-gray-900">
                                Number of repayment target
                            </label>
                            <div className="mt-2">
                                <input
                                    id="numberOfTargetRepayment"
                                    name="numberOfTargetRepayment"
                                    type="number"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    placeholder={`Number of repayment target`}
                                />
                            </div>
                        </div>

                        <div className={`relative`}>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add Task
                            </button>
                            {isLoading && <Spinner/>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
