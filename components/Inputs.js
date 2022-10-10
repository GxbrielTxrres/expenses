import { useState } from "react";
import * as React from "react";
import styles from "../styles/Home.module.css";
import Datagrid from "./datagrid";
const Inputs = (props) => {
  const [depositOne, setDepositOne] = useState("");
  const [price, setPrice] = useState("");
  const [withdraw, setWithdraw] = useState("");
  const [tableData, setTableData] = useState(props.data);

  const updateFinances = async () => {
    if (!(depositOne && price && withdraw) > 0) {
      props.handleOpen();
    }

    const res = await fetch("/api/db", {
      method: "POST",
      body: JSON.stringify({ depositOne, withdraw, price }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setTableData(data);
  };

  {
    return (
      <div>
        <Datagrid tableData={tableData} />
        <div style={{ width: 400, display: "inline", marginRight: 20 }}>
          <label htmlFor="depositOne">Deposit: </label>
          <input
            type="text"
            name="depositOne"
            value={depositOne}
            placeholder="Enter Exact Amount..."
            onChange={(e) => {
              setDepositOne(e.target.value);
            }}
          />
        </div>
        <div style={{ width: 400, display: "inline", marginRight: 20 }}>
          <label htmlFor="price">Price: </label>
          <input
            type="text"
            name="price"
            value={price}
            placeholder="Enter Exact amount..."
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
            placeholder="Enter Exact Amount..."
            onChange={(e) => {
              setWithdraw(e.target.value);
            }}
          />
        </div>
        <button onClick={updateFinances}>Submit</button>
      </div>
    );
  }
};

export default Inputs;
