import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../../assets/includes/Config";

export default  function CustomerRecord() {
    const [customers, setCustomers] = useState(null);

    const getAllStaff = () => {
        axios.get(`${baseUrl}/api/customer`)
            .then(res => {
                console.log(res.data)
                setCustomers(res.data);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllStaff();
    },[])

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <h1><b>Customer Record</b></h1>
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">#</th>
                                <th scope="col" className="px-6 py-4">Full Name</th>
                                <th scope="col" className="px-6 py-4">Email</th>
                                <th scope="col" className="px-6 py-4">Phone Number</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customers && customers.map((cus,index)=>(
                                <tr
                                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{cus.fullName}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{cus.email}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{cus.phoneNumber}</td>
                                </tr>
                            ))
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
}

