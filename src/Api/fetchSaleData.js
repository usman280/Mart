import React from 'react';
import { database } from '../config';



export default function fetchSalesDataApi(shopname) {
    let finalReceipt = [];

    database
        .ref(shopname)
        .child("Sales")
        .on("value", (snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;

                let items = childSnapshot.val();
                let singleReceiptItems = [];


                for (let item in items) {
                    singleReceiptItems.push({
                        itemid: items[item].itemid,
                        itemname: items[item].itemname,
                        price: items[item].price,
                        quantity: items[item].quantity
                    });
                }

                finalReceipt.push({
                    saleid: childKey,
                    receipt: singleReceiptItems
                });

            });

        });

        return finalReceipt;
}