import React from "react";
import ReactToPrint from "react-to-print";
import QRCodeGenerator from './QRCodeGenerator';

class ComponentToPrint extends React.Component {
  render() {
    return (
        <QRCodeGenerator />
    );
  }
}

export default class PrintCheck extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}
