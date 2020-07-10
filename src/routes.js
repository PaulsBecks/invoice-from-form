import React from "react";
import { Switch, Route } from "react-router-dom";

export default (
  <Switch>
    <Route exact path="/"></Route>
    <Route exact path="/blog"></Route>
    <Route path="/blog/:blogId"></Route>
    <Route path="/imprint"></Route>
    <Route path="/pricing"></Route>
    <Route path="/dataprotection"></Route>
  </Switch>
);
