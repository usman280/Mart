import React, { useState, useEffect } from 'react';
import CustomTable from '../../../Components/CustomTable';
import { database } from '../../../config';


export default function Shop3Inventory() {

  const [ shop3Data, setShop3Data ] = useState([]);

  useEffect( ()=> {
    const fetchData = async () => {
      database
        .ref("shop3")
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

          setShop3Data(newItemsList);
        });
    };

    fetchData();
  }, [] );

  return (
    <CustomTable
      mytitle="Shop 3 Inventory"
      mydata={shop3Data}
    />
  )
}
