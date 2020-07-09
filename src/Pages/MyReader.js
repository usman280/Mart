
import React, { Component, useState, useEffect, useRef } from 'react';
import Quagga from 'quagga';

import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core'
import ShowDialogButton from '../Components/ShowDialogButton';


export default function MyReader() {


    const [codes, setCodes] = useState([]);

    const [receipt, setReceipt] = useState([]);

    const [open, setOpen] = useState(false);

    const myref = useRef();

    // const mapList = () => receipt.map(
    //     function (item, index) {
    //         return (
    //             <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }} key={index}>
    //                 <p>{item.itemid}</p>
    //                 <p>{item.itemname}</p>
    //                 <p>{item.price}</p>
    //                 <p>{item.quantity}</p>
    //             </div>
    //         )
    //     }
    // )

    const mapList = () => {
        console.log("document ::", document.querySelector('.input-stream'))
    }


    // useEffect(() => {
    //     onDetectedHandler = onDetectedHandler.bind(this);
    //     startScanning();
    // })

    var onDetectedHandler = (result) => {
        myDetectedHandler(result);
        console.log("My Barcode value", result.codeResult.code);
    }

    function quaggaInitCallback(err) {

        if (err) {
            console.log(err);
            return
        }

        Quagga.onDetected(onDetectedHandler)

        Quagga.start()
    }

    function myDetectedHandler({ codeResult }) {
        Quagga.offDetected()

        codes.includes(codeResult.code)
            ? window.alert("You have already scanned this code")
            : (() => {
                setCodes(...codes, codeResult.code)
            })()

        setTimeout(() => {
            Quagga.onDetected(onDetectedHandler)
        }, 3000)

    }

    function stopScanning() {
        Quagga.stop()
    }

    function startScanning() {

        Quagga.init({
            inputStream: {
                name: "Barcode Scanner",
                type: "LiveStream",
                target: document.querySelector('.input-stream'),
                constraints: {
                    width: 640,
                    height: 240,
                },
            },
            frequency: 2,
            decoder: {
                readers: ["code_128_reader"],
                multiple: false,
            },
            locate: true,
        },
            quaggaInitCallback.bind(this));
    }

    return (
        <div >
            <ShowDialogButton onClick={() => {
                setOpen(true);
                setTimeout(() => {
                    startScanning();
                    console.log("Reference: ", document.querySelector('.input-stream'));
                }, 500);
            }} />
            <Dialog open={open} fullScreen={true}>
                <DialogContent>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'space-around' }}>
                        <div id="App" style={{height: 250, justifyContent:'center', alignItems:'center'}}>
                            <div style={{alignSelf:'center'}} className="input-stream"></div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                            <p>Item Id</p>
                            <p>Item Name</p>
                            <p>Item Price</p>
                            <p>Item Quantity</p>
                        </div>
                        <div>
                            {mapList()}
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>

                    <Button
                        variant="contained"
                        onClick={() => {setOpen(false); stopScanning();}}
                        color="primary"
                    >
                        Cancel
                </Button>
                    <Button
                        variant="contained"
                        onClick={() => console.log("function for print missing")}
                        color="primary"
                    >
                        Generate Receipt
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}