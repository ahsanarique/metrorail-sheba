import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fakeData, stations } from "../../fakeData/fakeData";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import DestinationInput from "./DestinationInput";
import GoogleMap from "../GoogleMap/GoogleMap";

const Destination = () => {
  const [data, setData] = useState([]);
  const [stationNames, setStationNames] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [amount, setAmount] = useState(1);
  const [output, setOutput] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setData(fakeData.filter((x) => x.id === Number(id)));
    setStationNames(stations);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOutput(true);
  };

  const inputData = {
    from: from,
    to: to,
    date: date,
    time: time,
    amount: amount,
    setFrom: setFrom,
    setTo: setTo,
    setDate: setDate,
    setTime: setTime,
    setAmount: setAmount,
  };

  const formStyle = {
    width: "25rem",
  };

  return (
    <React.Fragment>
      <div>
        {!output && (
          <Form
            onSubmit={handleSubmit}
            style={formStyle}
            className="text-white bg-dark p-4 rounded"
          >
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>From:</Form.Label>
              <Form.Control
                onChange={(e) => setFrom(e.target.value)}
                as="select"
                required
              >
                {stationNames.map((station) => (
                  <option key={station}>{station}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>To:</Form.Label>
              <Form.Control
                onChange={(e) => setTo(e.target.value)}
                as="select"
                required
              >
                {stationNames.map((station, idx) => (
                  <option key={idx}>{station}</option>
                ))}
              </Form.Control>
              <Form.Row className="my-4">
                <Col>
                  <Form.Label>Enter Date:</Form.Label>
                  <Form.Control
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    min="2021-04-01"
                    max="2022-04-01"
                    required
                  ></Form.Control>
                </Col>
                <Col>
                  <Form.Label>Enter Time:</Form.Label>
                  <Form.Control
                    onChange={(e) => setTime(e.target.value)}
                    type="time"
                    required
                  />
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Enter Amount</Form.Label>
              <Form.Control
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                defaultValue="1"
                min="1"
                max="10"
              />
            </Form.Group>
            <Button
              className="my-4"
              variant="warning"
              type="submit"
              size="bg"
              block
            >
              Update
            </Button>
          </Form>
        )}
        {output && (
          <DestinationInput
            data={data[0]}
            setOutput={setOutput}
            inputData={inputData}
          />
        )}
      </div>
      <div className="m-5">
        <GoogleMap />
      </div>
    </React.Fragment>
  );
};

export default Destination;
