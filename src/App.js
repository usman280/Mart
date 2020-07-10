import React from "react";
import Login from './Pages/Login';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MasterHome from './Pages/Master/MasterHome';
import Shop1Inventory from './Pages/Master/SubInventories/Shop1Inventory';
import Shop2Inventory from './Pages/Master/SubInventories/Shop2Inventory';
import Shop3Inventory from './Pages/Master/SubInventories/Shop3Inventroy';
import Shop4Inventory from './Pages/Master/SubInventories/Shop4Inventroy';
import Shops from "./Pages/Master/Shops";
import CustomTable from './Components/CustomTable';
import MainInventory from "./Pages/Master/MainInventory";
//import QRCodeGenerator from "./Pages/QRcodeGenerator";
import ComponentToPrint from './Pages/QRCodeGenerator';
import PrintCheck from './Pages/PrintCheck';
import Shop1Home from './Pages/ShopView/Shop1/Shop1Home';
import Shop2Home from './Pages/ShopView/Shop2/Shop2Home';
import QRCodeReader from './Pages/QRCodeReader';
import CodeReader from './Components/BarCodeReader';
import Shop1Sales from "./Pages/ShopView/Shop1/Shop1Sales";
import BarCodeGenerator from "./Pages/BarCodeGenerator";
import BarCodeReader from "./Pages/BarCodeReader";
import MyReader from "./Pages/MyReader";
import ListCheck from "./Pages/ListCheck";

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
          <Route exact path="/" component={Shop1Sales} />
          <Route exact path="/Home" component={Login} />
          <Route exact path="/Shops" component={Shops} />
          <Route exact path="/Shop1Inventory" component={Shop1Inventory} />
          <Route exact path="/Shop2Inventory" component={Shop2Inventory} />
          <Route exact path="/Shop3Inventory" component={Shop3Inventory} />
          <Route exact path="/Shop4Inventory" component={Shop4Inventory} />
        </Router>
      );
    }
  }
}

export default App;
