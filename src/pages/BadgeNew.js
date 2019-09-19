import React from "react";

import "./styles/BadgeNew.css";
import header from "../images/platziconf-logo.svg";
import Badge from "../components/Badge";
import BadgeForm from "../components/BadgeForm";
import PageLoading from "../components/PageLoading";
import api from "../api";

class BadgeNew extends React.Component {
  state = {
    loading: false, //no va a ser true cuando llegamos a esta pagina
    //este loading representa que estamos enviando los datos
    error: null, //comenzamos sin error
    form: {
      firstName: "",
      lastName: "",
      email: "",
      twitter: "",
      jobTitle: ""
    }
  };

  //Levantamiento del estado
  //Este handle le pasamos a BadgeForm como "props" ya que ese componnete lo requiere
  //Recibe comp arametro a "e"
  /*   handleChange = e => {
    //para evitar que se sobreeescriba la info que form tenia anteriormente:
    const nextForm = this.state.form;
    nextForm[e.target.name] = e.target.value;
    this.setState({
      form: nextForm
    });
  }; */

  //SEGUNDA FORMA
  handleChange = e => {
    //para evitar que se sobreeescriba la info que form tenia anteriormente:
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value }
    });
  };

  //para hacer el POST
  handleSubmit = async e => {
    e.preventDefault(); //detenemos el evento
    this.setState({
      loading: true,
      error: null //detenenos el loading
    });

    //hacemos la llamada para crear el nuevo badge que hace vez guardara el badge en db.json
    try {
      await api.badges.create(this.state.form);
      this.setState({
        loading: false //detenenos el loading
      });

      this.props.history.push("/badges"); //redirigimos al usuario a la pagina badges
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
        <div className="BadgeNew__hero">
          <img
            className="BadgeNew__hero-image img-fluid"
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
              <h1>New Attendant</h1>
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

export default BadgeNew;
