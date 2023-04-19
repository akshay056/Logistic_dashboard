import { useState } from "react";
import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
// import Layout from "./Layout";
import { Buffer } from "safe-buffer";
import {create as ipfsClient} from 'ipfs-http-client';

const TestModal = ({open, onClose, rowInfo}) => {

    const projectId = '2NxJMYhDpERqRp621ZYvAdfMCli';
    const projectSecret = 'eeb623c13ca6fde2936a70a6f2f2bd51';
    const auth =
      'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
    
        
    const ipfs = ipfsClient({ host: 'ipfs.infura.io',port: 5001,protocol: 'https',headers: {authorization: auth,}, });

    const [state, setState] = useState({
        value: "",
        orderId: "",
        inspectedby: "",
        approvedby: "",
        selectedFile:"",
        recipient: "",
        loading: false,
        errorMessage: "Try again"
      })
      if(!open) return null
    
    //   async function getInitialProps(props) {
    //     console.log(props);
    //     const { address } = props.query;
    //     console.log(address);
    //     return { address };
    //   } 
    
      const onSubmit = async (event) => {
        event.preventDefault();
        const campaign = Campaign('0x3B9913F0BA1e1bea71f8dc1266046Cc87c1B5cD1');
        const { orderId, inspectedby, approvedby, value, selectedFile, recipient } = state;
    
        setState({ ...state, loading: true, errorMessage: "" });

        try {
          const accounts = await web3.eth.getAccounts();

          const addPdfToIpfs = async (pdfFile) => {
            const result = await ipfs.add(pdfFile);
            return result.path;
          };
          const ipfsHash = await addPdfToIpfs(selectedFile);
          console.log('ipfs hash', ipfsHash);

          await campaign.methods
            .createRequest(orderId, inspectedby, approvedby, web3.utils.toWei(value, "ether"),ipfsHash,recipient)
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
              <h3>Create a Bill</h3>
    
              <Form onSubmit={onSubmit} error={!!state.errorMessage}>
    
                <Form.Field>
    
                  <label>OrderID</label>
    
                  <Input
    
                    value={state.orderId}
    
                    onChange={(event) =>
                      setState({ ...state, orderId: event.target.value })
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label>Manufacturer Name: </label>
                  <Input
                    value={state.inspectedby}
                    onChange={(event) =>
                      setState({ ...state, inspectedby: event.target.value })
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label>Ordered by </label>
                  <Input
                    value={state.approvedby}
                    onChange={(event) =>
                      setState({ ...state, approvedby: event.target.value })
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label>Value in Ether</label>
                  <Input
                  value={state.value}
                  onChange={(event) => setState({ ...state, value: event.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Upload</label>
                    <Input type="file"
                    
                    onChange={(event) =>
                        setState({...state, selectedFile: event.target.files[0] })
                    }
                    />
                </Form.Field>

                <Form.Field>
                  <label>Recipient</label>
                  <Input
                    value={state.recipient}
                    onChange={(event) =>
                      setState({ ...state, recipient: event.target.value })
                    }
                  />
                </Form.Field>
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