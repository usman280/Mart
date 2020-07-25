import React from "react";
import Login from './Pages/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MasterHome from './Pages/Master/MasterHome';
import Shop1Home from './Pages/ShopView/Shop1/Shop1Home';
import Shop2Home from './Pages/ShopView/Shop2/Shop2Home';
import Shop3Home from './Pages/ShopView/Shop3/Shop3Home';
import Shop4Home from './Pages/ShopView/Shop4/Shop4Home';

import Shops from "./Pages/Master/Shops";
import Accounts from './Pages/Master/Accounts';

import Shop1Inventory from './Pages/ShopView/Shop1/Shop1Inventory';
import Shop2Inventory from './Pages/ShopView/Shop2/Shop2Inventory';
import Shop3Inventory from './Pages/ShopView/Shop3/Shop3Inventory';
import Shop4Inventory from './Pages/ShopView/Shop4/Shop4Inventory';
import MainInventory from "./Pages/Master/MainInventory";

import Shop1Sales from "./Pages/ShopView/Shop1/Shop1Sales";
import Shop2Sales from "./Pages/ShopView/Shop2/Shop2Sales";
import Shop3Sales from "./Pages/ShopView/Shop3/Shop3Sales";
import Shop4Sales from "./Pages/ShopView/Shop4/Shop4Sales";


import SignupPage from './Pages/SignupPage';

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
          <Route exact path="/" component={Shop3Home} />

          <Route exact path="/MasterHome" component={MasterHome} />
          <Route exact path="/MainInventory" component={MainInventory} />

          <Route exact path="/Shops" component={Shops} />
          <Route exact path="/Shop1Inventory" component={Shop1Inventory} />
          <Route exact path="/Shop2Inventory" component={Shop2Inventory} />
          <Route exact path="/Shop3Inventory" component={Shop3Inventory} />
          <Route exact path="/Shop4Inventory" component={Shop4Inventory} />

          <Route exact path="/Accounts" component={Accounts} />

          <Route exact path="/Shop1Sales" component={Shop1Sales} />
          <Route exact path="/Shop2Sales" component={Shop2Sales} />
          <Route exact path="/Shop3Sales" component={Shop3Sales} />
          <Route exact path="/Shop4Sales" component={Shop4Sales} />

          <Route exact path="/Shop1Home" component={Shop1Home} />
          <Route exact path="/Shop2Home" component={Shop2Home} />
          <Route exact path="/Shop3Home" component={Shop3Home} />
          <Route exact path="/Shop4Home" component={Shop4Home} />
        </Router>
      );
    }
  }
}

export default App;
