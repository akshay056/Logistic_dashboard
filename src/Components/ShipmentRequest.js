/* eslint-disable no-unused-vars */
import React, { useState,useEffect} from 'react'
import { AgGridReact } from 'ag-grid-react';
// import { ReactDOM } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import DocumentRenderer from './DocumentDropdown';
import Documents from './Documents';
import view from '../Assets/view2.png';
import download from '../Assets/dwnld1.png';
import PDFViewer from './PDFViewer';
import { useNavigate } from 'react-router-dom';
// import Modal from './Model';
// import samplepdf from '../Assets/sample.pdf'


// import { isButtonElement } from 'react-router-dom/dist/dom';

const ShipmentRequest = () => {
    // const pdfURL = 'http://localhost:4000/PaymentList';
    // eslint-disable-next-line no-unused-vars
    const [documentName, setDocumentName] = useState("RM");

    // const [rowData] = useState([
    //     {requestid:'0123',from:'Vj',materialname:'xyz',to:'trupti',quantity:'2',doc:'',bill:''},
    //     {requestid:'0124',from:'Akshy',materialname:'xyz',to:'trupti',quantity:'2',doc:'',bill:''},
    //     {requestid:'0125',from:'Naveen',materialname:'xyz',to:'trupti',quantity:'2',doc:'',bill:''},
    //     {requestid:'0126',from:'Sumen',materialname:'xyz',to:'trupti',quantity:'2',doc:'',bill:''},
    //     {requestid:'0127',from:'Sahithi',materialname:'xyz',to:'trupti',quantity:'2',doc:'',bill:''},
    // ],
    // );

    const [rowData, setRowData] = useState();

    const [columnDefs] = useState([
        {
            headerName: 'Sl.No',
            valueGetter: "node.rowIndex + 1",
            flex: 1.5
        },
        { field: 'requestid', headerName: 'RequestID ', filter: true, width:150, sortable:true },
        { field: 'make', headerName: 'From(Supplier) ', filter: true,  width:150,sortable:true },
        {
            field: 'model', headerName: 'MaterialName', filter: true, width:150
               
        },
        {
            field: 'price', headerName: 'To(Manufacturer)', filter: true, width:160,sortable:true
               
               
        },
        {
            field: 'quantity', headerName: 'Quantity', filter: true, width:130,sortable:true
               
        },
       
        // {
        //     field: 'doc', headerName: 'Document', filter: true, flex:5
               
        // },
       

        //   {field:'doc',headerName: 'Document', width:150,

        //         cellRendererFramework: (param) => {
        
        //            console.log('param is', param);
        
        //            return (
        
        //               <DocumentRenderer param={param} selectValue={(d) => setDocumentName(d)}/>
        // // <ReportDropdown param={param}/>
        
        //                  );
        
        // }},

        {field: 'view_download', headerName:'View/Download', flex:1.5, cellRendererFramework:()=>{

           return(
            
            //  <img src={view} alt="View" style={{width:15,height:15}} />
            <><img src={view} alt="View" onClick={onViewClicked} style={{width:25,height:20}}/>&nbsp;<img src={download} onClick={onDownloadClicked} alt="Download" style={{width:25,height:20}} /></>
            
            
              )
            
        }},

            // {field: 'download', headerName:'Download', flex:1.5, cellRendererFramework:()=>{

            //      return(
                
            //     <img src={download} alt="Download" style={{width:15,height:15}} />
                
            //      )
                
            // }},

            {
                field: 'Bill', headerName: 'Bill', filter: true, flex:1.5,cellRendererFramework:(params)=>{

                    return(
                        // <button onClick={navigateToPaybill} >Proceed To Bill</button>
                        <button onClick={onClickProceedToBill} >Proceed To Bill</button>
                        
                    )
                
                }
                       
            }
        

    ]);
    const [openModal, setOpenModal] = useState(false);
    const [requestid, setRequestID] = useState();
    

    

    // const defaultColDef = useMemo(() => ({
    //     sortable: true,
    //     filter: true,
    //     autoHeight: true,
    //     resizable: true
    // }));
    // useEffect(() => {
    //     ;
    // }, [])

    useEffect(() => {

        fetch('https://www.ag-grid.com/example-assets/row-data.json')
        
        .then(result => result.json())
        
        .then(rowData => setRowData(rowData))
        
    }, []);

    // const onRowSelected = (event) => {
    //     setRowData(event.data);
    //   };

    // const navigate=useNavigate();
    // const navigateToPaybill=()=>{
    //     navigate('/PayBill');
    // }
    let parameter;
    const [openPDFModal, setOpenPDFModal] = useState(false);
    const onViewClicked = ()=> {
        console.log("cell clicked", parameter);
        // console.log("cell clicked");
        setOpenPDFModal(true);
    
     }

     const onDownloadClicked = () => {
    
        // const aTag = document.createElement('a');
        
        // document.body.appendChild(aTag);
        // aTag.click();
        // aTag.remove();
        var pdf="data:application/pdf;base64,JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==";
        
        console.log(pdf);
        const linkSource =pdf;
        const downloadLink = document.createElement("a");
        const fileName = "file.pdf";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
     }
     const onClickProceedToBill = () => {
       // console.log("cell clicked", parameter);
        setOpenModal(true);
        // setRequestID(parameter.data.model);
        // setDocumentName(parameter.data.model)
        
     };

    return (
        <div>
             <h4>Shipment Status</h4><br />
            <div className="ag-theme-alpine" style={{ height: 490, width: 'auto' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    // onClick={onRowSelected}
                    // defaultColDef={defaultColDef}
                  
                />
                {/* <Modal open={openModal} onClose={() => setOpenModal(false)} rowInfo={[requestid]}/> */}
                {/* <Modal open={openModal} onClose={() => setOpenModal(false)} rowInfo={[requestid]}/> */}
                {/* <PdfViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={[documentName]}/> */}
            
            </div>
        </div>
    )

}
export default ShipmentRequest