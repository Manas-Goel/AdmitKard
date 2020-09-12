import React from "react";
import { Switch, Route } from "react-router-dom";
import Question from "./Components/Question/Question";
import Search from "./Components/Search/Search";

const App = () => {
  return (
    <Switch>
      <Route path="/add" component={Question} />
      <Route path="/" component={Search} />
    </Switch>
  );
};

export default App;
