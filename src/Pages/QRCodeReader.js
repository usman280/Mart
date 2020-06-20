import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import { Button } from '@material-ui/core'
import { database } from '../config';

export default class QRCodeReader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 500,
            result: 'No result',
        }

        this.handleScan = this.handleScan.bind(this)
    }

    submitTransaction() {
        const details = {
            itemid: 123,
            itemname: "QRCODE",
            price: 1000,
            quantity: 500,
        };

        database
            .ref("Inventory")
            .child(details.itemid)
            .update(details)
            .then((res) => {
                console.log("Success", res);
            }).
            catch(err => console.log("FAiled", err))
    }
    handleScan(result) {
        if (result) {
            this.setState({ result });
            this.submitTransaction();
        }
    }
    handleError(err) {
        console.error(err)
    }
    render() {
        const previewStyle = {
            height: 240,
            width: 320,
        }

        return (
            <div>
                <QrReader
                    delay={this.state.delay}
                    style={previewStyle}
                    onError={this.handleError}
                    onScan={this.handleScan}
                />
                <p style={{ textAlign: 'center', color: "red" }}>{this.state.result}</p>
                <Button onClick={this.submitTransaction}>Do Transaction</Button>
            </div>
        )
    }
}