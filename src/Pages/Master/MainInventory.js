import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import AddCircle from "@material-ui/icons/AddCircle";
import { database } from "../../config";
import AddItemForm from '../../Components/AddItemForm';
import DistributionForm from '../../Components/DistributionForm';
import ShowDialogButton from '../../Components/ShowDialogButton';
import CustomTable from '../../Components/CustomTable';



export default function MainInventory() {


    const [open, setOpen] = useState(false);
    const [itemname, setItemName] = useState('');
    const [itemId, setItemId] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [data, setData] = useState([]);
    const [showError, setError] = useState(false);
    const [distributionDialog, setDistributionDialog] = useState(false);
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

        const details = {
            itemid: itemId,
            itemname: itemname,
            price: price,
            quantity: quantity,
        };

        database
            .ref("Inventory")
            .child(itemId)
            .update(details)
            .then((res) => {
                setItemId('');
                setItemName('');
                setPrice('');
                setQuantity('');
                console.log("Success", res);
            }).
            catch(err => console.log("FAiled", err))
    };

    function DistributeItems({ state }) {

        setDistributionDialog(false);

        const details = {
            itemid: itemId,
            itemname: itemname,
            price: price,
            quantity: quantity,
        };

        for (let [key, value] of Object.entries(state)) {
            if (value === true) {
                database.ref(key).child(itemId).update(details).then(res => {
                    console.log("Distributed to", key);
                })
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            database
                .ref("Inventory")
                .orderByChild("quantity")
                .on("value", (snapshot) => {
                    let items = snapshot.val();

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

        fetchData();
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

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <Button
                    style={{ marginBottom: 10 }}
                    onClick={() => setDistributionDialog(true)}
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircle />}
                >
                    Distribute
          </Button>

                <ShowDialogButton
                    onClick={() => setOpen(true)}
                />
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
                idHandler={(e) => setItemId(e.target.value)}
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
                idHandler={(e) => setItemId(e.target.value)}
                quantityHandler={(e) => setQuantity(e.target.value)}
                error={showError}
            />

            <CustomTable
                mytitle="Main Inventory"
                mydata={query =>
                    new Promise((resolve, reject) => {
                        database
                            .ref("Inventory")
                            .orderByChild("quantity")
                            .on("value", (snapshot) => {
                                let items = snapshot.val();

                                let newItemsList = [];
                                for (let item in items) {
                                    newItemsList.push({
                                        itemid: items[item].itemid,
                                        itemname: items[item].itemname,
                                        price: items[item].price,
                                        quantity: items[item].quantity,
                                    });
                                }
                                resolve({
                                    data: newItemsList
                                })
                            });
                    })}
            />
        </div>
    )
}