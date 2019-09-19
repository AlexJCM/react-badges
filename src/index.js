import React from "react"; //es el análogo a createElements
import ReactDOM from "react-dom"; //es el análogo appendChild

import "bootstrap/dist/css/bootstrap.css";
import "./global.css"; //para la tipografia

import App from "./components/App";

const container = document.getElementById("app");
// ( Que queremos renderizar,  Donde lo queremos renderizar)
/* ReactDOM.render(
  //le estamos enviando a badge 4 props.
  <Badge
    firstName="Alex"
    lastName="Chamba"
    avatar="https://es.gravatar.com/avatar?d=identicon"
    jobTitle="Frontend Engineer"
    twitter="@alexjcm"
  />,
  container
); */

//ReactDOM.render(<Badges />, container);
ReactDOM.render(<App />, container);
