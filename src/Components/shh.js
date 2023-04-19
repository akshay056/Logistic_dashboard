import { useState } from "react";

import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

function ShipmentModal(props){

const[state, setState] = useState({

value: "",

orderId: "",

inspectedby: "",

approvedby: "",
recipient: "",

loading: false,

errorMessage: "",

})


// const [file, setFile] = useState();
//   const closeHandler =()=>{
//       props.closeFunction(true)  
 //   }
//   const handleFileChange = (e) => {
//     if (e.target.files) {
//       console.log("choose file",e.target.files)
//       localStorage.setItem('filetype', e.target.files[0].name);

//       setFile(e.target.files[0]);
//     }
//   };
//   const handleUploadClick = () => {

//     if (!file) {

//       return;

 //     }
//      // 👇 Uploading the file using the fetch API to the server

//   fetch('https://httpbin.org/post', {

//     method: 'POST',

 //     body: file,

//     // 👇 Set headers manually for single file upload
 //     headers: {

//       'content-type': file.type,

//       'content-length': `${file.size}`, // 👈 Headers need to be a string

//     },

 //   })

 //     .then((res) => res.json())

//     .then((data) => {
//       console.log("data",data)

//       localStorage.setItem("files",data.data)

//      props.closeFunction(true)  

//     })




//     .catch((err) => console.error(err));

 // };




// static async getInitialProps(props) {

//   const { address } = props.query;




//   return { address };

// }




const onSubmit = async (event) => {

 event.preventDefault();




const campaign = Campaign(this.props.address);

const { orderId, inspectedby,approvedby, value, recipient } = state;

setState({ ...state, loading: true, errorMessage: "" });


try {

const accounts = await web3.eth.getAccounts();

await campaign.methods

// .createRequest(orderId, inspectedby,approvedby, web3.utils.toWei(value, "ether"), recipient)

 .createMenufacturerrequest(orderId, inspectedby,approvedby, web3.utils.toWei(value, "ether"), recipient)

 .send({ from: accounts[0] });

// Router.pushRoute(`/campaigns/${this.props.address}/requests`);


 } catch (err) {

setState({...state, errorMessage: err.message });

}
setState({...state, loading: false });

};



return(

<>




<div id="myModal" class="modal">

 <div class="modal-content">

{/* <div className='cross'>

    <span class="close" onClick={closeHandler}>&times;</span>

    </div>

   <div>

   <div className='orderid'>

    <p>Order Id</p>

    <input type='text' placeholder='01234' />

   </div>

   <div className='orderid'>

   <p>Order Name</p>

    <input type='text' placeholder='Trupti' />

   </div>

   <div className='orderid'>

   <p>Upload Invoice</p>

 

   <input type="file" onChange={handleFileChange} />




      <div>{file && `${file.name} - ${file.type}`}</div>




   

         

   </div>

   <div className='sub'>

   <button className="button" onClick={handleUploadClick}>Submit</button>

   </div>

 

   </div> */}







{/* <Layout> */}

{/* <Link route={`/campaigns/${this.props.address}/requests`}>

          <a>Back</a>

        </Link> */}

<h3>Create a Request</h3>

<Form onSubmit={onSubmit} error={!!state.errorMessage}>

<Form.Field>

<label>OrderID</label>

<Input

value={state.orderId}

onChange={(event) =>
 setState({ ...state,orderId: event.target.value })
}
/>
 </Form.Field>
 <Form.Field>
<label>Inspected By</label>
<Input
 value={state.inspectedby}
 onChange={(event) =>
setState({ ...state,inspectedby: event.target.value })
 }
 />
</Form.Field>
<Form.Field>
<label>Approved By</label>
<Input
value={state.approvedby}
onChange={(event) =>
 setState({ ...state,approvedby: event.target.value })
}
/>
</Form.Field>
<Form.Field>
<label>Value in Ether</label>
Input
value={state.value}
onChange={(event) => setState({ ...state,value: event.target.value })}
/>
</Form.Field>
<Form.Field>
<label>Recipient</label>
<Input
value={state.recipient}
onChange={(event) =>
setState({ ...state,recipient: event.target.value })
 }
 />
</Form.Field>
<Message error header="Oops!" content={state.errorMessage} />
<Button primary loading={state.loading}>
 Create!
</Button>
</Form>
{/* </Layout> */}
</div>
</div>
</>
)
}
export default Modalpoppup;




import React, { useState } from 'react';
import "./Modal.css";

const ShipmentModal = ({open, onClose, rowInfo}) => {
    const [file, setFile] = useState();
    if(!open) return null

    function handleFile(event){
        setFile(event.target.files[0])
        console.log(file)   
    }

    return(
        <div onClick={onClose} className='overlay'>
            <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
                
                <h5>Create Shipment </h5>
                {/* <p>{console.log("the data inside modal",rowInfo[0])}</p> */}
                <br></br>
                <form>
                    <div class="form-group row">
                        <label for="orderID" class="col-sm-2 col-form-label">Order ID</label>
                        <div class="col-sm-10">
                             <input type="text" class="form-control" id="orderID" placeholder="1"/>
                         </div>
                    </div>
                    <br></br>
                    <div class="form-group row">
                        <label for="logisticsProvider" class="col-sm-2 col-form-label">Logistics Provider</label>
                        <div class="col-sm-10">
                             <input type="text" class="form-control" id="logisticsProvider" placeholder="abc"/>
                         </div>
                    </div>

                    <div class="form-group row">
                        <label for="deliveryDate" class="col-sm-2 col-form-label">Delivery Date</label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" id="deliveryDate" placeholder="today"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="status" class="col-sm-2 col-form-label">Status</label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" id="status" placeholder="today"/>
                        </div>
                    </div>
                    <br></br>
                    <div class="form-group row">
                        <label for="upload" class="col-sm-2 col-form-label">Upload</label>
                        <div class="col-sm-10">
                            <input name='file' onChange={handleFile} type="file" class="form-control" id="upload" placeholder="file"/>
                        </div>
                    </div>
                    <br></br>
                    <button type="submit" class="btn btn-primary btn-block">Submit</button>
                    <button type="button"  onClick={onClose}  class="btn btn-danger mb-2 " style={{position:'absolute', top:'10px', right:'10px'}}>close</button> 
                </form>
                {/* <br/>
                <p > <b>Order ID : </b> {rowInfo[0]}</p>
                <p> <b>Logistics Provider :</b> <input></input> </p>
                <p> <b>Delivery Date :</b> <input></input> </p>
                <p> <b>Status :</b> <input></input> </p>
                <p> <b>Upload  : </b> <input type="file" name='file' onChange={handleFile}></input> </p><span></span> */}
                {/* <button style={{height: 30, alignItems:'center', justifyContent:'center'}}>browse</button> */}
                {/* <br/>
                <button>submit</button>
                <button type="button"  onClick={onClose} className='close-modal' >close</button> */}
            </div>
        </div>
    )
}
export default ShipmentModal

import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import supplr from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";

class ShipmentModal extends Component {
  state = {
    value: "",
    orderId: "",
    inspectedby: "",
    approvedby: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  };
  
//   const ShipmentModal = ({open, onClose, rowInfo}) => {
//         const [file, setFile] = useState();
//         if(!open) return null
    
//         function handleFile(event){
//             setFile(event.target.files[0])
//             console.log(file)   
//         }

  static async getInitialProps(props) {
    console.log(props);
    const { address } = props.query;

    return { address };
  }
  onClose = async () => {
  
    let navigate = useNavigate(); 
      let path = "/dashboard"; 
      navigate(path);
    }

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = campaign(this.props.address);
    const { orderId, inspectedby,approvedby, value, recipient } = this.state;

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
        await campaign.methods
          .createRequest(orderId, inspectedby,approvedby, web3.utils.toWei(value, "ether"), recipient)
          .send({ from: accounts[0] });
        Router.pushRoute(`/campaigns/${this.props.address}/requests`);
 
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
        <>
        {/* <Link route={`/campaigns/${this.props.address}/requests`}>
            <a>Back</a> </Link> */}
            <div  onClick={this.onClose} className='overlay'>
            <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
        <h3>Create a Request</h3><Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>OrderID</label>
                    <Input
                        value={this.state.orderId}
                        onChange={(event) => this.setState({ orderId: event.target.value })} />
                </Form.Field>
                <Form.Field>
                    <label>Inspected By</label>
                    <Input
                        value={this.state.inspectedby}
                        onChange={(event) => this.setState({ inspectedby: event.target.value })} />
                </Form.Field>
                <Form.Field>
                    <label>Approved By</label>
                    <Input
                        value={this.state.approvedby}
                        onChange={(event) => this.setState({ approvedby: event.target.value })} />
                </Form.Field>
                <Form.Field>
                    <label>Value in Ether</label>
                    <Input
                        value={this.state.value}
                        onChange={(event) => this.setState({ value: event.target.value })} />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input
                        value={this.state.recipient}
                        onChange={(event) => this.setState({ recipient: event.target.value })} />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>
                    Create!
                </Button>
            </Form>
            <button type="button" onClick={this.onClose} class="btn btn-danger mb-2 " style={{position:'absolute', top:'10px', right:'10px'}}>close</button> 
                    
            </div></div>
            </>
    );
  }
}
export default ShipmentModal;