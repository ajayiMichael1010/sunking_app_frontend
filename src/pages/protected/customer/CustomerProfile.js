import React, {useContext, useState} from "react";
import {userData} from "../../../Utilities/UserDetails";
import CustomerEditModal from "./CustomerEditModal";
import {MyContext} from "../../../statemanagement/ComponentState";

export default function CustomerProfile() {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {showModal,setShowModal} = useContext(MyContext);

    const modalOnClick = () => {
        setShowModal(true);
    }


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="flex flex-1 justify-center">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-6">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <h2>CUSTOMER PROFILE</h2>
                            <table className="min-w-full text-left text-sm font-light">
                                <thead
                                    className="border-b bg-white font-medium">
                                <tr>
                                    <th scope="col" className="px-6 py-4" colSpan={2}>
                                        <div style={{display:"flex",
                                            justifyContent:"center", alignItems:"center",backgroundColor:"#ee"}}>
                                            <div className="mt-2" style={{position:"relative"}}>
                                                <div style={{backgroundColor:"#eee",borderRadius:"50%",
                                                    width:"100px",height:"100px",display:"flex",
                                                    justifyContent:"center", alignItems:"center"}}>
                                                    <img
                                                        className="mx-auto h-10 w-auto"
                                                        src="https://res.cloudinary.com/dg8z8uh8f/image/upload/v1688724232/p7x9gq0ldoiaeadt0pmc.jpg"
                                                        alt="Your Company"
                                                        style={{width:"80px",height:"80px",borderRadius:"50%"}}
                                                    />
                                                    <div style={{position:"absolute",right:"-70px"}}><button onClick={modalOnClick}>Edit Profile</button></div>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr
                                    className="border-b bg-neutral-100">
                                    <td className="whitespace-nowrap px-8 py-4 font-medium">Full Name</td>
                                    <td className="whitespace-nowrap px-6 py-4">{userData.fullName}</td>
                                </tr>
                                <tr
                                    className="border-b">
                                    <td className="whitespace-nowrap px-8 py-4 font-medium">Gender</td>
                                    <td className="whitespace-nowrap px-6 py-4">{userData.gender}</td>
                                </tr>
                                <tr
                                    className="border-b bg-neutral-100">
                                    <td className="whitespace-nowrap px-8 py-4 font-medium">Date Of Birth</td>
                                    <td className="whitespace-nowrap px-6 py-4">{userData.dateOfBirth}</td>
                                </tr>

                                <tr
                                    className="border-b">
                                    <td className="whitespace-nowrap px-8 py-4 font-medium">Religion</td>
                                    <td className="whitespace-nowrap px-6 py-4">{userData.religion}</td>
                                </tr>
                                <tr
                                    className="border-b bg-neutral-100">
                                    <td className="whitespace-nowrap px-8 py-4 font-medium">Email</td>
                                    <td className="whitespace-nowrap px-6 py-4">{userData.email}</td>
                                </tr>
                                <tr
                                    className="border-b">
                                    <td className="whitespace-nowrap px-8 py-4 font-medium">Phone Number</td>
                                    <td className="whitespace-nowrap px-6 py-4">{userData.phoneNumber}</td>
                                </tr>
                                <tr
                                    className="border-b bg-neutral-100">
                                    <td className="whitespace-nowrap px-8 py-4 font-medium">Country</td>
                                    <td className="whitespace-nowrap px-6 py-4">{userData.country}</td>
                                </tr>
                                <tr
                                    className="border-b">
                                    <td className="whitespace-nowrap px-8 py-4 font-medium">State</td>
                                    <td className="whitespace-nowrap px-6 py-4">{userData.state}</td>
                                </tr>

                                <tr
                                    className="border-b bg-neutral-100">
                                    <td className="whitespace-nowrap px-8 py-4 font-medium">City</td>
                                    <td className="whitespace-nowrap px-6 py-4">{userData.city}</td>
                                </tr>

                                <tr
                                    className="border-b">
                                    <td className="whitespace-nowrap px-8 py-4 font-medium">Region</td>
                                    <td className="whitespace-nowrap px-6 py-4">{userData.region}</td>
                                </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            {showModal &&  <CustomerEditModal/>}

        </>
    )
}
