import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import Menu from "./Menu";
import Game from "../game/Game";

function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/menu"} />
      </Route>
      <Route path="/menu">
        <Menu />
      </Route>
      <Route path="/game/:difficulty">
        <Game />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
