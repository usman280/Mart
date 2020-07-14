import React, { useState,useEffect} from 'react';
import CustomTable from '../../../Components/CustomTable';
import { database } from '../../../config';
import Header from '../../../Components/Header';


export default function Shop1Inventory() {

  const [ shop1Data, setShop1Data ] = useState([]);

  useEffect( ()=> {
    const fetchData = async () => {
      database
        .ref("shop1")
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
  }, [] );

  return (
    <div>    
      
      <Header username="Hamza Khan" imageSource={require('.././hamza.jpg')} />

      <CustomTable
      mytitle="Shop 1 Inventory"
      mydata={shop1Data}
      search={true}
      exportButton={true}
    />

</div>

  )
}
