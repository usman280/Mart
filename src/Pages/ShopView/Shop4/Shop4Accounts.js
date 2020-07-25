import React, { useRef, useState, useEffect } from 'react';
import ShowDialogButton from '../../../Components/ShowDialogButton';
import AccountsTable from '../../../Components/AccountsTable';
import { database } from '../../.././config';
import AccountsForm from '../../../Components/AccountsForm';

function Shop4Accounts() {

    var date = new Date();
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1; /*date.getMonth() + 1  fetch august data*/
    var Day = date.getDate(); /*date.getDate() + 6  fetch august date 25*/

    var strdate = Day + "-" + Month + "-" + Year;

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

    const componentRef = useRef();

    const [shop4Accounts, setShop4Accounts] = useState([]);
    const [open, setOpen] = useState(false);
    const [expense, setExpense] = React.useState("");
    const [expensetype, setExpenseType] = React.useState("");
    const [personname, setName] = React.useState("");

    const [todaymanageramount, setMangerAmount] = useState(0);
    const [todaycompanyamount, setCompanyAmount] = useState([]);
    const [todayExpense, setTodayExpense] = useState(0);


    function addExpense() {

        if (expensetype === 'Manager') {
            const amount = {
                date: strdate,
                manager: parseInt(todaymanageramount) + parseInt(expense),
            }

            database.ref('shop4').child("Accounts").child(monthNames[Month - 1]).child(strdate).update(amount).then(
                res => {
                    console.log("Success Account", res);
                    setExpense("");
                    setExpenseType("");
                }
            )

        }
        else if (expensetype === 'Company') {

            if (personname === 'Hamza') {
                if (todaycompanyamount.length !== 0) {
                    const amount = {
                        hamza: parseInt(expense) + parseInt(todaycompanyamount[0].companyval.hamza),
                    }
                    database.ref('shop4').child("Accounts").child(monthNames[Month - 1]).child(strdate).child("company").update(amount).then(
                        res => {
                            console.log("Success Account", res);
                            setExpense("");
                            setExpenseType("");
                        }
                    )
                }
                else {
                    const amount = {
                        hamza: parseInt(expense),
                    }
                    database.ref('shop4').child("Accounts").child(monthNames[Month - 1]).child(strdate).child("company").update(amount).then(
                        res => {
                            console.log("Success Account", res);
                            setExpense("");
                            setExpenseType("");
                        }
                    )
                }
            }
            if (personname === 'Talha') {
                if (todaycompanyamount.length !== 0) {
                    const amount = {
                        talha: parseInt(expense) + parseInt(todaycompanyamount[0].companyval.talha),
                    }
                    database.ref('shop4').child("Accounts").child(monthNames[Month - 1]).child(strdate).child("company").update(amount).then(
                        res => {
                            console.log("Success Account", res);
                            setExpense("");
                            setExpenseType("");
                        }
                    )
                }
                else {
                    const amount = {
                        talha: parseInt(expense),
                    }
                    database.ref('shop4').child("Accounts").child(monthNames[Month - 1]).child(strdate).child("company").update(amount).then(
                        res => {
                            console.log("Success Account", res);
                            setExpense("");
                            setExpenseType("");
                        }
                    )
                }
            }
            if (personname === 'Masood') {
                if (todaycompanyamount.length !== 0) {
                    const amount = {
                        masood: parseInt(expense) + parseInt(todaycompanyamount[0].companyval.masood),
                    }
                    database.ref('shop4').child("Accounts").child(monthNames[Month - 1]).child(strdate).child("company").update(amount).then(
                        res => {
                            console.log("Success Account", res);
                            setExpense("");
                            setExpenseType("");
                        }
                    )
                }
                else {
                    const amount = {
                        masood: parseInt(expense),
                    }
                    database.ref('shop4').child("Accounts").child(monthNames[Month - 1]).child(strdate).child("company").update(amount).then(
                        res => {
                            console.log("Success Account", res);
                            setExpense("");
                            setExpenseType("");
                        }
                    )
                }
            }
        }

        else if (expensetype === 'Expense') {
            const amount = {
                date: strdate,
                expense: parseInt(todayExpense) + parseInt(expense),
            }

            database.ref('shop4').child("Accounts").child(monthNames[Month - 1]).child(strdate).update(amount).then(
                res => {
                    console.log("Success Account", res);
                    setExpense("");
                    setExpenseType("");
                }
            )
        }

    }


    useEffect(() => {

        const fetchAccountsData = () => {
            database.ref("shop4").child("Accounts").child(monthNames[Month - 1]).on("value", (snapshot) => {
                //console.log("value of sale", snapshot.child('sale').val());
                if (snapshot.exists()) {

                    let finalitem = [];

                    snapshot.forEach(function (childsnapshot) {

                        let items = childsnapshot.val();
                        let singledateitem = [];

                        let companyitems = [];

                        companyitems.push({
                            companyval: items.company
                        });

                        singledateitem.push({
                            sale: items.sale,
                            company: companyitems,
                            manager: items.manager,
                            expense: items.expense,
                        });

                        finalitem.push({
                            date: items.date,
                            account: singledateitem,
                        })

                    });

                    setShop4Accounts(finalitem);
                    console.log("final outpur", finalitem);
                }
            });
        }

        const fetchTodaysData = () => {

            database.ref("shop4").child("Accounts").child(monthNames[Month - 1]).child(strdate).on("value", (snapshot) => {
                if (snapshot.child('manager').exists()) {
                    setMangerAmount(snapshot.child('manager').val());

                }
                if (snapshot.child('expense').exists()) {
                    setTodayExpense(snapshot.child('expense').val());
                }
            })

            database.ref("shop4").child("Accounts").child(monthNames[Month - 1]).child(strdate).child("company").on("value", (snapshot) => {
                if (snapshot.exists()) {

                    let dummyhandler = [];

                    dummyhandler.push({
                        companyval: snapshot.val()
                    })

                    setCompanyAmount(dummyhandler);

                }
            })
        }

        fetchAccountsData();
        fetchTodaysData();
    }, [])

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
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >

                <ShowDialogButton DialogText="New Expense" onClick={() => {
                    setOpen(true);
                }} />
            </div>

            <AccountsForm
                open={open}
                onClose={() => setOpen(false)}
                expense={expense}
                expensetype={expensetype}
                handleChangeSelect={(e) => setName(e.target.value)}
                handleChangeSelecttype={(e) => setExpenseType(e.target.value)}
                onCancelClick={() => setOpen(false)}
                onAddExpenseClick={() => addExpense()}
                handleExpense={(e) => setExpense(e.target.value)}
            />

            <AccountsTable
                mytitle="Shop 4 Accounts"
                mydata={shop4Accounts}
            />

        </div>
    )
}


export default Shop4Accounts;