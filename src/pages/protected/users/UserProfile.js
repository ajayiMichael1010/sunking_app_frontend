import {userData} from "../../../Utilities/UserDetails";
import CustomerProfile from "../customer/CustomerProfile";
import StaffProfile from "../staff/StaffProfile";
export default function UserProfile() {
    const userComponent = userData.userType =="CUSTOMER" ?<CustomerProfile/>:<StaffProfile/>
    return (
        <div>
            {userComponent}
        </div>
    )
}
