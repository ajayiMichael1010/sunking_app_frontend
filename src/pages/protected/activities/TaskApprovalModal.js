import React, {useContext, useState} from "react";
import {TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter,
} from "tw-elements-react";
import {MyContext} from "../../../statemanagement/ComponentState";
import Spinner from "../../../assets/includes/Spinner";
import axios from "axios";
import {baseUrl} from "../../../assets/includes/Config";
import {showFailureResponseMessage, showSuccessResponseMessage} from "../../../Utilities/StateResponseMessageUtil";

export default function TaskApprovalModal(currenTask) {

    const {
        isSuccessMessageBox, setIsSuccessMessageBox,
        successMessage, setSuccessMessage,
        isFailureMessageBox, setIsFailureMessageBox,
        failureMessage, setFailureMessage
    } = useContext(MyContext);

    const {showModal, setShowModal} = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true)
        approveTask();
    };


    const approveTask = () => {
        const taskId = currenTask.currenTask.id;
        const staffId = currenTask.currenTask.staffId
        axios
            .get(`${baseUrl}/api/task/approval/${taskId}/${staffId}`)
            .then((res) => {
                setIsLoading(false);
                showSuccessResponseMessage(setIsSuccessMessageBox, setSuccessMessage, true, res.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
                setIsLoading(false);
                showFailureResponseMessage(setIsFailureMessageBox, setFailureMessage, true, "An error has occurred");
            });
    };

    console.log(currenTask)

    return (
        <div>
            {/* <!-- Modal --> */}
            <TEModal show={showModal} setShow={setShowModal}>
                <TEModalDialog>
                    <TEModalContent>
                        <TEModalHeader>
                            {/* <!--Modal title--> */}
                            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                {currenTask.currenTask.taskTitle}
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
                                                    disabled
                                                    value={currenTask.currenTask.taskTitle}
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
                                    disabled
                                    value={currenTask.currenTask.taskDescription}>
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
                                    disabled
                                    value={currenTask.currenTask.goal}>
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
                                                    disabled
                                                    value={currenTask.currenTask.numberOfTargetRepayment}
                                                />
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <button
                                                type="submit"
                                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                {currenTask.currenTask.isApproved && <span>Disapprove Task</span>}
                                                {!currenTask.currenTask.isApproved && <span>Approve Task</span>}
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