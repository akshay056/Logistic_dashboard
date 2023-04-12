import './Card.css';

function Card() {
  return (
    <>
      <div style={{ display: "flex" }} className="usercard">
        <div className="card text-dark bg-i mb-3" style={{ maxWidth: "18rem", }}>

          <div className="card-footer bg-transparent border-success nftsspan">

            <div><h4 className="card-text">Total Shipments :</h4></div><br />

            <h6 className="card-title">
              {/* {accountAddress} */}
              10</h6>

          </div>
        </div>
        <div className="card carduser2 card-user text-dar bg-info-2 mb-3" style={{ maxWidth: "16rem", marginLeft: "20px" }}>
          <div className="card-heade">
            <span className='nftsspan'>
              <i className='fa fa-users usersicon'></i>
              {/* {logo2 && <img className="nftimage" src={logo2} />} */}
            </span>
          </div>
          <div class="card-footer bg-transparent border-success">
            <div><h4 className="card-text">In Progress:</h4></div><br />
            <h6 className="card-title">
              {/* {accountBalance} ETH */}
              3</h6>
          </div>
        </div>
        <div className="card carduser2 card-user text-dar bg-info-2 mb-3 " style={{ maxWidth: "16rem", marginLeft: "20px" }}>
          <div className="">
            <span className=''>
              <i className='fa fa-users usersicon'></i>
              {/* {logo2 && <img className="nftimage" src={logo2} />} */}
            </span>
          </div>
          <div class="card-footer bg-transparent border-success nftsspan">
            <div><h4 className="card-text">Delievered :</h4></div><br />
            <h6 className="card-title">
              {/* {accountBalance} ETH*/}
              7</h6> 
          </div>
        </div>
      </div>
    </>
  )
}
export default Card;