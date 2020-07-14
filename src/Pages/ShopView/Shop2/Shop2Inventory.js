import React, { useState, useEffect } from 'react';
import CustomTable from '../../../Components/CustomTable';
import { database } from '../../../config';
import ShowDialogButton from '../../../Components/ShowDialogButton';
import Header from '../../../Components/Header';

export default function Shop2Inventory() {

  const [shop2Data, setShop2Data] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      database
        .ref("shop2")
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

          setShop2Data(newItemsList);
        });
    };

    fetchData();
  }, []);

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
      <Header username="Hamza Khan" imageSource={require('../.././Master/hamza.jpg')} />

      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >

        <ShowDialogButton onClick={() => console.log("da")} />
      </div>
      <CustomTable
        mytitle="Shop 2 Inventory"
        mydata={shop2Data}
      />

    </div>
  )
}
