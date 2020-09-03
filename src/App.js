import React, { useState, useEffect } from "react";
import { math } from "./math";
import { operators, numbers, buttonMapper, isPNeeded } from "./buttons";
import "./styles/index.scss";

function App(props) {
  const [num1, setNum1] = useState("0");
  const [num2, setNum2] = useState("");
  const [op, setOp] = useState("");
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState("");
  const [isResult, setIsResult] = useState(false);

  const onNumberButton = (e) => {
    let value = e.target.textContent;

    if (!op) {
      value = (num1 === "0" ? "" : isResult ? "" : num1) + value;
      isResult ? setNum2(value) : setNum1(value);
      setIsResult(false);
    } else {
      value = (isResult ? "" : num2) + value;
      setNum2(value);
      setIsResult(false);
    }
  };

  const onOperatorButton = (e) => {
    let value = e.target.textContent;

    if (value === "C") {
      setNum1("0");
      setNum2("");
      setOp("");
      setHistory("");
      setIsResult(false);
    } else if (value === "=") {
      if (num1 && op && num2) {
        let p_open = isPNeeded(op, value) ? "(" : "";
        let p_close = isPNeeded(op, value) ? ")" : "";
        let result = math(num1, op, num2);

        setHistory(p_open + history + op + num2 + p_close);

        setNum1(String(result % 1 === 0 ? result : result.toFixed(2)));
        setNum2("");
        setOp("");
        setIsResult(true);
      }
    } else if (!op || (op && !num2)) {
      let p_open = num2 && isNaN(history) && isPNeeded(op, value) ? "(" : "";
      let p_close = num2 && isNaN(history) && isPNeeded(op, value) ? ")" : "";

      setOp(value);
      setHistory(
        p_open + history + (isResult ? "" : num2 && !op ? "" : num1) + p_close
      );
    } else {
      if (num2) {
        let p_open = isNaN(history) && isPNeeded(op, value) ? "(" : "";
        let p_close = isNaN(history) && isPNeeded(op, value) ? ")" : "";
        let result = math(num1, op, num2);

        // Check if result is float
        result = result % 1 === 0 ? result : result.toFixed(2);

        setHistory(p_open + history + op + num2 + p_close);

        setNum1(String(result));
        setNum2("");
        console.log("here");
        setOp(value);
        setIsResult(true);
      }
    }
  };

  console.log({ num1, num2, op, display, history });

  useEffect(() => {
    setDisplay(num2);
  }, [num2]);

  useEffect(() => {
    setDisplay(num1);
  }, [num1]);

  return (
    <div className="App">
      <h1 className="title">CSS Grid Calculator</h1>
      <div className="calculator">
        <div className="screen">
          <p className="history">{history ? history : ""}</p>
          <p className="current">{display}</p>
        </div>
        {buttonMapper(numbers, op, onNumberButton)}
        {buttonMapper(operators, op, onOperatorButton)}
      </div>
      <p className="footer">
        Created By:{" "}
        <a
          href="https://sametmutevelli.com"
          title="Samet Mutevelli's Personal Website"
        >
          Samet Mutevelli
        </a>
      </p>
    </div>
  );
}

export default App;
