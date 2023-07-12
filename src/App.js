import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import SuccessScreen from "./components/SuccessScreen";
import UserProfile from "./pages/protected/users/UserProfile";
import StaffProfile from "./pages/protected/staff/StaffProfile";
import CustomerProfile from "./pages/protected/customer/CustomerProfile";
import StaffRecord from "./pages/protected/staff/StaffRecord";
import CustomerRecord from "./pages/protected/customer/CustomerRecord";
import ContentContainer from "./layout/ContentContainer";
import {MyContextProvider} from "./statemanagement/ComponentState";
import NewStaff from "./pages/protected/staff/NewStaff";
import NewCustomer from "./pages/protected/customer/NewCustomer";
import NewTask from "./pages/protected/activities/NewTask";
import NewVisit from "./pages/protected/activities/NewVisit";
import AllTaskRecords from "./pages/protected/activities/AllTasks";
import Performance from "./pages/protected/performances/Performances";
import AuditingReport from "./pages/protected/report/Auditing";

function App() {
  return (
    <div className="App">
        <MyContextProvider>
            <Routes>

                <Route element={<ContentContainer />}>
                    <Route index element={<Login />} />

                    <Route path = "register"  element={<Register/>} />
                    <Route path = "login"  element={<Login/>} />

                    <Route path = "dashboard"  element={<UserProfile/>} />
                    <Route path="/profile" element={<UserProfile/>} />

                    <Route path="/staff/register" element={<NewStaff/>} />
                    <Route path="/staff/profile" element={<StaffProfile/>} />
                    <Route path="/staff/record" element={<StaffRecord/>} />

                    <Route path="/customer/register/" element={<NewCustomer/>} />
                    <Route path="/customer/profile/" element={<CustomerProfile/>} />
                    <Route path="/customer/record" element={<CustomerRecord/>} />

                    <Route path="/task" element={<NewTask/>} />
                    <Route path="/all-tasks" element={<AllTaskRecords/>} />
                    <Route path="/visit" element={<NewVisit/>} />
                    <Route path="/performance" element={<Performance/>} />
                    <Route path="/report" element={<AuditingReport/>} />
                </Route>

                <Route path ="success"  element={<SuccessScreen/>} />

            </Routes>
        </MyContextProvider>


    </div>
  );
}

export default App;
