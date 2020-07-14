import React from 'react';
import { Button } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';

const Header = ({username, imageSource}) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: "center",
            paddingLeft: 20,
            paddingRight: 20,
        }}>

            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={imageSource} height="110" width="130" style={{ borderRadius: '50%', borderWidth: 1, borderStyle: 'solid' }} />
                <p style={{ fontSize: 20, fontWeight: 550, }}>{username}</p>
            </span>

            <img src={require('./logo.png')} style={{ height: 150, width: 300 }} />

            <Button
                style={{ backgroundColor: '#e61f27', color: '#fff', opacity: 0.9, letterSpacing: 1, }}
                onClick={() => {
                    console.log("Logout Clicked")
                }}
                variant="contained"
                startIcon={<ExitToApp />}
            >Logout
            </Button>
        </div>
    )
}

export default Header;