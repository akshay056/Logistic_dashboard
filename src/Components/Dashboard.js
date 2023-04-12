import React from "react";
import Card from "./Card";
import Table from "./Table";

function Dashboard() {
    return (
        <>
            <div className='maincontentdiv'>
                <div><h3 className="header" style={{ color: "#023b6d", marginBottom: "20px" }}>Logistics Dashboard</h3></div>
                <Card />
                <br />Shipment List <br />
                <Table />
            </div>
        </>
    )
}
export default Dashboard;