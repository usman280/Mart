import React from 'react';
import { database } from '../config';


const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

var date = new Date();
var Year = date.getFullYear();
var Month = date.getMonth() + 1; /*date.getMonth() + 1  fetch august data*/
var Day = date.getDate(); /*date.getDate() + 6  fetch august date 25*/

var strdate = Day + "-" + Month + "-" + Year;


export default function fetchSaleAmountApi(shopname) {
    let sale = 0;

    database.ref(shopname).child("Accounts").child(monthNames[Month - 1]).child(strdate).on("value", (snapshot) => {
        if (snapshot.child('sale').exists()) {
            sale = parseInt(snapshot.child('sale').val());
        }
    });

    return sale;
}