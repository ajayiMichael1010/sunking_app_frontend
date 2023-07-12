import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../../assets/includes/Config";

export default  function StaffRecord() {
    const [staff, setStaff] = useState(null);

    const getAllStaff = () => {
        axios.get(`${baseUrl}/api/staff`)
            .then(res => {
                console.log(res.data)
                setStaff(res.data);
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
                        <h1><b>Staff Record</b></h1>
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">#</th>
                                <th scope="col" className="px-6 py-4">Name</th>
                                <th scope="col" className="px-6 py-4">Department</th>
                                <th scope="col" className="px-6 py-4">Team</th>
                            </tr>
                            </thead>
                            <tbody>
                            {staff && staff.map((s,index)=>(
                                <tr
                                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{s.fullName}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{s.department}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{s.managerialRole}</td>
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

