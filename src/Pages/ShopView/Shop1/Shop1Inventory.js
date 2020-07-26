import React, { useState, useEffect } from 'react';
import CustomTable from '../../../Components/CustomTable';
import { database } from '../../../config';
import ShowDialogButton from '../../../Components/ShowDialogButton';
import AddItemForm from '../../../Components/AddItemForm';
import Button from "@material-ui/core/Button";
import AddCircle from "@material-ui/icons/AddCircle";
import DistributionForm from '../../../Components/DistributionForm';

export default function Shop1Inventory() {

  const [shop2data, setShop2Data] = useState([]);
  const [shop3data, setShop3Data] = useState([]);
  const [shop4data, setShop4Data] = useState([]);
  const [Shop2PreviousQuantity, setShop2PreviousQuantity] = useState("");
  const [Shop3PreviousQuantity, setShop3PreviousQuantity] = useState("");
  const [Shop4PreviousQuantity, setShop4PreviousQuantity] = useState("");
  const [shop1Data, setShop1Data] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemname, setItemName] = useState("");
  const [itemId, setItemId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [previousQuantity, setPreviousQuantity] = useState("");
  const [distributionDialog, setDistributionDialog] = useState(false);
  const [showError, setError] = useState(false);
  const [state, setState] = useState({
    shop2: false,
    shop3: false,
    shop4: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      database
        .ref("shop1")
        .child("Inventory")
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

    const fetchShopsData = async () => {

      for (let [key] of Object.entries(state)) {
        database
          .ref(key)
          .child("Inventory")
          .orderByChild("quantity")
          .on("value", (snapshot) => {
            let items = snapshot.val();

            let ShopList = [];
            for (let item in items) {
              ShopList.push({
                itemid: items[item].itemid,
                itemname: items[item].itemname,
                price: items[item].price,
                quantity: items[item].quantity,
              });
            }

            if (key === "shop2") {
              setShop2Data(ShopList);
            }

            if (key === "shop3") {
              setShop3Data(ShopList);
            }

            if (key === "shop4") {
              setShop4Data(ShopList);
            }
          });
      }
    };

    fetchData();
    fetchShopsData();
  }, []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  function DistributeItems({ state }) {
    const prevquan = parseInt(previousQuantity);
    const quan = parseInt(quantity);
    let num = 0;

    for (let [key, value] of Object.entries(state)) {
      if (value === true) {
        num += 1;
      }
    }
    setDistributionDialog(false);

    if ((quan * num) > prevquan) {
      window.alert("Not Enough Stock Available");
      setItemId("");
      setItemName("");
      setPrice("");
      setQuantity("");
      setShop2PreviousQuantity(0);
      setShop3PreviousQuantity(0);
      setShop4PreviousQuantity(0);
      setState({ shop2: false, shop3: false, shop4: false });
    }
    else {
      for (let [key, value] of Object.entries(state)) {


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
            .child("Inventory")
            .child(itemId)
            .update(subInventoryDetails)
            .then((res) => {
              console.log("Distributed to", key);
            });

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
            .child("Inventory")
            .child(itemId)
            .update(subInventoryDetails)
            .then((res) => {
              console.log("Distributed to", key);
            });
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
            .child("Inventory")
            .child(itemId)
            .update(subInventoryDetails)
            .then((res) => {
              console.log("Distributed to", key);
            });
        }
      }
      const mainInventorydetails = {
        quantity: prevquan - num * quan,
      };

      database
        .ref("shop1")
        .child("Inventory")
        .child(itemId)
        .update(mainInventorydetails)
        .then((res) => {
          setItemId("");
          setItemName("");
          setPrice("");
          setQuantity("");
          setShop2PreviousQuantity(0);
          setShop3PreviousQuantity(0);
          setShop4PreviousQuantity(0);
          setState({ shop2: false, shop3: false, shop4: false });
        });
    }
  }

  function addItem() {
    setOpen(false);
    const prevquan = parseInt(previousQuantity);
    const quan = parseInt(quantity);


    const details = {
      itemid: itemId,
      itemname: itemname,
      price: price,
      quantity: prevquan + quan,
    };

    database
      .ref("shop1")
      .child("Inventory")
      .child(itemId)
      .update(details)
      .then((res) => {
        setItemId("");
        setItemName("");
        setPrice("");
        setQuantity("");
      })
      .catch((err) => console.log("FAiled", err));
  }

  const handleItemId = (e) => {
    let items = shop1Data;
    let shop2list = shop2data;
    let shop3list = shop3data;
    let shop4list = shop4data;


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
          style={{ marginBottom: 10, backgroundColor: '#e61f27', color: '#fff', opacity: 0.9, letterSpacing: 1 }}
          onClick={() => {
            setDistributionDialog(true);
          }}
          variant="contained"
          startIcon={<AddCircle />}
        >
          Distribute
        </Button>

        <ShowDialogButton DialogText="Add New Item" onClick={() => setOpen(true)} />
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
        shop2={true}
        shop3={true}
        shop4={true}
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

      <CustomTable
        mytitle="Shop 1 Inventory"
        mydata={shop1Data}
      />

    </div>
  )
}
