import React from "react";
import loginImg from "../../images/Logo.svg";
import axios from 'axios';


export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      fullName:'',
      email:'',
      password:'',
      res_error:''
    }

    this.changeFullName=this.changeFullName.bind(this);
        this.changeEmail=this.changeEmail.bind(this);
        this.changePassword=this.changePassword.bind(this);
        this.onSubmit= this.onSubmit.bind(this);

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
 }    
 changePassword(event){
    this.setState({
        password:event.target.value
    })
 } 


 onSubmit(event){
     event.preventDefault()
     const registerd = {
         fullName:this.state.fullName,
         email:this.state.email,
         password:this.state.password
     }
     //try {
     axios.post('http://localhost:9000/signup',registerd)
     .then(response=> {console.log(response.data)  // 
     if(response.data=== 'Account already exist with this email'){
      this.setState({res_error:response.data})
      setTimeout(
        function() 
        {
          this.setState({res_error:''})
        }.bind(this), 3000); 
     }
      
     if(this.state.res_error=== ''){
      this.setState({
         fullName:'',
         email:'',
         password:'',
         res_error:'Account created Succesfully'
      })
      setTimeout(
        function() 
        {
      window.location='http://localhost:3000/'
      }.bind(this), 1000); 
     }
  
    }) 
     .catch(err => {console.log((err.response.data));
      this.setState({res_error:err.response.data})

      if(this.state.res_error!== ''){
        setTimeout(
          function() 
          {
            this.setState({res_error:''})
          }.bind(this), 3000); 
    }

   
      
   
  })

  //if(Object.keys(this.state.res_error).length == 0){
   


    //Dat.res.err.massege
    //  data.response.err.message
    //err.response.data
    // } catch (error) {
    //  console.log('err->', error.data);
    //  }
    //.catch(error=>console.log(response.error.details[0].message))
    // window.location='http://localhost:3000/'
     
    
 }


 handleClick = (e) => {
  e.preventDefault();
  console.log('The link was clicked.');
};

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="" />
          </div>
          <div className="form" onSubmit={this.onSubmit}>
            <div className="form-group">
            <div className="error">{this.state.res_error}</div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="email" onChange={this.changeEmail} value={this.state.email} />
            </div>
            <div className="form-group">
              <label htmlFor="fullName">FullName</label>
              <input type="text" name="fullName" placeholder="fullName" onChange={this.changeFullName} value={this.state.fullName}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={this.changePassword} value={this.state.password}/>
            </div>
            <button type="button" className="btn" value='Submits' onSubmit={this.onSubmit} onClick={this.onSubmit}>Register</button>
          </div>
        </div>
        <div className="footer">
         
          <label htmlFor="account">Already have an account ? <a href="#" onClick={()=>this.props.data.showLogginBox()} >Log In</a></label>

        </div>
      </div>
    );
  }
}


///onClick={()=>this.onSubmit}