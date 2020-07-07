import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
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
        return (
            <div>
                <div>
                <QrReader
                    delay={100}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    resolution={100}
                    facingMode="environment"
                    style={{ height: 240, width: 300 }}
                />
                </div>
                <p style={{ marginTop: 400, color: 'red', fontSize: 30}}>{this.state.result}</p>
            </div>
        )
    }
}