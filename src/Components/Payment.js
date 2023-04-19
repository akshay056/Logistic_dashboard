import React from "react";
import PaymentCards from './PaymentCards'
import PaymentList from './PaymentList'

function Payment(){
    return(
        <>
         <div className='maincontentdiv'>
       <PaymentCards/>
       <PaymentList/>
       </div>
       </>
    
    )
}
export default Payment