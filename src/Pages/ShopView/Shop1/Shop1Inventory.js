import React, { useState, useEffect } from 'react';
import CustomTable from '../../../Components/CustomTable';
import { database } from '../../../config';
import ShowDialogButton from '../../../Components/ShowDialogButton';
import Header from '../../../Components/Header';
import AddItemForm from '../../../Components/AddItemForm';

export default function Shop1Inventory() {

  const [shop1Data, setShop1Data] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemname, setItemName] = useState("");
  const [itemId, setItemId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [previousQuantity, setPreviousQuantity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      database
        .ref("shop1")
        .child("Inventory")
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

  function addItem() {
    setOpen(false);
    const prevquan = parseInt(previousQuantity);
    const quan = parseInt(quantity);


    const details = {
      itemid: itemId,
      itemname: itemname,
      price: price,
      quantity: prevquan + quan,
    };

    database
      .ref("shop4")
      .child("Inventory")
      .child(itemId)
      .update(details)
      .then((res) => {
        setItemId("");
        setItemName("");
        setPrice("");
        setQuantity("");
      })
      .catch((err) => console.log("FAiled", err));
  }

  const handleItemId = (e) => {
    let items = shop1Data;


    for (let item in items) {
      if (e.target.value === items[item].itemid) {
        setItemId(e.target.value);
        setItemName(items[item].itemname);
        setPrice(items[item].price);
        setPreviousQuantity(items[item].quantity);
        break;
      } else {
        setItemId(e.target.value);
        setItemName("");
        setPrice("");
        setPreviousQuantity(0);
      }
    }
  }

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
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >

        <ShowDialogButton DialogText="Add New Item" onClick={() => setOpen(true)} />

        <AddItemForm
          open={open}
          onClose={() => setOpen(false)}
          itemId={itemId}
          itemname={itemname}
          price={price}
          quantity={quantity}
          onCancelClick={() => setOpen(false)}
          onAddItemClick={() => addItem()}
          idHandler={(e) => handleItemId(e)}
          nameHandler={(e) => setItemName(e.target.value)}
          priceHandler={(e) => setPrice(e.target.value)}
          quantityHandler={(e) => setQuantity(e.target.value)}
        />
      </div>
      <CustomTable
        mytitle="Shop 1 Inventory"
        mydata={shop1Data}
      />

    </div>
  )
}
