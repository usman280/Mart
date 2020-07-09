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

  const [shop1Data, setShop1Data] = useState([]);
  const [open, setOpen] = useState(false);
  const [receipt, setReceipt] = useState([]);
  const [list] = useState([]);
  const [codes, setCodes] = useState([]);
  const [scanning, setScanning] = useState(false);

  const cameraRef = createRef();


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
    myDetectedHandler(result);
    console.log("My Barcode value", result.codeResult.code);
    if (result) {
      const path = result.codeResult.code.toString();

      database.ref('shop1').child("Inventory").child(path).on("value", (snapshot) => {


        list.push(snapshot.val());

        console.log(list);

        setReceipt(list);
      });
    }
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


  function handleScan(id) {
    if (id) {
      const path = id.toString();

      database.ref('shop1').child("Inventory").child(path).on("value", (snapshot) => {


        list.push(snapshot.val());

        console.log(list);

        setReceipt(list);
      });
    }
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
            startScanning();
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

          <div style={{display:'flex', flex:1, flexDirection:'column', height: 250, alignItems:'center'}} className="input-stream"></div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'space-around' }}>
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
              onClick={() => console.log("function for print missing")}
              color="primary"
            >
              Generate Receipt
                    </Button>}
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
