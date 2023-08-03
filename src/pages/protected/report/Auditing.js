import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../../assets/includes/Config";

export default  function AuditingReport() {
    const [report, setReport] = useState(null);

    const [sortableColumn , setSortableColumn] = useState("customer_rating");
    const [orderBy, setOrderBy] = useState("DESC");
    const [areaBg, setAreaBg] = useState(null);
    const [numberOfRepaymentBg, setNumberOfRepaymentBg] = useState(null);
    const [customerRating, setCustomerRating] = useState(null);

    function handleChangeColumnFilter(e){
        setSortableColumn(e.target.value)
    }

    function handleChangeSortFilter(e){
        setOrderBy(e.target.value)
    }
    const getReports = () => {
        axios.get(`${baseUrl}/api/report/${sortableColumn}/${orderBy}`)
            .then(res => {
                console.log(res.data)
                setReport(res.data);

                if(sortableColumn === "customer_rating"){
                    setCustomerRating("bg-yellow-300")
                    setAreaBg(null);
                    setNumberOfRepaymentBg(null);
                }
                else if(sortableColumn === "number_of_repayment_received") {
                    setNumberOfRepaymentBg("bg-yellow-300")
                    setAreaBg(null);
                    setCustomerRating(null);
                }
                else{
                    setAreaBg("bg-yellow-300")
                    setNumberOfRepaymentBg(null);
                    setCustomerRating(null);
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getReports();
    },[sortableColumn, orderBy])

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
                        onChange={handleChangeColumnFilter}
                    >
                        <option value="customer_rating">Customer Rating</option>
                        <option value="number_of_repayment_received">Number Of Repayments</option>
                        <option value="area">Area</option>
                    </select>
                </div>
            </div>

            <div className={`inline-block l py-2 sm:px-4 lg:px-4`}>
                <label htmlFor="Performance Filter" className="block text-sm font-medium leading-6 text-gray-900">
                    Sort From
                </label>
                <div className="mt-2">
                    <select
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChangeSortFilter}
                    >
                        <option value="DESC">High to Low</option>
                        <option value="ASC">Low to High</option>
                    </select>
                </div>
            </div>

            <hr/>
            <br/>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <h1><b>Auditing Report</b></h1>
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">Team Member</th>
                                    <th scope="col" className="px-6 py-4">Task Title</th>
                                    <th scope="col" className="px-6 py-4">Target</th>
                                    <th scope="col" className="px-6 py-4">Repayment</th>
                                    <th scope="col" className="px-6 py-4">Customer Name</th>
                                    <th scope="col" className="px-6 py-4">Area</th>
                                    <th scope="col" className="px-6 py-4">Rating</th>
                                    <th scope="col" className="px-6 py-4">Customer Feedback</th>
                                    <th scope="col" className="px-6 py-4">Staff Observation</th>
                                    <th scope="col" className="px-6 py-4">Picture Taken</th>
                                </tr>
                                </thead>
                                <tbody>
                                {report && report.map((rep,index)=>(
                                    <tr
                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{rep.staff.full_name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{rep.task.task_title}</td>
                                        <td className={`whitespace-nowrap px-6 py-4 ${numberOfRepaymentBg}`}>{rep.task.number_of_target_repayment} repayments</td>
                                        <td className="whitespace-nowrap px-6 py-4">{rep.numberOfRepaymentReceived} repayments</td>
                                        <td className="whitespace-nowrap px-6 py-4">{rep.customer.full_name}</td>
                                        <td className={`whitespace-nowrap px-6 py-4 ${areaBg}`}>{rep.area}</td>
                                        <td className={`whitespace-nowrap px-6 py-4 ${customerRating}`}>{rep.customerRating}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{rep.customerFeedback}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{rep.staffObservationDuringVisit}</td>
                                        <td className="whitespace-nowrap px-6 py-4"><img src={rep.visit_picture}/></td>

                                    </tr>
                                ))
                                }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
