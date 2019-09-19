import React from "react";
import md5 from "md5";

//componente funcional porque no tiene estado
//Recibe hasta el momento props de Badge y BadgeList
function Gravatar(props) {
  const email = props.email;
  const hash = md5(email);

  return (
    <img
      className={props.className}
      src={`https://es.gravatar.com/avatar/${hash}?d=identicon`}
      alt="Avatar"
    /> //en src le enviamos el hash respectivos a cada cuenta
  );
}

export default Gravatar;
