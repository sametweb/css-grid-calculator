import React, { useState } from "react";
import "./styles/index.scss";

const operators = [
  { label: "C", className: "wide clear" },
  { label: "/", className: "divide" },
  { label: "*", className: "multiply" },
  { label: "-", className: "subtract" },
  { label: "+", className: "add" },
  { label: "=", className: "equal" },
];
const numbers = [
  { label: 7, className: "number" },
  { label: 8, className: "number" },
  { label: 9, className: "number" },
  { label: 4, className: "number" },
  { label: 5, className: "number" },
  { label: 6, className: "number" },
  { label: 1, className: "number" },
  { label: 2, className: "number" },
  { label: 3, className: "number" },
  { label: 0, className: "wide zero" },
];

function App(props) {
  const [num1, setNum1] = useState("0");
  const [num2, setNum2] = useState("");
  const [op, setOp] = useState("");
  const [history, setHistory] = useState("");
  const [isResult, setIsResult] = useState(false);

  const buttonMapper = (arr, cb) =>
    arr.map(({ label, className }) => (
      <button
        key={label}
        className={`${className}${op === label ? " selected" : ""}`}
        onClick={cb}
      >
        {label}
      </button>
    ));

  const onNumberButton = (e) => {
    let value = e.target.textContent;

    if (!op) {
      value = (num1 === "0" ? "" : isResult ? "" : num1) + value;
      setNum1(value);
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
        setHistory(`${history}` + `${op} ${num2}`);
        setNum1(String(eval(`${num1}${op}${num2}`)));
        setNum2("");
        setOp("");
        setIsResult(true);
      } else {
        // do nothing
      }
    } else if (!op || (op && !num2)) {
      setOp(value);
      setHistory(
        (history ? "(" : "") +
          history +
          (isResult ? "" : num1) +
          (history ? ")" : "") +
          " "
      );
      setIsResult(false);
    } else {
      setHistory(history + `${op} ${num2}`);
      setNum1(String(eval(`${num1}${op}${num2}`)));
      setNum2("");
      setOp("");
      setIsResult(true);
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="screen">
          <p className="history">{history ? history : ""}</p>
          <p className="current">{num2 ? num2 : num1}</p>
        </div>
        {buttonMapper(numbers, onNumberButton)}
        {buttonMapper(operators, onOperatorButton)}
      </div>
    </div>
  );
}

export default App;
