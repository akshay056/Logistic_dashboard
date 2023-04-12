import React, { useState } from 'react';

function Documents(props) {
    // const[doc, setdoc] = useState(props.value);
    const [doc] = useState(props.value);

    // const onDocChange = (event) => {
    //     props.onDocChange(event.target.value);
    //     setdoc(event.target.value);
    // }
    return (
        <div>
            {/* <select value={doc} onChange={onDocChange}> */}
            <select value={doc} >
                <option value="rm"> Delivery Receipt &nbsp;&nbsp;
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                </option>
                <option value="finishedgoods"> Bill Of Landing </option>
                <option value="quality"> Quality Report</option>
                <option value="insurance"> Insurance Report</option>
            </select>
        </div>
    )
}
export default Documents;