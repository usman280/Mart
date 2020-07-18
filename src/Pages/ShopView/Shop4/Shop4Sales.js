import React, { useState, useEffect, useRef } from 'react';
import { database } from '../../../config';
import ShowDialogButton from '../../../Components/ShowDialogButton';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core'
import ReactToPrint from "react-to-print";
import Quagga from 'quagga';
import SalesTable from '../../../Components/SalesTable';


export default function Shop4Sales() {


  const componentRef = useRef();

  const [shop4Data, setShop4Data] = useState([]);
  const [open, setOpen] = useState(false);
  const [receipt, setReceipt] = useState([]);
  const [list, setList] = useState([]);
  const [codes, setCodes] = useState([]);
  const [print, setPrint] = useState(false);
  const [quantity, setQuantity] = useState([]);
  const [InventoryData, setInventoryData] = useState([]);
  const [itemsPreviousQuantity, setItemsPreviousQuantity] = useState([]);
  const [previousQuantities, setPreviousQuantities] = useState([]);

  useEffect(() => {


    onDetectedHandler = onDetectedHandler.bind(this);


    const fetchData = async () => {
      database
        .ref("shop4")
        .child("Sales")
        .on("value", (snapshot) => {

          let finalReceipt = [];

          snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();


            let items = childSnapshot.val();
            let singleReceiptItems = [];


            for (let item in items) {
              singleReceiptItems.push({
                itemid: items[item].itemid,
                itemname: items[item].itemname,
                price: items[item].price,
                quantity: items[item].quantity
              });
            }

            finalReceipt.push({
              saleid: childKey,
              receipt: singleReceiptItems
            });


            const retrievedData = [...finalReceipt];

            setShop4Data(retrievedData);

          });

        });
    };

    const fetchShopData = async () => {

      database
        .ref("shop4")
        .child("Inventory")
        .orderByChild("quantity")
        .on("value", (snapshot) => {
          let items = snapshot.val();

          let ShopList = [];
          for (let item in items) {
            ShopList.push({
              itemid: items[item].itemid,
              itemname: items[item].itemname,
              price: items[item].price,
              quantity: items[item].quantity,
            });
          }
          setInventoryData(ShopList);
        });
    };

    fetchShopData();
    fetchData();
  }, []);





  var onDetectedHandler = (result) => {
    Quagga.offDetected();

    InventoryData.forEach(function (item) {
      const resultval = parseInt(result.codeResult.code);
      if (item.itemid == resultval) {
        if (codes.includes(result.codeResult.code)) {
          window.alert("Already Scanned");
        }
        else {
          const itemid = result.codeResult.code;
          codes.push(itemid);

          const path = itemid.toString();

          database.ref('shop4').child("Inventory").child(path).once("value", (snapshot) => {

            const detecteditemquantity = snapshot.child('quantity').val();

            let newdetails = {
              itemid: snapshot.child('itemid').val(),
              itemname: snapshot.child('itemname').val(),
              price: snapshot.child('price').val(),
              shopquantity: snapshot.child('quantity').val(),
            }

            previousQuantities.push(parseInt(detecteditemquantity));

            list.push(newdetails);
            const newlist = [...list];
            setReceipt(newlist);
            const newQuantities = [...previousQuantities]
            setItemsPreviousQuantity(newQuantities);

          });

        }

      }
    })
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

  function generateReceipt() {

    let i = 0;
    receipt.forEach(function (input) {
      if (i < receipt.length) {
        input.quantity = parseInt(quantity[i]);

        const modifyQuantity = {
          quantity: itemsPreviousQuantity[i] - parseInt(quantity[i])
        }

        i += 1;
        database.ref("shop4").child("Inventory").child(input.itemid).update(modifyQuantity);
      }
    });
    database.ref("shop4").child("Sales").push(receipt);


    setItemsPreviousQuantity([]);
    setPreviousQuantities([]);
    setCodes([]);
    setList([]);
  }

  const mapList = () => receipt.map(
    function (item, index) {
      return (
        <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }} key={index}>
          <p>{item.itemid}</p>
          <p>{item.itemname}</p>
          <p>{item.price}</p>
          {print ? <p>{quantity[index]}</p> : <TextField
            margin='normal'
            id="quantity"
            variant='outlined'
            value={quantity[index]}
            label="Quantity"
            type="number"
            autoComplete="off"
            onChange={(e) => {
              let checker = receipt;

              for (let check in checker) {
                if (item.itemid === checker[check].itemid) {
                  if (e.target.value <= checker[check].shopquantity) {
                    quantity[index] = e.target.value
                  }
                  else {
                    window.alert("Not Enough Stock Available");
                    e.target.value = 0;
                  }
                }
              }
            }}
          />}
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

        <ShowDialogButton DialogText="New Sale" onClick={() => {
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
        <DialogContent style={{ marginBottom: 20, height: 200 }}>

          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', height: 250, alignItems: 'center' }} className="input-stream"></div>

          <div ref={componentRef} style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'space-around' }}>

            {print ? (<div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <h4>Mini Mini Garments</h4>
              <p>Shop Num 4</p>
              <p>Address: Madina City Mall Saddar</p>
            </div>) : null}

            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center', background: '#000' }}>
              <p style={{ fontSize: 15, color: '#fff' }}>Item Id</p>
              <p style={{ fontSize: 15, color: '#fff' }}>Item Name</p>
              <p style={{ fontSize: 15, color: '#fff' }}>Item Price</p>
              <p style={{ fontSize: 15, color: '#fff' }}>Item Quantity</p>
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
            style={{ backgroundColor: '#e61f27', color: '#fff', opacity: 0.9, letterSpacing: 1 }}
          >
            Cancel
                </Button>

          <ReactToPrint
            trigger={() => <Button
              variant="contained"
              style={{ backgroundColor: '#e61f27', color: '#fff', opacity: 0.9, letterSpacing: 1 }}
            >
              Generate Receipt
                    </Button>}
            onBeforeGetContent={() => {
              setPrint(true);
              generateReceipt();
              return Promise.resolve();
            }}
            onAfterPrint={() => { setPrint(false); setReceipt([]); setQuantity([]); setOpen(false); }}
            documentTitle={"Mini Mini Garments"}
            content={() => componentRef.current}
          />

        </DialogActions>
      </Dialog>

      <SalesTable
        mytitle="Shop 4 Sales"
        mydata={shop4Data}
      />

    </div>
  )
}
