import React, { useState, useEffect } from 'react';
import CustomTable from '../../../Components/CustomTable';
import { database } from '../../../config';


export default function Shop2Inventory() {

  const [ shop2Data, setShop2Data ] = useState([]);

  useEffect( ()=> {
    const fetchData = async () => {
      database
        .ref("shop2")
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
    <CustomTable
      mytitle="Shop 2 Inventory"
      mydata={shop2Data}
    />
  )
}
