import React from "react";

class BadgeForm extends React.Component {
  //De esta manera pasamos los inputs de no controlado a 'controlado'
  //con apoyo del value={this.state.xxx} de cada input"
  //LO COMENTAMOS porque ya tenemos el estado en BAdegeNew.js
  /*  state = {
    jobTitle: "Designer" //al estar inicializado en el input correspondiente
    //siempre aparecera la palabra Designer
  }; */

  /*   //manejador de los eventos del input
  handleChange = e => {
        // console.log({
     // name: e.target.name, //para ver el nombre desde donde se esta escrbiendo
      //value: e.target.value //Para ver el valor de lo que estamos escribiendo
    }); 
    //guardamos informacion en el estado
    this.setState({
      //firstName:  e.target.value
      //Obtiene el input en el que se este escribiendo y guarda el valor
      //que se este escribiendo en dicho propio input
      [e.target.name]: e.target.value
    });
  };
 */
  handleClick = e => {
    console.log("Button was clicked");
  };

  //aqui leyemos los valores
  // handleSubmit = e => {
  //  e.preventDefault(); //para cuando no queremos que este formulario se envie
  //  console.log("Form was submitted"); //
  //  console.log(this.props.formValues);
  // };

  // Ya no usaremos este HANDLE porque ahora vamos a recibir una funcion que
  //contendra ya un handle (es el onSubmit que nos envia BadgeNew)
  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="firstName"
              value={this.props.formValues.firstName} //para leer el estado se usa this.state
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="lastName"
              value={
                this.props.formValues.lastName
                //formValues viene de BadgeNew
              }
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="email"
              name="email"
              value={this.props.formValues.email}
            />
          </div>

          <div className="form-group">
            <label>Job Title</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="jobTitle"
              value={this.props.formValues.jobTitle}
            />
          </div>

          <div className="form-group">
            <label>Twitter</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="twitter"
              value={this.props.formValues.twitter}
            />
          </div>

          <button onClick={this.handleClick} className="btn btn-primary">
            Save
          </button>

          {this.props.error && (
            //Si hay error se presentara un mensaje debajo del  boton Save
            <p className="text-danger">{this.props.error.message}</p>
          )}
        </form>
      </div>
    );
  }
}

export default BadgeForm;
