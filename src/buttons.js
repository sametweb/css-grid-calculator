import React from "react";

export const operators = [
  { label: "C", className: "wide clear" },
  { label: "/", className: "divide" },
  { label: "*", className: "multiply" },
  { label: "-", className: "subtract" },
  { label: "+", className: "add" },
  { label: "=", className: "equal" },
];
export const numbers = [
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

export const buttonMapper = (arr, op, cb) =>
  arr.map(({ label, className }) => (
    <button
      key={label}
      className={`${className}${op === label ? " selected" : ""}`}
      onClick={cb}
    >
      {label}
    </button>
  ));

export const isPNeeded = (op, value) => {
  if (!op) {
    return false;
  }

  if (op === value) {
    return false;
  }

  switch (value) {
    case "+":
    case "-":
      return !(op === "+" || op === "-");
    case "/":
    case "*":
      return !(op === "/" || op === "*");
    default:
      return true;
  }
};
