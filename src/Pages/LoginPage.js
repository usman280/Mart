import React from 'react';
import { Container } from '@material-ui/core';
import { auth } from '../config';
import Input from '../Components/Input';
import Loader from '../Components/Loader';
import MyButton from '../Components/MyButton';
import Header from '../Components/Header';


export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      disable: false,
    }
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  submitHanderler = (email, password) => {

    console.log(this.state.email + "" + this.state.password);
    this.setState({
      disable: true
    })


    auth.signInWithEmailAndPassword(email, password).then(res => {
      console.log("Successfull", res);
    })


    // e.preventDefault();
  }

  render() {

    return (
      <Container maxWidth='xl'>

        <Header />

        <form style={{ margin: '10px 200px' }} >
          
          <Input
            label="Email"
            id="email"
            onChange={this.inputHandler}
            disabled={this.state.disable}
            type="email"
          />

          <Input
            label="Password"
            id="password"
            onChange={this.inputHandler}
            disabled={this.state.disable}
            type="password"
          />

          <MyButton
          ButtonText="Login"
          onClick={()=> this.submitHanderler(this.state.email,this.state.password)}
          disabled={this.state.disable}
          />

        </form>

        {
          this.state.disable ?
            <Loader /> :
            null
        }

      </Container>
    )
  }
}