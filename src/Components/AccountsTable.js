import React from "react";
import MaterialTable from "material-table";
import { Search, Clear, ArrowDownward } from "@material-ui/icons";

const AccountsTable = ({ mytitle, mydata, search, exportButton }) => {
    let pDate = new Date();

    let printDate =
        pDate.getDate() + "-" + (pDate.getMonth() + 1) + "-" + pDate.getFullYear();

    return (
        <MaterialTable
            style={{
                borderWidth: 1,
                borderColor: "#000",
                borderStyle: "Solid",
                marginTop: 30,
            }}
            options={{
                search: true,
                exportButton: true,
                exportFileName: "Till" + " " + printDate,
                sorting: false,
                draggable: false,
                headerStyle: {
                    backgroundColor: "#e61f27",
                    color: "#FFF",
                    textAlign: "center",
                    opacity: 1,
                    letterSpacing: 1,
                    fontWeight: 'bold',
                    fontFamily: 'helvetica'
                },
                paging: false,
                loadingType: "overlay",
            }}
            icons={{
                Search: Search,
                ResetSearch: Clear,
                Export: ArrowDownward,
            }}
            title={mytitle}
            columns={[
                { title: "Date", field: "date", cellStyle: { textAlign: 'center', fontWeight: '550', borderRightWidth: 1, borderBottomWidth: 1, borderRightStyle: 'solid', borderBottomStyle: 'solid' } },
                {
                    title: "Account", field: "account", render: (item) =>
                        <div style={{ display: 'flex', flexDirection: 'row', color: '#000', flex: 1, justifyContent: 'space-around', alignItems: 'center' }} >
                            {item.account.map((myitem, index) =>
                                <div style={{ display: 'flex', color: '#000', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'space-around' }} key={index}>
                                    {myitem.sale ? <p style={{ backgroundColor: '#000', color: '#fff', marginRight: 30, padding: 5 }}>Sale: {myitem.sale}</p> : null}
                                    {myitem.manager ? <p style={{ backgroundColor: '#000', color: '#fff', marginRight: 30, padding: 5 }}>Manager: {myitem.manager}</p> : null}
                                    {myitem.company[0].companyval ?
                                        <div style={{ backgroundColor: '#000', color: '#fff', marginRight: 7, paddingLeft: 10, paddingRight: 10, display: 'flex', flexDirection: 'row', color: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                            <p style={{ backgroundColor: '#000', color: '#fff', marginRight: 30, padding: 5 }}>Company</p>
                                            {
                                                myitem.company.map((companyitem, companyindex) =>
                                                    <div>
                                                        {companyitem.companyval.hamza ? <p style={{ backgroundColor: '#000', color: '#fff', marginRight: 7, paddingLeft: 10, paddingRight: 10 }}>Hamza: {companyitem.companyval.hamza}</p> : null}
                                                        {companyitem.companyval.talha ? <p style={{ backgroundColor: '#000', color: '#fff', marginRight: 7 }}>Talha: {companyitem.companyval.talha}</p> : null}
                                                        {companyitem.companyval.masood ? <p style={{ backgroundColor: '#000', color: '#fff', marginRight: 7 }}>Masood: {companyitem.companyval.masood}</p> : null}
                                                    </div>
                                                )
                                            }
                                        </div>
                                        : null}
                                    {myitem.expense ? <p style={{ backgroundColor: '#000', color: '#fff', marginRight: 30, padding: 5 }}>Expense: {myitem.expense}</p> : null}
                                </div>
                            )} </div>, cellStyle: { textAlign: 'center', fontWeight: '550', borderRightWidth: 1, borderBottomWidth: 1, borderRightStyle: 'solid', borderBottomStyle: 'solid' }
                },
            ]
            }
            data={mydata}
        />
    );
};

export default AccountsTable;
