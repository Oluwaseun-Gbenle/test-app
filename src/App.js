import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [currencyValue, setCurrencyValue] = useState(0);
  const [data, setData] = useState({});
  const [selected, setSelected] = useState("USD"); // Changed to uppercase to match API keys

  useEffect(() => {
    async function currencyList() {
      try {
        const res = await axios({
          method: "get",
          url: "https://api.exchangerate-api.com/v4/latest/USD",
        });

        const fetchedData = res.data;
        console.log("res", fetchedData);
        setData(fetchedData);
        if (fetchedData?.rates) {
          setCurrencyValue(fetchedData.rates[selected]);
        }
      } catch (error) {
        console.log(error.response ? error.response : error);
      }
    }

    currencyList();
  }, [selected]); // Run this when `selected` currency changes

  const handleExchange = (e) => {
    const amount = parseFloat(e.target.value); // Convert input to number
    const rates = data?.rates;
    if (rates && amount && rates[selected]) {
      const conversionRate = rates[selected];
      setCurrencyValue(amount * conversionRate);
    }
  };

  console.log("currency", currencyValue, "selected", selected);

  return (
    <>
      <div className="App" style={{ display: "flex", justifyContent: "center", margin: "25px" }}>
        <input type="number" onChange={handleExchange} placeholder="Enter amount" />
        <select
          name="select"
          id="select"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {data?.rates &&
            Object.keys(data.rates).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
        </select>
      </div>
      <div style={{ color: "red", textAlign: "center" }}>Converted Value: {currencyValue}</div>
    </>
  );
}

export default App;
