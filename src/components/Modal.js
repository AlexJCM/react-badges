import React from "react";
import ReactDOM from "react-dom";
import "./styles/Modal.css";

function Modal(props) {
  //Si es falso no se abrira el Modal, isOpen viene de BadgeDetails
  //Que a su vez hereda de BadgeDetailsContainer
  if (!props.isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="Modal">
      <div className="Modal__container">
        <button onClick={props.onClose} className="Modal__close-button">
          X
        </button>
        {
          //Para obtener el texto o valor dentro de Modal
          props.children
        }
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
