import React from 'react';

export default function AreaPerformance(performance) {
    const areaPerformance = performance.performance;

    return (
        <>
            <h1><b>Area Performance</b></h1>
            <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                    <th scope="col" className="px-6 py-4">#</th>
                    <th scope="col" className="px-6 py-4">Area</th>
                    <th scope="col" className="px-6 py-4">Repayment Received</th>
                </tr>
                </thead>
                <tbody>
                {areaPerformance && areaPerformance.map((perform,index)=>(
                    <tr
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                        <td className="whitespace-nowrap px-6 py-4">{perform.area}</td>
                        <td className="whitespace-nowrap px-6 py-4">{perform.numberOfRepaymentReceived}</td>
                    </tr>
                ))
                }

                </tbody>
            </table>
        </>
    );
}
