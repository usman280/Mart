import React, { Component } from 'react'
import Barcode from 'react-barcode';
 
export default class BarCodeGenerator extends Component {
  render(){
 
    return(
      <div>
        <Barcode value="4" />
      </div>
    )
  }
}