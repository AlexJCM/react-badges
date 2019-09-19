import React from "react";
import { Link } from "react-router-dom";

import BadgesList from "../components/BadgesList";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import "./styles/Badges.css";
import confLogo from "../images/badge-header.svg";
import api from "../api";

//Cuando entramos a esta pagina siempre hay un GET (para listar los badges)
class Badges extends React.Component {
  constructor(props) {
    super(props);
    console.log("1. constructor");
    this.state = {
      //data: []
      loading: true, //
      error: null,
      data: undefined
    };
  }

  componentDidMount() {
    console.log("3. componentDidMount");
    this.fetchData();
    /* this.timeoutId = setTimeout(() => {
      this.setState({
        data: [
          {
            id: "2de30c42-9deb-40fc-a41f-05e62b5939a7",
            firstName: "Freda",
            lastName: "Grady",
            email: "Leann_Berge@gmail.com",
            jobTitle: "Legacy Brand Director",
            twitter: "FredaGrady22221-7573",
            avatarUrl:
              "https://www.gravatar.com/avatar/f63a9c45aca0e7e7de0782a6b1dff40b?d=identicon"
          }        
        ]
      });
    }, 3000); */
  }

  //Obtenemos los datos para la lista del db.json
  //GET
  fetchData = async () => {
    this.setState({
      loading: true,
      error: null
    });

    //Hacemos la llamada a la API
    try {
      //Esta llamada es asincrona regresa una promesa
      const data = await api.badges.list();
      this.setState({ loading: false, data });
    } catch (error) {
      this.setState({ loading: false, error });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("5. componentDidUpdate");
    //Imprimimos los valores que tenian antes
    console.log({
      prevProps: prevProps,
      prevState: prevState
    });
    //Imprimimos los valores que tiene ahora
    console.log({
      props: this.props,
      state: this.state
    });
  }

  componentWillUnmount() {
    console.log("6. componentWillUnmount");
    //Si el trabajo dentro del setTimeout esta pendiente lo cancela
    // clearTimeout(this.timeoutId);
  }

  render() {
    console.log("2. render");
    if (this.state.loading === true) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }

    return (
      <React.Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img
                className="Badges_conf-logo"
                src={confLogo}
                alt="Conf Logo"
              />
            </div>
          </div>
        </div>
        <div className="Badges__container">
          <div className="Badges__buttons">
            <Link to="/badges/new" className="btn btn-primary">
              New Badge
            </Link>
          </div>
          <div className="Badges__list">
            <div className="Badges__container">
              <BadgesList
                badges={
                  this.state.data
                  //enviamos los datos en badges incluido el email
                }
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Badges;
