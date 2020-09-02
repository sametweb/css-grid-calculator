import React from "react";
import "./styles/index.scss";

function App(props) {
  return (
    <div className="App">
      <div className="calculator">
        <div className="screen"></div>
        <button className="wide-button clear">C</button>
        <button className="number">7</button>
        <button className="number">8</button>
        <button className="number">9</button>
        <button className="number">4</button>
        <button className="number">5</button>
        <button className="number">6</button>
        <button className="number">1</button>
        <button className="number">2</button>
        <button className="number">3</button>
        <button className="wide-button">0</button>
        <button className="divide">÷</button>
        <button className="multiply">x</button>
        <button className="subtract">-</button>
        <button className="add">+</button>
        <button className="equal">=</button>
      </div>
    </div>
  );
}

export default App;
