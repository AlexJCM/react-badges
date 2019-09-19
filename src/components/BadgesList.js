import React from "react";
import { Link } from "react-router-dom";
import "./styles/BadgesList.css";
import Gravatar from "./Gravatar";

//CUSTOM HOOK
function useSearchBadges(badges) {
  const [query, setQuery] = React.useState(""); //como valor inicial le damos ""
  //convertimos en un estado, y su valor incial sera la lista competa de los badges
  const [filteredBadges, setFilteredBadges] = React.useState(badges);

  //Usamos el hook: useMemo para que la primera vez que se busque valores
  //se guardaran para asi optimizar y no volver a busqcar esos mismo valores
  // la siguiente busqueda, tiene dos parametros: una funcion y una lista
  React.useMemo(() => {
    const result = badges.filter(badge => {
      // return badge.firstName.toLowerCase().includes(query);//busca solo por nombre
      // Vamos a buscar en nombre y apellido y como el resultado es string
      //podemos convertir a minusculas
      return `${badge.firstName} ${badge.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });

    setFilteredBadges(result); //cuando ya tenemos el resultado lo guardamos
  }, [badges, query]);

  return { setQuery, filteredBadges }; //devolvemos una fomra de poner el query y
  // una lista filtrada
}

function BadgesList(props) {
  const badges = props.badges;

  const { query, setQuery, filteredBadges } = useSearchBadges(badges);

  if (filteredBadges.length === 0) {
    return (
      <div>
        <div className="form-group">
          <label>Filter Badges</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <h3>No badges were found</h3>
        <Link className="btn btn-primary" to="/badges/new">
          Create new badge
        </Link>
      </div>
    );
  }

  return (
    <div className="BadgesList">
      <div className="form-group">
        <label>Filter Badges</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <ul className="list-unstyled">
        {filteredBadges.map(badge => {
          return (
            <li key={badge.id}>
              <Link
                className="text-reset text-decoration-none"
                //cada badge sera un link a la pagina BadgeEdit
                to={`/badges/${badge.id}`}
              >
                <div className="BadgesListItem">
                  <Gravatar
                    className="Badge__avatar"
                    email={badge.email}
                    alt="Avatar"
                  />
                  <div>
                    <strong>
                      {badge.firstName} {badge.lastName}
                    </strong>
                    <br />
                    {badge.twitter}
                    <br />
                    {badge.jobTitle}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BadgesList;
