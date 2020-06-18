import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import AddCircle from "@material-ui/icons/AddCircle";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { database } from "../../config";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 20,
    },
}))(TableCell);

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];



export default function MainInventory() {


    const [open, setOpen] = useState(false);
    const [itemname, setItemName] = useState('');
    const [itemId, setItemId] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [data, setData] = useState([]);
    const classes = useStyles();

    function addItem() {

        //const {itemId,itemname,category,quantity} = props;

        setOpen(false);

        // const prevquan = parseInt(this.state.previousquantity);
        // const quan = parseInt(this.state.quantity);

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

    function checkdata(e){
        console.log("this is return in check data ", data);
        const dt = data;
        for (let item in dt) {
          console.log("item value", dt[item].itemid);
          console.log("item type", typeof dt[item].itemid);
          if (dt[item].itemid === e) {
            console.log("found");
          }
        }
      };


    useEffect(() => {
        const fetchData = async () => {
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

                    setData(newItemsList);
                });
        };

        fetchData();
    }, []);


    function handleItemId(e){
        let items = data;
        for (let item in items) {
          if (e === items[item].itemid) {
            // this.setState(
            //   {
            //     itemid: e.target.value,
            //     itemname: items[item].itemname,
            //     previousquantity: items[item].quantity,
            //     category: items[item].category,
            //     disabled: true,
            //   },
            //   () => {
            //     this.checkdata(itemId);
            //   }
            // );
            setItemId(e);
            setItemName(items[item].name);
            setPrice(item[item].price);
            setQuantity(item[item].quantity);
            this.checkdata(itemId);
            break;
          } else {
            // this.setState({
            //   itemid: e.target.value,
            //   itemname: "",
            //   category: "",
            //   previousquantity: 0,
            // });
            setItemId(e);
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
            <Button
                style={{ alignSelf: "flex-end", marginBottom: 10 }}
                onClick={() => setOpen(true)}
                variant="contained"
                color="primary"
                startIcon={<AddCircle />}
            >
                Add New Item
          </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Enter Item Details</DialogTitle>
                <DialogContent style={{ marginBottom: 20 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="itemid"
                        value={itemId}
                        label="Item Id"
                        type="number"
                        fullWidth
                        autoComplete="off"
                        autoFocus={true}
                        onChange={(e)=> setItemId(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="itemname"
                        type="text"
                        value={itemname}
                        autoCapitalize={true}
                        autoComplete={false}
                        placeholder="itemname"
                        fullWidth
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        id="category"
                        value={price}
                        type="text"
                        fullWidth
                        placeholder="Category"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        id="quantity"
                        value={quantity}
                        type="number"
                        placeholder="Quantity"
                        fullWidth
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => setOpen(false)}
                        color="primary"
                    >
                        Cancel
              </Button>
                    <Button
                        variant="contained"
                        onClick={() => addItem()}
                        color="primary"
                    >
                        Add Item
              </Button>
                </DialogActions>
            </Dialog>
            <Table size="large" stickyHeader>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Item Id</StyledTableCell>
                        <StyledTableCell align="center">Item Name</StyledTableCell>
                        <StyledTableCell align="center">Price</StyledTableCell>
                        {/* <StyledTableCell align="center">
                            Recent Added Quantity
                </StyledTableCell> */}
                        <StyledTableCell align="center">Total Quantity</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={i} style={{}}>
                            <TableCell align='center'>{row.itemid}</TableCell>
                            <TableCell align='center'>{row.itemname}</TableCell>
                            <TableCell align='center'>{row.price}</TableCell>
                            <TableCell align='center'>{row.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}