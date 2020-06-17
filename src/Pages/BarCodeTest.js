import React from 'react';
import Barcode from 'react-barcode';
import { Button } from '@material-ui/core';
import BarcodeReader from 'react-barcode-reader'

export default class BarCodeTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
            myid: '',
            myname: '',
            result: 'no result'
        };

        //this.handleScan = this.handleScan.bind(this)
    }

    update(event) {
        this.setState({
            value: event.target.value,
        });
    }

    handleScan(result){
        if(result){
          this.setState({ result })
        }
        else{
            this.setState({
                result: 'no code to detect'
            })
        }
      }
      handleError(err){
        console.error(err)
      }

    render() {
        return (
            <div>
                <div>
                    <input
                        type="text"
                        id="uniqueid"
                        style={{ width: 300 + 'px' }}
                        onChange={(text) => this.setState({ myid: text.target.value })}
                        value={this.state.myid}
                    />
                    <input
                        type="text"
                        id="name"
                        style={{ width: 300 + 'px' }}
                        onChange={(text) => this.setState({ myname: text.target.value })}
                        value={this.state.myname}
                    />
                    <Button onClick={() => this.setState({
                        value: {
                            id: this.state.myid,
                            name: this.state.myname
                        }
                    })}>
                        Generate
                    </Button>
                </div>

                <Barcode
                    value={this.state.value}
                    width='1'
                    height='20'
                    format='CODE128'
                    displayValue={false}
                    background='#fff'
                />



                <BarcodeReader
                    onError={this.handleError}
                    onScan={this.handleScan}
                />

                <p>{this.state.result}</p>
            </div>
        );
    }
}