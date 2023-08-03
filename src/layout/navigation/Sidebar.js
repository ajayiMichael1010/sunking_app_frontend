import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {userData} from "../../Utilities/UserDetails";
import {PlusIcon} from "@heroicons/react/20/solid";
import ItemSpacing from "../../components/ItemSpacing";

function Sidebar() {
    const [collapseShow, setCollapseShow] = useState("hidden");

    const linkClass = "flex cursor-pointer items-center truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10";
    const iconSpanClass ="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300";
    const parentSpanClass = "px-6 py-4 text-[0.6rem] font-bold uppercase text-gray-600 dark:text-gray-400";
    const spacing = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';


    return (
        <>
            <nav
                id="sidenav"
                className="absolute left-0 top-0 z-[1035] w-60 -translate-x-full bg-yellow-300 shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
                data-te-sidenav-init=""
                data-te-sidenav-hidden="false"
                data-te-sidenav-position="absolute"
                style={{height:"auto"}}
            >
                <Link
                    className="mb-3 flex items-center justify-center border-b-2 border-solid border-gray-100 py-6 outline-none"
                    to="/login"  data-te-ripple-init=""  data-te-ripple-color="primary" >
                    <img id="te-logo" className="logo-background mr-2 w-32" src="https://sunking.com/wp-content/uploads/2017/12/Sun-King-Logo-1.png" alt="TE Logo" draggable="false" width={300}/>
                    {/*<span>King Sun</span>*/}
                </Link>
                <ul className="relative m-0 list-none px-[0.2rem] pb-12" data-te-sidenav-menu-ref="">
                    <li className="relative">
                        <a className={`${linkClass}`}  data-te-sidenav-link-ref="">
                            <span className={`${parentSpanClass}`}><img className="h-8 rounded-full" src="https://res.cloudinary.com/dg8z8uh8f/image/upload/v1688724232/p7x9gq0ldoiaeadt0pmc.jpg" alt=""/></span>
                            <span>{userData  && userData.fullName}</span>
                        </a>
                    </li>

                    {userData.userType === "CUSTOMER" &&
                        <>

                        </>
                    }

                    {userData.userType === "STAFF" &&
                        <>
                            <li className="relative pt-4">
                                <a className={`${linkClass}`}
                                   data-te-sidenav-link-ref=""
                                >
                                    <span className={`${iconSpanClass}`}><PlusIcon /></span>
                                    <span>Activities</span>
                                </a>
                            </li>
                            <li className="relative">
                                <a
                                    className={`${linkClass}`}
                                    data-te-sidenav-link-ref=""
                                    href={`/task`}
                                >
                                    <ItemSpacing /> <span>New Task</span>
                                </a>
                            </li>
                            <li className="relative">
                                <a
                                    className={`${linkClass}`}
                                    data-te-sidenav-link-ref=""
                                    href={`/all-tasks`}
                                >
                                    <ItemSpacing /> <span>All Tasks</span>
                                </a>
                            </li>
                            <li className="relative">
                                <a
                                    className={`${linkClass}`}
                                    data-te-sidenav-link-ref=""
                                    href={`/visit`}
                                >
                                    <ItemSpacing />  <span>New Visit</span>
                                </a>
                            </li>

                            <li className="relative pt-4">
                                <a className={`${linkClass}`} data-te-sidenav-link-ref="">
                                    <span className={`${iconSpanClass}`}><PlusIcon /></span>
                                    <span>Staff</span>
                                </a>
                            </li>
                            <li className="relative">
                                <a
                                    className={`${linkClass}`}
                                    data-te-sidenav-link-ref=""
                                    href={`/staff/register`}
                                >
                                    <ItemSpacing />  <span>New Staff</span>
                                </a>
                            </li>
                            <li className="relative">
                                <a
                                    className={`${linkClass}`}
                                    data-te-sidenav-link-ref=""
                                    href={`/staff/record`}
                                >
                                    <ItemSpacing />  <span>All Staff</span>
                                </a>
                            </li>

                            <li className="relative pt-4">
                                <a className={`${linkClass}`} data-te-sidenav-link-ref="">
                                    <span className={`${iconSpanClass}`}><PlusIcon /></span>
                                    <span>Customer</span>
                                </a>
                            </li>
                            <li className="relative">
                                <a
                                    className={`${linkClass}`}
                                    data-te-sidenav-link-ref=""
                                    href={`/customer/register`}
                                >
                                    <ItemSpacing />  <span>New Customer</span>
                                </a>
                            </li>
                            <li className="relative">
                                <a
                                    className={`${linkClass}`}
                                    data-te-sidenav-link-ref=""
                                    href={`/customer/record`}
                                >
                                    <ItemSpacing />  <span>All Customers</span>
                                </a>
                            </li>

                            <li className="relative pt-4">
                                <a className={`${linkClass}`} data-te-sidenav-link-ref="">
                                    <span className={`${iconSpanClass}`}><PlusIcon /></span>
                                    <span>Report & Performance</span>
                                </a>
                            </li>
                            <li className="relative">
                                <li className="relative">
                                    <a
                                        className={`${linkClass}`}
                                        data-te-sidenav-link-ref=""
                                        href={`/performance`}
                                    >
                                        <ItemSpacing />   <span>Performance</span>
                                    </a>
                                </li>
                                <li className="relative">
                                    <a
                                        className={`${linkClass}`}
                                        data-te-sidenav-link-ref=""
                                        href={'/report'}
                                    >
                                        <ItemSpacing />   <span>Audit Report</span>
                                    </a>
                                </li>
                            </li>
                        </>
                    }

                </ul>
            </nav>
        </>

    );
}
export default Sidebar;