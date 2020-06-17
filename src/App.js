import React from "react";
import Login from './Pages/Login';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import BarCodeTest from './Pages/BarCodeTest';
import ReadbarCode from './Pages/ReadBarCode';
import MasterHome from './Pages/Master/MasterHome';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

  }
  render() {
    if (this.state.loading) {
      return (
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <p>Loading</p>
        </div>
      );
    } else {
      return (
        <Router>
            <Route exact path="/" component={Login} />
            <Route exact path="/Home" component={MasterHome} />
        </Router>
      );
    }
  }
}

export default App;
