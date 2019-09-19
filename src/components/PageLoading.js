import React from "react";
import "./styles/PageLoading.css";

import Loader from "./Loader";

function PageLoading() {
  return (
    //Es para generar unos puntios antes de quie se carga la data
    <div className="PageLoading">
      <Loader />
    </div>
  );
}

export default PageLoading;
