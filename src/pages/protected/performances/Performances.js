import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../../assets/includes/Config";
import AccountPerformance from "./AccountPerformance";
import AreaPerformance from "./AreaPerformance";
import TaskPerformance from "./TaskPerformance";

export default  function Performances() {
    const [performance, setPerformance] = useState(null);

    const [performanceFilterBy, setPerformanceFilterBy] = useState("ACCOUNT_PERFORMANCE")
    const [isAccountPerformance , setIsAccountPerFormance] = useState(false);
    const [isTaskPerformance , setIsTaskPerFormance] = useState(false);
    const [isAreaPerformance , setIsAreaPerFormance] = useState(false);

    const getAllVisitRecords = () => {
        axios.get(`${baseUrl}/api/task-performance/${performanceFilterBy}`)
            .then(res => {

                setPerformance(res.data);

                if(performanceFilterBy === "ACCOUNT_PERFORMANCE"){
                    setIsAccountPerFormance(true)
                    setIsTaskPerFormance(false);
                    setIsAreaPerFormance(false);
                }
                else if(performanceFilterBy == "TASK_PERFORMANCE"){
                    setIsAccountPerFormance(false)
                    setIsTaskPerFormance(true);
                    setIsAreaPerFormance(false);
                }
                else{
                    setIsAccountPerFormance(false)
                    setIsTaskPerFormance(false);
                    setIsAreaPerFormance(true);
                }

            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        getAllVisitRecords();
    },[performanceFilterBy])

    function handleChange(e){
        setPerformanceFilterBy(e.target.value);
    }

    return (
        <>
            <div className={`inline-block l py-2 sm:px-4 lg:px-4`}>
                <label htmlFor="Performance Filter" className="block text-sm font-medium leading-6 text-gray-900">
                    Filter By
                </label>
                <div className="mt-2">
                    <select
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                    >
                        <option value="ACCOUNT_PERFORMANCE">ACCOUNT PERFORMANCE</option>
                        <option value="AREA_PERFORMANCE">AREA PERFORMANCE</option>
                        <option value="TASK_PERFORMANCE">TASK PERFORMANCE</option>
                    </select>
                </div>
            </div>
            <hr/>
            <br/>

            <div className="flex flex-col">



                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            {isAccountPerformance && <AccountPerformance performance ={performance}/>}
                            {isAreaPerformance && <AreaPerformance performance ={performance}/>}
                            {isTaskPerformance && <TaskPerformance performance ={performance}/>}
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
}
