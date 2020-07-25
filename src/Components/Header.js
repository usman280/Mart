import React from "react";
import { Button } from "@material-ui/core";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { database } from "../config";

function dateExtract() {
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
  var Month = date.getMonth(); /*date.getMonth() + 1  fetch august data*/
  var Day = date.getDate(); /*date.getDate() + 6  fetch august date 25*/

  const subSalesDetails = {
    itemid: "1",
    itemname: "sman",
    price: 3900,
    quantity: 50,
  };
  var strdate = Day + "-" + Month + "-" + Year;
  console.log(monthNames[Month]);

  // For adding sales according to date and monthly wisely
  database
    .ref("shop1")
    .child("Account")
    .child(monthNames[Month])
    .child(strdate)
    .update(subSalesDetails)
    .then((res) => {
      console.log("Success", res);
    })
    .catch((err) => console.log("FAiled", err));

  //For rreading according to month or date

  database
    .ref("shop1")
    .child("Account")
    .child(monthNames[Month])
    .child(strdate)
    .on("value", (snapshot) => {
      let items = snapshot.val();
      console.log("Response", items);
    });
}

const Header = ({ username, imageSource }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
      }}
    >
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={imageSource}
          height="110"
          width="130"
          style={{ borderRadius: "50%", borderWidth: 1, borderStyle: "solid" }}
        />
        <p style={{ fontSize: 20, fontWeight: 550 }}>{username}</p>
      </span>

      <img src={require("./logo.png")} style={{ height: 150, width: 300 }} />

      <Button
        style={{
          backgroundColor: "#e61f27",
          color: "#fff",
          opacity: 0.9,
          letterSpacing: 1,
        }}
        onClick={() => {
          dateExtract();
        }}
        variant="contained"
        startIcon={<ExitToApp />}
      >
        Logout
      </Button>
    </div>
  );
};

export default Header;
