import React, { PureComponent } from 'react';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];


    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            {/*<div className="min-h-full">*/}
            {/*    <header className="bg-white shadow">*/}
            {/*        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">*/}
            {/*            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>*/}
            {/*        </div>*/}
            {/*    </header>*/}
            {/*    <main>*/}
            {/*        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">/!* Your content *!/</div>*/}
            {/*    </main>*/}
            {/*</div>*/}



        </>
    )
}


// import React, { PureComponent } from 'react';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//
// const data = [
//     {
//         name: 'Page A',
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//     },
//     {
//         name: 'Page B',
//         uv: 3000,
//         pv: 1398,
//         amt: 2210,
//     },
//     {
//         name: 'Page C',
//         uv: 2000,
//         pv: 9800,
//         amt: 2290,
//     },
//     {
//         name: 'Page D',
//         uv: 2780,
//         pv: 3908,
//         amt: 2000,
//     },
//     {
//         name: 'Page E',
//         uv: 1890,
//         pv: 4800,
//         amt: 2181,
//     },
//     {
//         name: 'Page F',
//         uv: 2390,
//         pv: 3800,
//         amt: 2500,
//     },
//     {
//         name: 'Page G',
//         uv: 3490,
//         pv: 4300,
//         amt: 2100,
//     },
// ];
//
// export default class Example extends PureComponent {
//     static demoUrl = 'https://codesandbox.io/s/tiny-bar-chart-35meb';
//
//     render() {
//         return (
//             <ResponsiveContainer width="100%" height="100%">
//                 <BarChart width={150} height={40} data={data}>
//                     <Bar dataKey="uv" fill="#8884d8" />
//                 </BarChart>
//             </ResponsiveContainer>
//         );
//     }
// }
