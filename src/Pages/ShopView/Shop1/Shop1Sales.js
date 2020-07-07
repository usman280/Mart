import React, { useState, useEffect, useRef } from 'react';
import CustomTable from '../../../Components/CustomTable';
import { database } from '../../../config';
import AddCircle from "@material-ui/icons/AddCircle";
import ShowDialogButton from '../../../Components/ShowDialogButton';

import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core'
import ReactToPrint from "react-to-print";
import QrReader from 'react-qr-reader'

export default function Shop1Sales() {


  const componentRef = useRef();

  const [shop1Data, setShop1Data] = useState([]);
  const [open, setOpen] = useState(false);
  const [receipt, setReceipt] = useState([]);
  const [list] = useState([]);


  useEffect(() => {

    handleScan = handleScan.bind(this);
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

  const mapList = ()=> receipt.map(
    function (item,index){
      return(
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

        <ShowDialogButton onClick={() => setOpen(true)} />
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        fullScreen={true}
        fullWidth={true}
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
              {mapList()}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div>
            <QrReader
              delay={1500}
              style={{ height: 400, width: 400 }}
              onError={(e) => console.log("error", e)}
              resolution={100}
              onScan={(id) => handleScan(id)}
            />
          </div>
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
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
