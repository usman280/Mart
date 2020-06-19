import React from 'react';
import MaterialTable from 'material-table'
import { Search, Clear }  from '@material-ui/icons';

const CustomTable = ({mytitle, mydata}) => {

  return (
    <MaterialTable
    style={{borderWidth: 1, borderColor:'#000', borderStyle:'Solid', marginTop: 30}}
      options={{
        search: true,
        sorting: false,
        draggable: false,
        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF',
          textAlign:'center',
        },
        paging: false,
        loadingType: 'overlay',
      }}
      icons={{
        Search: Search,
        ResetSearch: Clear, 
      }}
      title={mytitle}
      columns={[
        { title: 'Item Id', field: 'itemid' },
        { title: 'Name', field: 'itemname' },
        { title: 'Price', field: 'price' },
        { title: 'Quantity', field: 'quantity' },
      ]}

      data={mydata}
    />
  )
}

export default CustomTable;