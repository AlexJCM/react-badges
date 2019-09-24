import React from "react"; //es el análogo a createElements
import ReactDOM from "react-dom"; //es el análogo appendChild
import "bootstrap/dist/css/bootstrap.css";
import "./global.css"; //para la tipografia
import App from "./components/App";

const container = document.getElementById("app");

function render() {
  // ( Que queremos renderizar,  Donde lo queremos renderizar)
  ReactDOM.render(<App />, container);
}

render();

if (module.hot) {
  module.hot.accept("./components/App", () => {
    render();
  });
}
