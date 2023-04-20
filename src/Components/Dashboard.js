import React,{ useState, useRef, useEffect, useMemo, useCallback} from "react";
import Card from "./Card";
import Table from "./Table";
import Campaign from "../ethereum/campaign";
function Dashboard() {
    const[count,setCount]=useState(0);

    useEffect( () => {
        const address = '0x3B9913F0BA1e1bea71f8dc1266046Cc87c1B5cD1'
        const campaign = Campaign(address);
        console.log('use effect campaign',campaign);
        (async () => {
          const requestCount = await campaign.methods.getRequestsCount().call();
          console.log('req count', requestCount);
          const approversCount = await campaign.methods.approversCount().call();
          const requests = await Promise.all(
            Array(parseInt(requestCount))
              .fill()
              .map((element, index) => {
                
                return campaign.methods.requests(index).call();
              })
          );
        //   setRequest(requests)
          setCount(requestCount)
          console.log('useeffect requests',requestCount, requests);
          return { address, requests, requestCount, approversCount };
        } )();
        
          
          return () => {
              
          }
         
       },[])

    return (
        <>
            <div className='maincontentdiv'>
                <div><h3 className="header" style={{ color: "#023b6d", marginBottom: "20px" }}>Logistics Dashboard</h3></div>
                <Card ordcount={count}/>
                <br />Shipment List <br />
                <Table />
            </div>
        </>
    )
}
export default Dashboard;