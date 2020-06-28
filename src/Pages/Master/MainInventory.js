import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import AddCircle from "@material-ui/icons/AddCircle";
import { database } from "../../config";
import AddItemForm from "../../Components/AddItemForm";
import DistributionForm from "../../Components/DistributionForm";
import ShowDialogButton from "../../Components/ShowDialogButton";
import CustomTable from "../../Components/CustomTable";
import QRCodeGenerator from '../QRCodeGenerator';

export default function MainInventory() {
  const [open, setOpen] = useState(false);
  const [itemname, setItemName] = useState("");
  const [itemId, setItemId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [previousQuantity, setPreviousQuantity] = useState("");
  const [data, setData] = useState([]);
  const [shop1data, setShop1Data] = useState([]);
  const [shop2data, setShop2Data] = useState([]);
  const [shop3data, setShop3Data] = useState([]);
  const [shop4data, setShop4Data] = useState([]);
  const [Shop1PreviousQuantity, setShop1PreviousQuantity] = useState("");
  const [Shop2PreviousQuantity, setShop2PreviousQuantity] = useState("");
  const [Shop3PreviousQuantity, setShop3PreviousQuantity] = useState("");
  const [Shop4PreviousQuantity, setShop4PreviousQuantity] = useState("");
  const [showError, setError] = useState(false);
  const [distributionDialog, setDistributionDialog] = useState(false);
  const [deductMultiplier, setDeductMultiplier] = useState("0");
  const [state, setState] = React.useState({
    shop1: false,
    shop2: false,
    shop3: false,
    shop4: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  function addItem() {
    setOpen(false);
    const prevquan = parseInt(previousQuantity);
    const quan = parseInt(quantity);

    console.log("PRE", prevquan, "quan", quan);

    const details = {
      itemid: itemId,
      itemname: itemname,
      price: price,
      quantity: prevquan + quan,
    };

    database
      .ref("Inventory")
      .child(itemId)
      .update(details)
      .then((res) => {
        setItemId("");
        setItemName("");
        setPrice("");
        setQuantity("");
        console.log("Success", res);
      })
      .catch((err) => console.log("FAiled", err));
  }

  function DistributeItems({ state }) {
    const prevquan = parseInt(previousQuantity);
    const quan = parseInt(quantity);
    let num = 0;

    setDistributionDialog(false);

    for (let [key, value] of Object.entries(state)) {
      if (key === "shop1" && value === true) {
        const prev = parseInt(Shop1PreviousQuantity);

        const subInventoryDetails = {
          itemid: itemId,
          itemname: itemname,
          price: price,
          quantity: prev + quan,
        };

        database
          .ref(key)
          .child(itemId)
          .update(subInventoryDetails)
          .then((res) => {
            console.log("Distributed to", key);
          });
        num = num + 1;
      }

      if (key === "shop2" && value === true) {
        const prev = parseInt(Shop2PreviousQuantity);

        const subInventoryDetails = {
          itemid: itemId,
          itemname: itemname,
          price: price,
          quantity: prev + quan,
        };

        database
          .ref(key)
          .child(itemId)
          .update(subInventoryDetails)
          .then((res) => {
            console.log("Distributed to", key);
          });
        num = num + 1;
      }

      if (key === "shop3" && value === true) {
        const prev = parseInt(Shop3PreviousQuantity);

        const subInventoryDetails = {
          itemid: itemId,
          itemname: itemname,
          price: price,
          quantity: prev + quan,
        };

        database
          .ref(key)
          .child(itemId)
          .update(subInventoryDetails)
          .then((res) => {
            console.log("Distributed to", key);
          });
        num = num + 1;
      }

      if (key === "shop4" && value === true) {
        const prev = parseInt(Shop4PreviousQuantity);

        const subInventoryDetails = {
          itemid: itemId,
          itemname: itemname,
          price: price,
          quantity: prev + quan,
        };

        database
          .ref(key)
          .child(itemId)
          .update(subInventoryDetails)
          .then((res) => {
            console.log("Distributed to", key);
          });
        num = num + 1;
      }
    }

    const mainInventorydetails = {
      quantity: prevquan - num * quan,
    };

    database
      .ref("Inventory")
      .child(itemId)
      .update(mainInventorydetails)
      .then((res) => {
        console.log("Deducted from Main Inventory");
        setItemId("");
        setItemName("");
        setPrice("");
        setQuantity("");
        setShop1PreviousQuantity(0);
        setShop2PreviousQuantity(0);
        setShop3PreviousQuantity(0);
        setShop4PreviousQuantity(0);
        setState({ shop1: false, shop2: false, shop3: false, shop4: false });
      });
  }

  const handleItemId = (e) => {
    let items = data;
    let shop1list = shop1data;
    let shop2list = shop2data;
    let shop3list = shop3data;
    let shop4list = shop4data;

    console.log("wot is", items);

    for (let item in items) {
      if (e.target.value === items[item].itemid) {
        setItemId(e.target.value);
        setItemName(items[item].itemname);
        setPrice(items[item].price);
        setPreviousQuantity(items[item].quantity);
        break;
      } else {
        setItemId(e.target.value);
        setItemName("");
        setPrice("");
        setPreviousQuantity(0);
      }
    }

    // FOR SHOP 1

    if (shop1list.length === 0) {
      setShop1PreviousQuantity(0);
    } else {
      for (let item in shop1list) {
        if (e.target.value === shop1list[item].itemid) {
          setShop1PreviousQuantity(shop1list[item].quantity);
          break;
        } else {
          setShop1PreviousQuantity(0);
        }
      }
    }

    // FOR SHOP 2

    if (shop2list.length === 0) {
      setShop2PreviousQuantity(0);
    } else {
      for (let item in shop2list) {
        if (e.target.value === shop2list[item].itemid) {
          setShop2PreviousQuantity(shop2list[item].quantity);
          break;
        } else {
          setShop2PreviousQuantity(0);
        }
      }
    }

    // FOR SHOP 3

    if (shop3list.length === 0) {
      setShop3PreviousQuantity(0);
    } else {
      for (let item in shop3list) {
        if (e.target.value === shop3list[item].itemid) {
          setShop3PreviousQuantity(shop3list[item].quantity);
          break;
        } else {
          setShop3PreviousQuantity(0);
        }
      }
    }

    // FOR SHOP 4

    if (shop4list.length === 0) {
      setShop4PreviousQuantity(0);
    } else {
      for (let item in shop4list) {
        if (e.target.value === shop4list[item].itemid) {
          setShop4PreviousQuantity(shop4list[item].quantity);
          break;
        } else {
          setShop4PreviousQuantity(0);
        }
      }
    }
  };

  // var firebaseData= [];
  // firebaseData = query =>
  // new Promise((resolve, reject) => {
  //     database
  //         .ref("Inventory")
  //         .orderByChild("quantity")
  //         .on("value", (snapshot) => {
  //             let items = snapshot.val();

  //             let newItemsList = [];
  //             for (let item in items) {
  //                 newItemsList.push({
  //                     itemid: items[item].itemid,
  //                     itemname: items[item].itemname,
  //                     price: items[item].price,
  //                     quantity: items[item].quantity,
  //                 });
  //             }
  //             resolve({
  //                 data: newItemsList
  //             })
  //         });
  // });

  useEffect(() => {
    const fetchData = async () => {
      database
        .ref("Inventory")
        .orderByChild("quantity")
        .on("value", (snapshot) => {
          let items = snapshot.val();
          setItemId(items.length);
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

          setData(newItemsList);
        });
    };

    const fetchShopsData = async () => {
      database
        .ref("shop1")
        .orderByChild("quantity")
        .on("value", (snapshot) => {
          let items = snapshot.val();
          console.log("Response", items);

          let newShop1List = [];
          for (let item in items) {
            newShop1List.push({
              itemid: items[item].itemid,
              itemname: items[item].itemname,
              price: items[item].price,
              quantity: items[item].quantity,
            });
          }

          setShop1Data(newShop1List);
        });

      database
        .ref("shop2")
        .orderByChild("quantity")
        .on("value", (snapshot) => {
          let items = snapshot.val();
          console.log("Response", items);

          let newShop2List = [];
          for (let item in items) {
            newShop2List.push({
              itemid: items[item].itemid,
              itemname: items[item].itemname,
              price: items[item].price,
              quantity: items[item].quantity,
            });
          }

          setShop2Data(newShop2List);
        });

      database
        .ref("shop3")
        .orderByChild("quantity")
        .on("value", (snapshot) => {
          let items = snapshot.val();
          console.log("Response", items);

          let newShop3List = [];
          for (let item in items) {
            newShop3List.push({
              itemid: items[item].itemid,
              itemname: items[item].itemname,
              price: items[item].price,
              quantity: items[item].quantity,
            });
          }

          setShop3Data(newShop3List);
        });

      database
        .ref("shop4")
        .orderByChild("quantity")
        .on("value", (snapshot) => {
          let items = snapshot.val();
          console.log("Response", items);

          let newShop4List = [];
          for (let item in items) {
            newShop4List.push({
              itemid: items[item].itemid,
              itemname: items[item].itemname,
              price: items[item].price,
              quantity: items[item].quantity,
            });
          }

          setShop4Data(newShop4List);
        });
    };

    fetchData();
    fetchShopsData();
  }, []);

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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          style={{ marginBottom: 10 }}
          onClick={() => {
            setDistributionDialog(true);
          }}
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
        >
          Distribute
        </Button>

        <ShowDialogButton onClick={() => setOpen(true)} />
      </div>
      <AddItemForm
        open={open}
        onClose={() => setOpen(false)}
        itemId={itemId}
        itemname={itemname}
        price={price}
        quantity={quantity}
        onCancelClick={() => setOpen(false)}
        onAddItemClick={() => addItem()}
        idHandler={(e) => handleItemId(e)}
        nameHandler={(e) => setItemName(e.target.value)}
        priceHandler={(e) => setPrice(e.target.value)}
        quantityHandler={(e) => setQuantity(e.target.value)}
      />

      <DistributionForm
        shop1check={state.shop1}
        shop2check={state.shop2}
        shop3check={state.shop3}
        shop4check={state.shop4}
        checkBoxHandler={handleChange}
        open={distributionDialog}
        onClose={() => setDistributionDialog(false)}
        onCancelClick={() => setDistributionDialog(false)}
        onDistributeClick={() => DistributeItems({ state })}
        itemId={itemId}
        quantity={quantity}
        idHandler={(e) => handleItemId(e)}
        quantityHandler={(e) => setQuantity(e.target.value)}
        error={showError}
      />

      <CustomTable mytitle="Main Inventory" mydata={data} />
    </div>
  );
}
