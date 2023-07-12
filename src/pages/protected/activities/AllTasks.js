import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../../assets/includes/Config";
import {MyContext} from "../../../statemanagement/ComponentState";
import TaskApprovalModal from "./TaskApprovalModal";

export default  function AllTaskRecords() {
    const [tasks, setTasks] = useState(null);
    const [currentTask, setCurrentTask] =useState(null)
    const {showModal,setShowModal} = useContext(MyContext);

    const onClickTaskDetailModal = (thisTask) => {
        setShowModal(true);
        setCurrentTask(thisTask);
    }


    const getAllTaskRecords = () => {
        axios.get(`${baseUrl}/api/task`)
            .then(res => {
                console.log(res.data)
                setTasks(res.data);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllTaskRecords();
    },[])

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <h1><b>All Tasks</b></h1>
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">#</th>
                                <th scope="col" className="px-6 py-4">Team Member</th>
                                <th scope="col" className="px-6 py-4">Task Title</th>
                                <th scope="col" className="px-6 py-4">Target</th>
                                <th scope="col" className="px-6 py-4">Approved</th>
                                <th scope="col" className="px-6 py-4">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tasks && tasks.map((task,index)=>(
                                <tr
                                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{task.staffName}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{task.taskTitle}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{task.numberOfTargetRepayment} repayments</td>
                                    <td className="whitespace-nowrap px-6 py-4">{task.approvedStatus}</td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <button style={{backgroundColor:"yellow",padding:"5px"}} onClick={() =>onClickTaskDetailModal(task)}>
                                            Show Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                            }

                            </tbody>
                        </table>

                        {showModal && <TaskApprovalModal currenTask={currentTask}/>}
                    </div>
                </div>
            </div>
        </div>

    );
}
