import { useState } from "react";
import * as React from "react";
import styles from "../styles/Home.module.css";
import Datagrid from "./datagrid";
const Inputs = (props) => {
  const [deposit, setDeposit] = useState("");
  const [price, setPrice] = useState("");
  const [withdraw, setWithdraw] = useState("");
  const [tableData, setTableData] = useState(props.data);
  const [savings, setSavings] = useState("");

  const resetInputs = () => {
    setWithdraw("");
    setPrice("");
    setDeposit("");
    setSavings("");
  };

  const updateFinances = async () => {
    if (!(deposit && price && withdraw) > 0) {
      props.handleOpen();
    }

    const res = await fetch("/api/db", {
      method: "POST",
      body: JSON.stringify({ deposit, withdraw, price, savings }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setTableData(data);
    resetInputs();
  };

  {
    return (
      <div>
        <Datagrid tableData={tableData} />
        <div style={{ width: 400, display: "inline", marginRight: 20 }}>
          <label htmlFor="deposit">Deposit: </label>
          <input
            type="text"
            name="deposit"
            value={deposit}
            placeholder="Enter $ Amount..."
            onChange={(e) => {
              setDeposit(e.target.value);
            }}
          />
        </div>
        <div style={{ width: 400, display: "inline", marginRight: 20 }}>
          <label htmlFor="price">Price: </label>
          <input
            type="text"
            name="price"
            value={price}
            placeholder="Enter $ amount..."
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div style={{ width: 400, display: "inline", marginRight: 20 }}>
          <label htmlFor="withdraw">Withdraw: </label>
          <input
            type="text"
            name="withdraw"
            value={withdraw}
            placeholder="Enter $ Amount..."
            onChange={(e) => {
              setWithdraw(e.target.value);
            }}
          />
        </div>
        <div style={{ width: 400, display: "inline", marginRight: 20 }}>
          <label htmlFor="savings">Savings: </label>
          <input
            type="text"
            name="savings"
            value={savings}
            placeholder="Enter $ Amount..."
            onChange={(e) => {
              setSavings(e.target.value);
            }}
          />
        </div>
        <button onClick={updateFinances}>Submit</button>
      </div>
    );
  }
};

export default Inputs;
