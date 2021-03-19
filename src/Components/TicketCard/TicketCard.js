import React from "react";
import { Link } from "react-router-dom";

const TicketCard = (props) => {
  const { type, banner, price } = props;

  const cardStyle = {
    border: "none",
    width: "18rem",
  };
  const buttonRound = {
    borderRadius: "30px",
  };

  return (
    <div style={cardStyle} className="card bg-transparent text-white m-5">
      <img src={banner} className="card-img" alt="..." />
      <div className="card-img-overlay d-flex flex-column">
        <div>
          <h1 className="card-title">{type}</h1>
        </div>
        <div className="d-grid m-auto">
          <Link to="/destination">
            <button style={buttonRound} className="btn btn-warning btn-lg px-5">
              BUY NOW
            </button>
          </Link>
        </div>
        <div className="mt-auto mb-3 text-center">
          <h3 className="card-text">Tk. {price}</h3>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
