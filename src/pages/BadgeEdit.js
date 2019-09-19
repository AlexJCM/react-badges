import React from "react";

import "./styles/BadgeEdit.css";
import header from "../images/platziconf-logo.svg";
import Badge from "../components/Badge";
import BadgeForm from "../components/BadgeForm";
import PageLoading from "../components/PageLoading";
import api from "../api";

class BadgeEdit extends React.Component {
  state = {
    loading: true, //no va a ser false cuando llegamos a esta pagina
    //este loading representa que empezamos pidiendo datos
    error: null, //comenzamos sin error
    form: {
      firstName: "",
      lastName: "",
      email: "",
      twitter: "",
      jobTitle: ""
    }
  };

  componentDidMount() {
    this.fetchData();
  }
  //GET
  fetchData = async e => {
    this.setState({ loading: true, error: null });

    try {
      //read va a tomar el id del badge que selecionemos
      // match.params es propio de react-router(los routes le pasan a los componentes)
      //Es decir podemos acceder a la variable :badgeId que declaramos en App.js
      //Y asi cargaremos los datos del badge seleccionado
      // en el form respectivo para editarlo
      const data = await api.badges.read(this.props.match.params.badgeId);

      this.setState({
        loading: false,
        form: data //en lugar de guardar dentro de data guardamos en el form
      });
    } catch (error) {
      this.setState({
        loading: false,
        error
      });
    }
  };

  //SEGUNDA FORMA
  handleChange = e => {
    //para evitar que se sobreeescriba la info que form tenia anteriormente:
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value }
    });
  };

  //para hacer el PUT
  handleSubmit = async e => {
    e.preventDefault(); //detenemos el evento
    this.setState({
      loading: true,
      error: null //detenenos el loading
    });

    //hacemos la llamada para crear el nuevo badge que hace vez guardara el badge en db.json
    try {
      //para actualizar el badge enviamos su id y el form
      await api.badges.update(this.props.match.params.badgeId, this.state.form);
      this.setState({
        loading: false //detenenos el loading
      });

      this.props.history.push("/badges"); //redirigimos a la pagina /badges
    } catch (error) {
      this.setState({
        loading: false,
        error
      });
    }
  };

  render() {
    if (this.state.loading) {
      //mientras se guarden los datos se presentara este componente
      return <PageLoading />;
    }
    return (
      <React.Fragment>
        <div className="BadgeEdit__hero">
          <img
            className="BadgeEdit__hero-image img-fluid"
            src={header}
            alt="Header"
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName={this.state.form.firstName || "FIRST_NAME"}
                lastName={this.state.form.lastName || "LAST_NAME"}
                twitter={this.state.form.twitter || "@twitter"}
                jobTitle={this.state.form.jobTitle || "JOBTITLE"}
                email={this.state.form.email || "EMAIL"}
                avatarUrl="https://es.gravatar.com/avatar?d=identicon"
              />
            </div>
            <div className="col-6">
              <h1>Edit Attendant</h1>
              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form} //Pasamos los valores del formulario al BadgeForm
                //en tiempo real
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeEdit;
