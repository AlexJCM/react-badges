import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./Layout";
import Badges from "../pages/Badges";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import BadgeNew from "../pages/BadgeNew";
import BadgeEdit from "../pages/BadgeEdit";
import BadgeDetailsContainer from "../pages/BadgeDetailsContainer";

//Esta clase es para usar el reac-router-dom
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/badges" component={Badges} />
          <Route exact path="/badges/new" component={BadgeNew} />
          <Route exact path="/badges/:badgeId/edit" component={BadgeEdit} />
          <Route
            exact
            path="/badges/:badgeId"
            component={BadgeDetailsContainer}
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
export default App;
