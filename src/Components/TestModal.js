import { useState } from "react";
import React from "react";
import { Form , Message, Input } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
// import Layout from "./Layout";
import { Buffer } from "safe-buffer";
import {create as ipfsClient} from 'ipfs-http-client';
// import './Modal.css';
const TestModal = ({open, onClose, rowInfo ,ordID}) => {

    const projectId = '2NxJMYhDpERqRp621ZYvAdfMCli';
    const projectSecret = 'eeb623c13ca6fde2936a70a6f2f2bd51';
    const auth =
      'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
    
        
    const ipfs = ipfsClient({ host: 'ipfs.infura.io',port: 5001,protocol: 'https',headers: {authorization: auth,}, });

    const [state, setState] = useState({
        billOfLanding:'',
        loading: false,
        errorMessage: ""
      })
      if(!open) return null
    
      const onSubmit = async (event) => {
        event.preventDefault();
        const campaign = Campaign('0x8A59B3f39129379D39eC22cA815cA726BB395338');
        const { billOfLanding } = state;
    
        setState({ ...state, loading: true, errorMessage: "" });

        try {
          const accounts = await web3.eth.getAccounts();

          const addPdfToIpfs = async (pdfFile) => {
            const result = await ipfs.add(pdfFile);
            return result.path;
          };
          const ipfsHash = await addPdfToIpfs(billOfLanding);
          console.log('ipfs hash', ipfsHash);

          await campaign.methods
          .createLogisticsBill(ipfsHash,rowInfo)
            .send({ from: accounts[0] });
            
            console.log("dsf");
          // Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch (err) {
          setState({ ...state, errorMessage: err.message });
          console.log('ascac',state.errorMessage);
        }
        setState({ ...state, loading: false });
      };
    
      return (
        <>
                <div  className='overlay'>
                <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
              <h3>Create a Bill</h3><br />
              
                <p > <b>Order Id:</b> {ordID}</p>
              <Form onSubmit={onSubmit} error={!!state.errorMessage}>
                {/* <Form.Field>
                  <label>OrderID</label>
    
                  <Input
    
                    value={state.orderId}
    
                    onChange={(event) 
                      => setState({ ...state, orderId: event.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Manufacturer Name: </label>
                  <Input
                    value={state.inspectedby}
                    onChange={(event) 
                      => setState({ ...state, inspectedby: event.target.value })}
                    
                  />
                </Form.Field> */}
                {/* <Form.Field>
                  <label>Ordered by </label>
                  <Input
                    value={state.approvedby}
                    onChange={(event) =>
                      setState({ ...state, approvedby: event.target.value })
                    }
                  />
                </Form.Field> */}
                {/* <Form.Field>
                  <label>Value in Ether</label>
                  <Input
                  value={state.value}
                  onChange={(event) => setState({ ...state, value: event.target.value })}
                    />
                </Form.Field> */}
                <Form.Field>
                    <label>Upload Bill of Landing</label>
                    <Input type="file"
                    
                    onChange={(event) =>
                        setState({...state, billOfLanding: event.target.files[0] })
                    }
                    />
                </Form.Field>

                {/* <Form.Field>
                  <label>Recipient</label>
                  <Input
                    value={state.recipient}
                    onChange={(event) =>
                      setState({ ...state, recipient: event.target.value })
                    }
                  />
                </Form.Field> */}

                <Message error  content={state.errorMessage} />

                <button loading={state.loading} type="submit" class="btn btn-primary mb-2 " >create</button> 

                <button type="button"  onClick={onClose}  class="btn btn-danger mb-2 " style={{position:'absolute', top:'10px', right:'10px'}}>close</button> 
                </Form>
          </div>
          </div>
        </>
      )
}
export default TestModal;   