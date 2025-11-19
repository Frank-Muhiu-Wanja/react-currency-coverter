import { useState, useEffect } from "react";
import Logo from "/logo.png";
import Currency from "/currency.png";
import "./App.css";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");

  const [info, setInfo] = useState([]); // store the values
  const [options, setOptions] = useState([]); // store the name e.g usd
  const [output, setOutput] = useState();

  useEffect(() => {
    axios
      .get(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025.11.18/v1/currencies/${from}.json`
      )
      .then((res) => {
        setInfo(res.data[from]);
      })
      .catch((err) => console.log(err));
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info));
    Convert();
  }, [info]);

  const Convert = () => {
    const rate = info[to];
    setOutput(amount * rate);
  };

  return (
    <div className="App">
      <div className="converter">
        <div className="heading">
          <h4>
            <img src={Logo} className="logo" />
            Currency converter
          </h4>
        </div>

        <div className="container">
          <div className="left">
            <h4>Amount</h4>
            <input
              type="text"
              placeholder="Enter Amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="middle">
            <h4>From</h4>
            <select onChange={(e) => setFrom(e.target.value)} value={from}>
              {options.map((o) => (
                <option value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="right">
            <h4>To</h4>
            <select onChange={(e) => setTo(e.target.value)} value={to}>
              {options.map((o) => (
                <option value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="result">
            <h5>Converted Amount</h5>
            <h5>{amount + " " + from + " = " + output + " " + to}</h5>
            <button onClick={Convert}>Convert</button>
          </div>
        </div>
      </div>
      <div className="image">
        <img src={Currency} alt="" />
      </div>
    </div>
  );
}

export default App;
