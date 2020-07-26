import React from 'react';
import { database } from '../config';


export default function ShopInventoryApi(shopname) {

    let newItemsList = [];
    database
        .ref(shopname)
        .child("Inventory")
        .orderByChild("quantity")
        .on("value", (snapshot) => {
            let items = snapshot.val();

            for (let item in items) {
                newItemsList.push({
                    itemid: items[item].itemid,
                    itemname: items[item].itemname,
                    price: items[item].price,
                    quantity: items[item].quantity,
                });
            }


        });

    return newItemsList;
}

