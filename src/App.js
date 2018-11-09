import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CharacterEdit from "./views/CharacterEdit";
import CharacterList from "./views/CharacterList";
import CharacterDetails from "./views/CharacterDetails";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/characters"
          name="CharacterList"
          component={CharacterList}
        />
        <Route
          path="/character/:id"
          name="CharacterEdit"
          component={CharacterEdit}
        />
        <Route
          path="/details/:id"
          name="CharacterDetails"
          component={CharacterDetails}
        />
        <Redirect from="/" to="/characters" />
      </Switch>
    );
  }
}

export default App;
