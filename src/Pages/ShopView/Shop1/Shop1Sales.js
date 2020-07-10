import React, { useState, useEffect, useRef, createRef } from 'react';
import CustomTable from '../../../Components/CustomTable';
import { database } from '../../../config';
import AddCircle from "@material-ui/icons/AddCircle";
import ShowDialogButton from '../../../Components/ShowDialogButton';

import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core'
import ReactToPrint from "react-to-print";
import Quagga from 'quagga';


export default function Shop1Sales() {


  const componentRef = useRef();
  const nameRef = useRef();

  const [shop1Data, setShop1Data] = useState([]);
  const [open, setOpen] = useState(false);
  const [receipt, setReceipt] = useState([]);
  const [list] = useState([]);
  const [codes, setCodes] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [print, setPrint] = useState(false);


  useEffect(() => {


    onDetectedHandler = onDetectedHandler.bind(this);
    console.log("value kia ha", scanning);

    const fetchData = async () => {
      database
        .ref("shop1")
        .child("Sales")
        .orderByChild("quantity")
        .on("value", (snapshot) => {
          let items = snapshot.val();
          //setItemId(items.length);
          console.log("Response", items);

          let newItemsList = [];
          for (let item in items) {
            newItemsList.push({
              itemid: items[item].itemid,
              itemname: items[item].itemname,
              price: items[item].price,
              quantity: items[item].quantity,
            });
          }

          setShop1Data(newItemsList);
        });
    };

    fetchData();
  }, []);



  var onDetectedHandler = (result) => {
    Quagga.offDetected()

    console.log("Codes", codes);

    if (codes.includes(result.codeResult.code)) {
      window.alert("Already Scanned");
    }
    else {
      const itemid = result.codeResult.code;
      codes.push(itemid);

      if (result && result !== null) {
        const path = itemid.toString();

        database.ref('shop1').child("Inventory").child(path).on("value", (snapshot) => {

          list.push(snapshot.val());
          const newlist = [...list];
          setReceipt(newlist);
        });
      }
    }
    setTimeout(() => {
      Quagga.start();
      Quagga.onDetected(onDetectedHandler)
    }, 1000);

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 30,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >

        <ShowDialogButton onClick={() => {
          setOpen(true);
          setTimeout(() => {
            startScanning(navigator.hardwareConcurrency);
          }, 100);
        }} />
      </div>

      <Dialog
        open={open}
        className="App"
        onClose={() => { setOpen(false); stopScanning(); }}
        fullScreen={true}
      >
        <DialogTitle id="form-dialog-title">Enter Item Details</DialogTitle>
        <DialogContent style={{ marginBottom: 20, height: 200 }}>

          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', height: 250, alignItems: 'center' }} className="input-stream"></div>

          <div ref={componentRef} style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'space-around' }}>

            {print ? (<div ref={nameRef}>
              <h1>Mini Mini Garments</h1>
              <p>Shop Num 1</p>
              <p>Address: Madina City Mall Saddar</p>
            </div>) : null}

            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
              <p >Item Id</p>
              <p>Item Name</p>
              <p>Item Price</p>
              <p>Item Quantity</p>
            </div>
            <div>
              {mapList()}
            </div>
          </div>
        </DialogContent>
        <DialogActions className="AppContainer">

          <Button
            variant="contained"
            onClick={() => { setOpen(false); stopScanning(); }}
            color="primary"
          >
            Cancel
                </Button>

          <ReactToPrint
            trigger={() => <Button
              variant="contained"
              color="primary"
            >
              Generate Receipt
                    </Button>}
            onBeforeGetContent={() => {
              setPrint(true)}}
            onAfterPrint={() => setPrint(false)}
            documentTitle={"Mini Mini Garments"}
            content={() => componentRef.current}
          />

        </DialogActions>
      </Dialog>

      <CustomTable
        mytitle="Shop 1 Inventory"
        mydata={shop1Data}
      />

    </div>
  )
}
