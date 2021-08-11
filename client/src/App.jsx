import React from "react";
import "./App.scss";
import { Login, Register } from "./components/login/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogginActive: true,isRegisterActive: false,
      apiResponse:""
    };
  }

  callAPI(){
    fetch("/testAPI")
    .then(res=>res.text())
    .then(res=>this.setState({apiResponse:res}));
  }
  componentWillMount(){
    this.callAPI();
  }

  showRegisterBox(){
    this.setState({isRegisterActive: true,isLogginActive: false})
    console.log(' showRegisterBox was clicked.');

  }
  showLogginBox(){
    this.setState({isLogginActive: true,isRegisterActive: false})
  }



  componentDidMount() {
  }

  changeState() {
  }

//<p>{this.state.apiResponse}</p>

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (
      <div className="App">
      
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {isLogginActive && (<Login containerRef={ref => (this.current = ref)} data={{showRegisterBox:this.showRegisterBox.bind(this)}}/>)}
            {!isLogginActive && (<Register containerRef={ref => (this.current = ref)} data={{showLogginBox:this.showLogginBox.bind(this)}} />)}
          </div>
        </div>
      </div>
    );
  }
}



export default App;
