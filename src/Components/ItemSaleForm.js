import React, { useRef } from 'react';
import {  Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core'
import ReactToPrint from "react-to-print";
import QrReader from 'react-qr-reader'



const ItemSaleForm = ({ ItemsList=[], onAfterPrint, open, onClose, onCancelClick, onGenerateReceipt, QRScan, onError, result, delay, resolution }) => {

    const componentRef = useRef();

    let list = [{
        itemid: 2,
        price:200,
        quantity: 4,
        itemname: "Lora"
    }]

    list.push(ItemsList);

    return (
        <Dialog
            style={{ height: 1000, width: '80%' }}
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Enter Item Details</DialogTitle>
            <DialogContent style={{ marginBottom: 20, height: 200 }}>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'space-around' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                        <p>Item Id</p>
                        <p>Item Name</p>
                        <p>Item Price</p>
                        <p>Item Quantity</p>
                    </div>
                    <div>
                        {list.map((item, i) => (
                                <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }} key={i}>
                                    <p>{item.itemid}</p>
                                    <p>{item.itemname}</p>
                                    <p>{item.price}</p>
                                    <p>{item.quantity}</p>
                                    {console.log("Length:::")}
                                </div>))}
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <div>
                    <QrReader
                        delay={delay}
                        style={{ height: 400, width: 400 }}
                        onError={onError}
                        resolution={resolution}
                        onScan={QRScan}
                    />
                    <p style={{ textAlign: 'center', color: "red" }}>{result}</p>
                </div>
                <Button
                    variant="contained"
                    onClick={onCancelClick}
                    color="primary"
                >
                    Cancel
                </Button>
                <ReactToPrint
                    trigger={() => <Button
                        variant="contained"
                        onClick={onGenerateReceipt}
                        color="primary"
                    >
                        Generate Receipt
                    </Button>}
                    content={() => componentRef.current}
                />

            </DialogActions>
        </Dialog>
    )
}

export default ItemSaleForm;