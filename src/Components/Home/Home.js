import React from "react";
import TicketCard from "../TicketCard/TicketCard";

const Home = (props) => {
  const { data } = props;

  return (
    <div className="container-fluid d-flex justify-content-center flex-wrap align-items-center mt-5">
      {data.map((ticket) => (
        <div>
          <TicketCard
            key={ticket.id}
            type={ticket.type}
            banner={ticket.banner}
            price={ticket.price}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
