import React from "react";
import MaterialTable from "material-table";
import { Search, Clear, ArrowDownward } from "@material-ui/icons";

const CustomTable = ({ mytitle, mydata, search, exportButton }) => {
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
        { title: "Item Id", field: "itemid", cellStyle:{ textAlign:'center', fontWeight: '550'} },
        { title: "Name", field: "itemname", cellStyle:{ textAlign:'center', fontWeight: '550'  }},
        { title: "Price", field: "price", cellStyle:{ textAlign:'center', fontWeight: '550' }},
        { title: "Quantity", field: "quantity", cellStyle:{ textAlign:'center' , fontWeight: '550' } },
      ]
    }
      data={mydata}
    />
  );
};

export default CustomTable;
