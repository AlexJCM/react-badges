import React from "react";

import Navbar from "./Navbar";

function Layout(props) {
  //el props children es un argumento interno de react
  const children = props.children;
  return (
    <React.Fragment>
      <Navbar />
      {
        //esto comparte el contenido del Layout, en este caso el Navbar, con
        //las demas paginas
        props.children
      }
    </React.Fragment>
  );
}

export default Layout;
