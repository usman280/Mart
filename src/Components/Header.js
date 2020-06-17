import React from 'react';
import { Typography, Divider } from '@material-ui/core';

const Header = () => {
    return(
        <div style={{height:'20%', width:'100%', backgroundColor:'#fff', marginBottom: '100px' }}>
            <Typography variant="h2" component="h1" color="#fff" align='center' color='textPrimary' style={{fontStyle:'italic', letterSpacing: 0, fontWeight:'bold'}}>
                Mini Mini Garments
            </Typography>
            <Divider variant='fullWidth' style={{backgroundColor:'#000'}} />
        </div>
    )
}

export default Header;