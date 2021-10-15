import { LoginPage } from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import RoutersMap from "./components/routes";

const App = () => {
  return (
    <div className="App"> 
      {/* <Switch> */}
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={MainPage} />
      {/* </Switch> */}
    </div>
  );
};

export default withRouter(App);
