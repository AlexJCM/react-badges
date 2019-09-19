import React from "react";

import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import api from "../api";
import BadgeDetails from "./BadgeDetails";

//El Container se va a encargar de la logica
class BadgeDetailsContainer extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
    modalIsOpen: false //si se pone true el modal se abrira al momento de
    //acceder a esta pagina
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      //El id lo obtenemos desde la url gracias a react router
      const data = await api.badges.read(this.props.match.params.badgeId);

      this.setState({
        loading: false,
        data
      });
    } catch (error) {
      this.setState({
        loading: false,
        error
      });
    }
  };

  handleOpenModal = e => {
    this.setState({
      modalIsOpen: true
    });
  };

  handleCloseModal = e => {
    this.setState({
      modalIsOpen: false
    });
  };

  handleDeleteBadge = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      await api.badges.remove(this.props.match.params.badgeId);
      this.props.history.push("/badges"); //metodo de react-router

      /* this.setState({
        loading: false
      }); */
    } catch (error) {
      this.setState({
        loading: false,
        error
      });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }
    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }

    return (
      <BadgeDetails
        onCloseModal={this.handleCloseModal}
        onOpenModal={this.handleOpenModal}
        modalIsOpen={this.state.modalIsOpen}
        onDeleteBadge={this.handleDeleteBadge}
        badge={this.state.data}
      />
    );
  }
}

export default BadgeDetailsContainer;
