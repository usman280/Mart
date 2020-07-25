import React from "react";
import MaterialTable from "material-table";
import { Search, Clear, ArrowDownward } from "@material-ui/icons";

const SalesTable = ({ mytitle, mydata, search, exportButton }) => {
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
                { title: "Sale Id", field: "saleid", cellStyle: { textAlign: 'center', fontWeight: '550', borderRightWidth: 1, borderBottomWidth: 1, borderRightStyle: 'solid', borderBottomStyle: 'solid' } },
                {
                    title: "Receipt", field: "receipt",render: (item) =>
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'row', color:'#fff', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}   >
                                <p>item id</p>
                                <p>price</p>
                                <p>quantity</p>
                                <p>total price</p>
                            </div>
                            {item.receipt.map((item, index) =>
                                <div style={{ display: 'flex', color:'#fff', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }} key={index}>
                                    <p>{item.itemid}</p>
                                    <p>{item.price}</p>
                                    <p>{item.quantity}</p>
                                    <p>{item.quantity*item.price}</p>
                                </div>
                            )} </div>, cellStyle: { backgroundColor:'#000',  textAlign: 'center', fontWeight: '550', borderRightWidth: 1, borderBottomWidth: 1, borderRightStyle: 'solid', borderBottomStyle: 'solid' }
                },
            ]
            }
            data={mydata}
        />
    );
};

export default SalesTable;
