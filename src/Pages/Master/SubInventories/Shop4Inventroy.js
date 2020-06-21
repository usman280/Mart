import React, { useState, useEffect } from 'react';
import CustomTable from '../../../Components/CustomTable';
import { database } from '../../../config';


export default function Shop4Inventory() {

  const [ shop4Data, setShop4Data ] = useState([]);

  useEffect( ()=> {
    const fetchData = async () => {
      database
        .ref("shop4")
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

          setShop4Data(newItemsList);
        });
    };

    fetchData();
  }, [] );

  return (
    <CustomTable
      mytitle="Shop 4 Inventory"
      mydata={shop4Data}
    />
  )
}
