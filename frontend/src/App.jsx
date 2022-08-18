import { LoginPage } from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { Route, withRouter, Switch } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
