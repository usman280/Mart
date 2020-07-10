import React, { useState, useEffect, useRef, createRef } from 'react';
import { database } from '../config';
import Quagga from 'quagga';
import { Button } from '@material-ui/core';


export default function ListCheck() {

    const [open, setOpen] = useState(false);
    const [receipt, setReceipt] = useState([]);
    const [list, setList] = useState([]);
    const [codes, setCodes] = useState([]);

    var onDetectedHandler = (result) => {
        Quagga.offDetected()

        console.log("Codes", codes);
        // codes.includes(codeResult.code)
        //     ? window.alert("You have already scanned this code")
        //     : (() => {
        //         const result = codeResult.code;

        //         setCodes(...codes, codeResult.code);
        //         if (result) {
        //             const path = result.toString();

        //             database.ref('shop1').child("Inventory").child(path).on("value", (snapshot) => {


        //                 list.push(snapshot.val());

        //                 console.log(list);

        //                 setReceipt(list);
        //             });
        //         }
        //     })();

        if (codes.includes(result.codeResult.code)) {
            window.alert("Already Scanned");
        }
        else {


            const itemid = result.codeResult.code;
            codes.push(itemid);

            if (result && result !== null) {
                const path = itemid.toString();

                database.ref('shop1').child("Inventory").child(path).on("value", (snapshot) => {

                    console.log("snapshot", snapshot.val());

                    list.push(snapshot.val());
                    const newlist = [...list];
                    setReceipt(newlist);

                    console.log(receipt)
                    
                });
            }
        }
        // console.log("My Barcode value", result.codeResult.code);
        setTimeout(() => {
            Quagga.start();
            Quagga.onDetected(onDetectedHandler)
        }, 1000);

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

        // codes.includes(codeResult.code)
        //     ? window.alert("You have already scanned this code")
        //     : (() => {
        //         const result = codeResult.code;

        //         setCodes(...codes, codeResult.code);
        //         if (result) {
        //             const path = result.toString();

        //             database.ref('shop1').child("Inventory").child(path).on("value", (snapshot) => {


        //                 list.push(snapshot.val());

        //                 console.log(list);

        //                 setReceipt(list);
        //             });
        //         }
        //     })();

        if (codes.includes(codeResult.code)) {
            window.alert("Already Scanned");
        }
        else {
            setCodes(...codes, codeResult.code);

            const result = codeResult.code;

            if (result && result !== null) {
                const path = result.toString();

                database.ref('shop1').child("Inventory").child(path).on("value", (snapshot) => {


                    list.push(snapshot.val());

                    console.log(list);

                    setReceipt(list);
                });
            }
        }

        // setTimeout(() => {
        //     Quagga.onDetected(onDetectedHandler)
        // }, 3000);

    }

    function stopScanning() {
        Quagga.stop()
    }

    function startScanning(cores) {
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
            frequency: 10,
            decoder: {
                readers: ["code_128_reader"],
                multiple: false,
            },
            locate: true,
            numofWorkers: cores,
        }, function (err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });

        Quagga.onDetected(onDetectedHandler);
    }

    useEffect(() => {
        startScanning(navigator.hardwareConcurrency);
    })



    const mapList = () => receipt.map(
        function (item, index) {
            return (
                <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }} key={index}>
                    <p>{item.itemid}</p>
                    <p>{item.itemname}</p>
                    <p>{item.price}</p>
                    <p>{item.quantity}</p>
                </div>
            )
        }
    )


    return (
        <div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', height: 250, alignItems: 'center' }} className="input-stream"></div>

            <Button onClick={() => {
                const details = {
                    itemid: 4,
                    itemname: "Ibad",
                    price: 200,
                    quantity: 20
                };

                // list.push(details);

                const newlist = [...receipt, details];
                setReceipt(newlist);
                console.log(receipt);
                //  console.log(list);
            }}>
                Add New Item
            </Button>

            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'space-around' }}>
                <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                    <p>Item Id</p>
                    <p>Item Name</p>
                    <p>Item Price</p>
                    <p>Item Quantity</p>
                </div>
                <div>
                    {receipt.map((item, index) =>
                        <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }} key={index}>
                            <p>{item.itemid}</p>
                            <p>{item.itemname}</p>
                            <p>{item.price}</p>
                            <p>{item.quantity}</p>
                        </div>
                    )
                    }
                </div>
            </div>

        </div>
    );

}