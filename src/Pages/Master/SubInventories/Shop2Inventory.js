import React from 'react';
import CustomTable from '../../../Components/CustomTable';
import { database } from '../../../config';


export default function Shop2Inventory() {
  return (
    <CustomTable
      mytitle="Shop 2 Inventory"
      mydata={res =>
        new Promise((resolve) => {
          database
            .ref("Inventory")
            .orderByChild("quantity")
            .on("value", (snapshot) => {
              let items = snapshot.val();

              let newItemsList = [];
              for (let item in items) {
                newItemsList.push({
                  itemid: items[item].itemid,
                  itemname: items[item].itemname,
                  price: items[item].price,
                  quantity: items[item].quantity,
                });
              }
              resolve({
                data: newItemsList
              })
            });
        })}
    />
  )
}
