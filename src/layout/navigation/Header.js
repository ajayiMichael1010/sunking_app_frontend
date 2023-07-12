import {Fragment, useContext, useEffect, useState} from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {userData} from "../../Utilities/UserDetails";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {MyContext} from "../../statemanagement/ComponentState";
import {appLogo} from "../../assets/ImageLinks";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const {
        isTopNavLogo , setIsTopNavbarLogo,
    } = useContext(MyContext);

    const savedToken = localStorage.getItem("userToken")
    const routeLocation = useLocation().pathname;
        if(savedToken && (routeLocation == "/login" || routeLocation == "/register")){
            window.location.href = "/dashboard";
            //navigate("/dashboard")
        }
        //
        // if(!savedToken && (routeLocation != "login" || routeLocation != "/register")){
        //     window.location.href = "/login"
        //     //navigate("/login");
        // }



    //const navigate = useNavigate();







    const handleLogout = () => {
        localStorage.removeItem("userProfile");
        localStorage.removeItem("userToken");
        //setToken(null);
        window.location.href="../login";

        setIsTopNavbarLogo(true)
    }

    return (
        <Disclosure as="nav" className="bg-gray-800">

            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="block h-8 w-auto lg:hidden"
                                        src={appLogo}
                                        alt="Your Company"
                                    />
                                    {isTopNavLogo &&
                                        <img
                                            className="hidden h-8 w-auto lg:block"
                                            src={appLogo}
                                            alt="Your Company"
                                            style={{backgroundColor:"yellow",padding:"2px"}}
                                        />
                                    }

                                </div>

                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                                {/* Profile dropdown */}
                                {!userData &&
                                    <div>
                                        <a href={`/login`}  className={`text-gray-300 hover:bg-gray-700 hover:text-white','rounded-md px-3 py-2 text-sm font-medium`}>
                                            Login
                                        </a>
                                        <a href={`/register`}  className={`text-gray-300 hover:bg-gray-700 hover:text-white','rounded-md px-3 py-2 text-sm font-medium`}>
                                            Register
                                        </a>
                                    </div>}
                                {userData &&
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 rounded-full"
                                                    src="https://res.cloudinary.com/dg8z8uh8f/image/upload/v1688724232/p7x9gq0ldoiaeadt0pmc.jpg"
                                                    alt=""
                                                />
                                                <span className={`text-white`}>&nbsp;&nbsp;{userData  && userData.full_name}</span>
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="/profile"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            onClick={handleLogout}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                }

                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>

    )
}
