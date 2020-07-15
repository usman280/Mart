import React from 'react';
import { Button, TextField, Container, makeStyles, withStyles } from '@material-ui/core';
import { auth, database } from '../config';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#000',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#e61f27',
            },
        },
    },
})(TextField);

function Login(useremail, userpassword, props, role) {
    console.log("Login Triggred");

    //SignupMethod

    auth.createUserWithEmailAndPassword(useremail, userpassword).then(res => {
        const userid = auth.currentUser.uid;
        const details = {
            role: role
        }
        database.ref('users').child(userid).set(details);

        props.history.push('/Login');

    }).catch(err => {
        console.log('error', err);
    })


}


export default function SignupPage(props) {

    const classes = useStyles();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState("");


    return (

        <div>

            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: 'center',
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomStyle: 'solid'
            }}>



                <img src={require('../Components/logo.png')} style={{ height: 150, width: 300, }} />

            </div>

            <Container component="main" maxWidth="xs">


                <div className={classes.paper}>

                    <form className={classes.form} noValidate >
                        <CssTextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoFocus={true}
                            required={true}
                            value={email}
                            onChange={event => {
                                setEmail(event.target.value);
                            }}
                        />
                        <CssTextField
                            variant="outlined"
                            margin="normal"
                            color="#e61f27"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />

                        <CssTextField
                            variant="outlined"
                            margin="normal"
                            color="#e61f27"
                            required
                            fullWidth
                            label="Role"
                            type="text"
                            id="role"
                            value={role}
                            onChange={event => setRole(event.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{ backgroundColor: '#e61f27', color: '#fff', opacity: 0.9, letterSpacing: 1, }}
                            className={classes.submit}
                            onClick={(e) => { Login(email, password, props, role); e.preventDefault(); }}
                        >
                            Sign In
                        </Button>

                    </form>
                </div>
            </Container>

            <div style={{ width: '100%', backgroundColor: '#000', textAlign: 'center', color: '#fff', bottom: 10, position: 'absolute' }}>
                CopyRights(c) by Mini Mini Garments
            </div>
        </div>
    );
}