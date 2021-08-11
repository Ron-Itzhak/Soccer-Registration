import React from "react";
import loginImg from "../../images/Logo.svg";
import axios from 'axios';
//import { request } from "../../../../api/app";


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    }

    this.changeFullName=this.changeFullName.bind(this);
        this.changeEmail=this.changeEmail.bind(this);
        this.changePassword=this.changePassword.bind(this);
        this.onSubmit= this.onSubmit.bind(this);


  }
  signup(event){
    console.log('The link was clicked.');
    ///this.signup.bind(this)
  }

  changeFullName(event){
    this.setState({
        fullName:event.target.value
    })
 } 
 changeEmail(event){
    this.setState({
        email:event.target.value
    })
 }    changePassword(event){
    this.setState({
        password:event.target.value
    })
 } 

 onSubmit(event){
  event.preventDefault()
  const registerd = {
      email:this.state.email,
      password:this.state.password

  }
  // try {
  axios.post('http://localhost:9000/login',registerd).then(response=> console.log(response.data))
  .then(request=>console.log('request body'+ request.data))
  .catch(error => {console.log(error.response.data)});
  // } catch (error) {
  // console.log('err->', error.response.data
  // );
  // }
  //window.location='http://localhost:9000/dashboard'

  this.setState({
    email:'',
    password:''   
 })

}
  handleClick = (e) => {
    e.preventDefault();
    console.log('The link was clicked.');
  };

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt=""  />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button " className="btn" onClick={this.onSubmit}> Login</button>
          <label htmlFor="account">Don't have an account yet ? <a href="#" onClick={()=>this.props.data.showRegisterBox()} >Sign Up</a></label>
        </div>
      </div>
    );
  }
}

//onClick={this.handleClick}
//          //onClick={()=>this.handleClick}
