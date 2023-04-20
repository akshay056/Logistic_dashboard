import React,{ useState, useRef, useEffect, useMemo, useCallback} from "react";
import PaymentCards from './PaymentCards'
import PaymentList from './PaymentList'
import Campaign from "../ethereum/campaign";


function Payment(){
    const[count,setCount]=useState(0);

    useEffect( () => {
        const address = '0xF5B4E6be4b7C1311EB1fB4Dcd429FA58e1a1E521'
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

    return(
        <>
         <div className='maincontentdiv'>
       <PaymentCards ordcount={count}/>
       <PaymentList/>
       </div>
       </>
    
    )
}
export default Payment