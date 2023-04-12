import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';

function Content() {
    const location = useLocation();
    console.log("location", location);
    return (
        <>
            {location && location.pathname === "/" && <Dashboard />}
            {/* {location && location.pathname === "/user" && <Employee />}
            {location && location.pathname === "/TransactionHistory" && <TransactionHistory />} */}
        </>
    )
}
export default Content;