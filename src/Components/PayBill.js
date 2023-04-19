import { useState } from "react"
 import React from "react"
import { useNavigate } from 'react-router-dom';
// import { RowContainerName } from "ag-grid-community";

function PayBill(){

    const[file,setFile]=useState()

    function handleFile(event){
        setFile(event.target.files[0])
        // console.log(event.target.files[0])
    }

    function handleUpload(){
        const formData=new FormData()
        formData.append('file',file)
        fetch(
            'url',
            {
                method:"POST",
                body:formData
            }
        ).then((response)=>response.json()).then(
            (result)=>{
                console.log('success',result)
            }
        ).catch(error=>{
            console.error("Error:",error)
        })
    }

    const navigate=useNavigate();
    const navigateToPaybill=()=>{
        navigate('/');
    }

    return(
        
        // <><h2>Shipment Bill</h2>
        // <form onSubmit={handleUpload} >
        // <br /><p> <b>Shipment No : </b><input></input></p>
        // <p> <b>Shipping Bill No:</b> <input></input> </p>
        // <p> <b>Shipping Date :</b> <input type={Date}></input> </p>
       
        // <p> <b>Upload Bill of Landing: </b>  </p>
        // <input type='file'  name="file"  onChange={handleFile}/>
        // <button>Upload</button>
        
        // <br />
        // </form>
        // </>
        
        <form onSubmit={handleUpload}>
        <h3 style={{justifyContent:'center'}}>Shipment Bill</h3>
        
        <div className="mb-3">
          <label>Shipment No:</label>
          <input
            type="text"
            
            className="form-control"
            placeholder="Enter Shipment No"

            style={{width:'30%'}}
          />
        </div>
        <div className="mb-3">
          <label>Shipping Bill No:</label>
          <input
            type="text"
            
            className="form-control"
            placeholder="Enter bill no"
            style={{width:'30%'}}
          />
        </div>

        <div className="mb-3">
          <label>Shipping Date</label>
          <input
            type="Date"
            className="form-control"
            placeholder="Enter Date"
            style={{width:'30%'}}
          />
        </div>

        <div className="mb-3">
          <label>Upload Landing Bill</label>
          <input
            type='file'
            className="form-control"
            placeholder="upload a file"
            style={{width:'30%'}}
          />
        </div>
        
        <div className="d-grid">
          {/* <input   name="file"  onChange={handleFile}/> */}
          <button type="submit" className="btn btn-primary" onChange={handleFile} style={{width:'10%'}}>
            Submit
          </button>
        </div><br/>

        <div className="d-grid">
          {/* <input   name="file"  onChange={handleFile}/> */}
          <button type='' className="btn btn-primary"  onClick={navigateToPaybill} style={{width:'10%'}}>
            Cancel
          </button>
        </div>
       
      </form>
    )
}
export default PayBill