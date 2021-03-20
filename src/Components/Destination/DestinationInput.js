import React from "react";
import Button from "react-bootstrap/Button";

const DestinationInput = (props) => {
  const { type, banner, price } = props.data;
  const {
    from,
    to,
    date,
    time,
    amount,
    setFrom,
    setTo,
    setDate,
    setTime,
    setAmount,
  } = props.inputData;

  const cardStyle = {
    border: "none",
    width: "18rem",
  };

  const handleReset = () => {
    setFrom("");
    setTo("");
    setDate("");
    setTime("");
    setAmount(1);
    props.setOutput(false);
  };

  return (
    <div>
      <div style={cardStyle} className="card bg-transparent text-white m-5">
        <img src={banner} className="card-img" alt="..." />
        <div className="card-img-overlay d-flex flex-column">
          <div>
            <h1 className="card-title">{type}</h1>
          </div>
          <div className="card-text">
            <h5>
              From {from} to {to} starting from {date} at {time}
            </h5>
            <h5>Amount: {amount}</h5>
          </div>

          <div className="mt-auto mb-3 text-center">
            <h3 className="card-text">
              Total: Tk. {price} x {amount} = {price * amount}
            </h3>
          </div>
        </div>
      </div>
      <Button
        onClick={() => handleReset()}
        className="my-4"
        variant="warning"
        type="submit"
        size="bg"
        block
      >
        Reset
      </Button>
    </div>
  );
};

export default DestinationInput;
