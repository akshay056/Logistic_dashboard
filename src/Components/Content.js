import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import Payment from './Payment';
import ShipmentRequest from './ShipmentRequest';

function Content() {
    const location = useLocation();
    console.log("location", location);
    return (
        <>
            {/* {location && location.pathname === "/" && <Dashboard />} */}
            {location && location.pathname === "/dashboard" && <Dashboard />}
            {location && location.pathname === "/Payment" && <Payment />}
            {location && location.pathname === "/ShipmentRequest" && <ShipmentRequest />}

            
            {/* {location && location.pathname === "/user" && <Employee />}
            {location && location.pathname === "/TransactionHistory" && <TransactionHistory />} */}
        </>
    )
}
export default Content;