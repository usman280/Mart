import React, { useState,useEffect} from 'react';
import CustomTable from '../../../Components/CustomTable';
import { database } from '../../../config';
import Button from "@material-ui/core/Button";
import AddCircle from "@material-ui/icons/AddCircle";
import ShowDialogButton from '../../../Components/ShowDialogButton';

export default function Shop2Inventory() {

  const [ shop2Data, setShop2Data ] = useState([]);

  useEffect( ()=> {
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
  }, [] );

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

        <ShowDialogButton onClick={() => console.log("da")} />
      </div>
      <CustomTable
        mytitle="Shop 2 Inventory"
        mydata={shop2Data}
      />

    </div>
  )
}
