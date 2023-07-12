import React from 'react';

export default function TaskPerformance(performance) {
    const taskPerformance = performance.performance;
    console.log(taskPerformance)
    return (
        <>
            <h1><b>Task Performance</b></h1>
            <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                    <th scope="col" className="px-6 py-4">#</th>
                    <th scope="col" className="px-6 py-4">Team Member ID</th>
                    <th scope="col" className="px-6 py-4">Task Title</th>
                    <th scope="col" className="px-6 py-4">Target Repayment</th>
                    <th scope="col" className="px-6 py-4">Repayment Received</th>
                </tr>
                </thead>
                <tbody>
                {taskPerformance && taskPerformance.map((perform,index)=>(
                    <tr
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                        <td className="whitespace-nowrap px-6 py-4">{perform.task.staff_id}</td>
                        <td className="whitespace-nowrap px-6 py-4">{perform.task.task_title}</td>
                        <td className="whitespace-nowrap px-6 py-4">{perform.task.number_of_target_repayment}</td>
                        <td className="whitespace-nowrap px-6 py-4">{perform.numberOfRepaymentReceived}</td>
                    </tr>
                ))
                }

                </tbody>
            </table>
        </>
    );
}
